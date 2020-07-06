import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { mount, configure } from "enzyme";
import "jest-enzyme";
import ProductListContainer from "./ProductList.container";

configure({
  adapter: new Adapter(),
});

const defaultProps = () => ({
  arrowDirection: false,
  products: [],
  filter: "",
  searchInputHandler: () => {},
});

const render = (props) =>
  mount(
    <ProductListContainer {...defaultProps()} {...props}></ProductListContainer>
  );

describe("When App page has parsed api data", () => {
  it("renders descending order table on arrow click", () => {
    const arrowDirection = true;
    const productListComponent = render({ arrowDirection });
    const productButton = productListComponent.find("table thead th").at(0);
    expect(productButton.find("svg").prop("data-icon")).toEqual("arrow-up");
  });
});
