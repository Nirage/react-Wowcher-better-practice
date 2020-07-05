import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { mount, configure } from "enzyme";
import "jest-enzyme";
import { act } from "@testing-library/react";
import branch1 from "../public/api/branch1.json";
import branch2 from "../public/api/branch2.json";
import branch3 from "../public/api/branch3.json";
import App from "./App";

configure({
  adapter: new Adapter(),
});

const responses = {
  "api/branch1.json": branch1,
  "api/branch2.json": branch2,
  "api/branch3.json": branch3,
};

global.fetch = (endpoint) =>
  Promise.resolve({
    json: () => Promise.resolve(responses[endpoint]),
  });

// based on https://blog.pragmatists.com/genuine-guide-to-testing-react-redux-applications-6f3265c11f63
const flushAllPromises = () => new Promise((resolve) => setImmediate(resolve));

export const flushRequestsAndUpdate = async (enzymeWrapper) => {
  await act(() => flushAllPromises());
  enzymeWrapper.update();
};

describe("App page acessed", () => {
  let app;

  beforeEach(() => {
    app = mount(<App />);
  });

  it("renders without crashing", async () => {
    await act(() => flushRequestsAndUpdate(app));
  });

  it("renders loading text initially", async () => {
    expect(app).toHaveText("Loading...");
    await act(() => flushRequestsAndUpdate(app));
  });

  it("renders a table after data load", async () => {
    expect(app).toHaveText("Loading...");
    await act(() => flushRequestsAndUpdate(app));
    expect(app.find("table")).toExist();
  });

  it("renders rows with country name as key", async () => {
    await act(() => flushRequestsAndUpdate(app));

    expect(app.find("table tbody tr").at(56).key()).toEqual("Hominy");
    expect(app.find("table tbody tr").at(73).key()).toEqual("Lychee");
  });

  it("renders table that is sorted ascending", async () => {
    await act(() => flushRequestsAndUpdate(app));
    expect(app.find("table")).toMatchSnapshot();
  });

  it("calculates total revenue of all branches", async () => {
    await act(() => flushRequestsAndUpdate(app));
    expect(app.find("tfoot td:last-child").text()).toEqual("2,102,619.44");
  });

  it("filters the displayed products", async () => {
    await act(() => flushRequestsAndUpdate(app));
    const changeEvent = { target: { value: "pear" } };
    app.find("input").simulate("change", changeEvent);
    expect(app.find("tfoot td:last-child").text()).toEqual("60,681.02");
  });
});
