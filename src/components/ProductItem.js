import React from "react";
import PropTypes from "prop-types";

const ProductItem = ({ productData, formatNumber }) => {
  return productData.map((product) => (
    <tr key={product.name}>
      <td>{product.name}</td>
      <td>{formatNumber(product.sold * product.unitPrice)}</td>
    </tr>
  ));
}

ProductItem.propTypes = {
  productData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  formatNumber: PropTypes.func.isRequired
};

export default ProductItem;