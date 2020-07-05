import React from "react";

import ProductItem from './ProductItem';

const ProductList = ({ products, filter, searchInputHandler }) => {

  const aggregateProductList = (products) => {
    const aggregatedProducts = [];
    
    products.forEach((product) => {
      const matchesProductName = new RegExp(filter, 'i').test(product.name);

      if (matchesProductName) {
        const productId = product.id;

        if (!aggregatedProducts[productId]) {
          aggregatedProducts[productId] = { ...product }
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

    return refinedArray;

  }

  const formatNumber = (number) => new Intl.NumberFormat("en", { minimumFractionDigits: 2 }).format(number);
  const totalPrice = aggregateProductList(products).reduce((total, product) => total + (product.sold * product.unitPrice), 0);

  return (
    <main className='product-list'>
      <label>Search Products</label>
      <input type='text' onChange={searchInputHandler} />
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          <ProductItem productData={aggregateProductList(products)} formatNumber={formatNumber} />
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>{formatNumber(totalPrice)}</td>
          </tr>
        </tfoot>
      </table>
    </main>
  );
};

export default ProductList;
