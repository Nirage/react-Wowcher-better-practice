import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./dist/bootstrap.min.css";

import ProductListContainer from "./components/ProductList.container";
import "./App.scss";
import Searchbar from "./components/Searchbar.container";

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

  return (
    <Container>
      <Searchbar setFilter={setFilter} />

      {isReady ? (
        <ProductListContainer
          arrowClickHandler={() => setArrowDirection(!arrowDirection)}
          products={products}
          filter={filter}
          arrowDirection={arrowDirection}
        />
      ) : (
        <div className='product-list'>Loading...</div>
      )}
    </Container>
  );
};

export default App;
