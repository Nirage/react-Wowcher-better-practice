import React, { useState, useEffect } from "react";

import ProductListContainer from "./components/ProductList.container";
import "./App.scss";

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [products, setProducts] = useState(null);
  const [filter, setFilter] = useState("");
  const [arrowDirection, setArrowDirection] = useState(false);

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

  return isReady ? (
    <ProductListContainer
      searchInputHandler={(e) => setFilter(e.target.value)}
      arrowClickHandler={() => setArrowDirection(!arrowDirection)}
      products={products}
      filter={filter}
      arrowDirection={arrowDirection}
    />
  ) : (
    "Loading..."
  );
};

export default App;
