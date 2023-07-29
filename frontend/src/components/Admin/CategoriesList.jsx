import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Container } from "react-bootstrap";

function CategoriesList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      getCategories();
      toast.success("Category deleted successfully"); // Added success toast for delete
    } catch (err) {
      console.error(err);
    }
};


  return (
    <Container>
      <div className="container mt-5">
        <h1>Categories List</h1>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Category Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id}>
                <th scope="row">{index + 1}</th>
                <td>{<td>{category.name}</td>}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default CategoriesList;
