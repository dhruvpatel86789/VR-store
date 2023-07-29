import React from "react";
import "../../styles/searchBar.css"
import { Form,InputGroup } from 'react-bootstrap';

export default function SearchBar({ setSearchTerm }) {
  return (
    <InputGroup  >
        <Form.Control
          placeholder="Search your product"
          aria-label="Search your product"
          aria-describedby="basic-addon2"
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
  );
}
