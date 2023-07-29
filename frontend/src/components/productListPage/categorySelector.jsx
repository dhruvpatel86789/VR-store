import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';

function CategorySelect({ setSelectedCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  const handleSelectChange = (e) => {
  // Extract value from the event
  const value = e.target.value;
  
  // If the user selected the "Select Category" option, set the selected category to null
  if (value === "Select Category") {
    setSelectedCategory(null);
  } else {
    setSelectedCategory(value);
  }
};


  return (
    <Form.Group controlId="categorySelect">
      <Form.Select aria-label="Default select example" onChange={handleSelectChange}>
        <option>Select Category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}

export default CategorySelect;
