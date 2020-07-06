import React from "react";
import { Navbar, InputGroup, FormControl } from "react-bootstrap";

const Searchbar = ({ setFilter }) => (
  <Navbar className='product-list__input' fixed='top' bg='light' expand='lg'>
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text>Search Products</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl onChange={(e) => setFilter(e.target.value)} />
    </InputGroup>
  </Navbar>
);

export default Searchbar;
