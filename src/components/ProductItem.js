import React from "react";

const ProductItem = ({ productData, formatNumber }) => {
  return productData.map((product) => (
    <tr key={product.name}>
      <td>{product.name}</td>
      <td>{formatNumber(product.sold * product.unitPrice)}</td>
    </tr>
  ));
}

export default ProductItem;