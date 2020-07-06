import React from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

import ProductItem from "./ProductItem";
import "./ProductList.scss";

const ProductList = ({
  arrowClickHandler,
  products,
  filter,
  arrowDirection,
}) => {
  const aggregateProductList = (products) => {
    const aggregatedProducts = [];

    products.forEach((product) => {
      const matchesProductName = new RegExp(filter, "i").test(product.name);

      if (matchesProductName) {
        const productId = product.id;

        if (!aggregatedProducts[productId]) {
          aggregatedProducts[productId] = { ...product };
        } else {
          aggregatedProducts[productId].sold += product.sold;
        }
      }
    });

    const refinedArray = Object.values(aggregatedProducts);

    refinedArray.sort((a, b) => {
      const optionA = a.name.toUpperCase();
      const optionB = b.name.toUpperCase();

      return optionA < optionB ? -1 : optionA > optionB ? 1 : 0;
    });

    arrowDirection && refinedArray.reverse();

    return refinedArray;
  };

  const formatNumber = (number) =>
    new Intl.NumberFormat("en", { minimumFractionDigits: 2 }).format(number);
  const totalPrice = aggregateProductList(products).reduce(
    (total, product) => total + product.sold * product.unitPrice,
    0
  );

  return (
    <section className='product-list'>
      <Table striped bordered hover variant='dark'>
        <thead>
          <tr>
            <th onClick={arrowClickHandler}>
              Product
              <FontAwesomeIcon
                icon={arrowDirection ? faArrowUp : faArrowDown}
              />
            </th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          <ProductItem
            productData={aggregateProductList(products)}
            formatNumber={formatNumber}
          />
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>{formatNumber(totalPrice)}</td>
          </tr>
        </tfoot>
      </Table>
    </section>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  filter: PropTypes.string.isRequired,
};

export default ProductList;
