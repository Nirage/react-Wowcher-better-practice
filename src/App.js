import React, { useState, useEffect } from "react";

import ProductListContainer from "./components/ProductList.container";
import "./App.css";

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [products, setProducts] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    Promise.all([
      getData("branch1"),
      getData("branch2"),
      getData("branch3"),
    ]).then((data) => {
      setProducts([
        ...data[0].products,
        ...data[1].products,
        ...data[2].products,
      ]);
      setIsReady(true);
    });
  }, []);

  const getData = (branchName) => {
    return fetch(`api/${branchName}.json`).then((response) => response.json());
  };

  const searchInputHandler = (e) => {
    setFilter(e.target.value);
  };

  return isReady ? (
    <ProductListContainer
      searchInputHandler={searchInputHandler}
      products={products}
      filter={filter}
    />
  ) : (
    "Loading..."
  );
};

export default App;
