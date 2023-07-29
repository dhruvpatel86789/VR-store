import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AdminHeader from "./AdminHeader";
import Footer from "../productListPage/footer";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const { token, isAdmin } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  async function getProducts() {
    await axios.get("http://localhost:5000/api/products").then((response) => {
      setProducts(response.data);
    });
  }

  async function deleteProduct(id) {
    await axios.delete(`http://localhost:5000/api/dashboard/products/${id}`);
    setProducts(products.filter((product) => product._id !== id));
    toast.success("Product deleted successfully!");
  }

  useEffect(() => {
    getProducts();
  }, []);

  if (!token || !isAdmin) {
    navigate('/login');
  }
  return (
    <div>
      <AdminHeader />
      <section className="row">
        <div className="col-lg-4 border bg-light">
          <div
            className="nav flex-column nav-pills "
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <Link
              className="nav-link text-primary text-left my-1 py-3"
              id="v-pills-home-tab"
              to="/dashboard"
              style={{ textAlign: "center" }}
            >
              <i className="fa-solid fa-house "></i>Tableau de bord
            </Link>

            <Link
              className="nav-link text-left disabled my-1 py-3"
              id="v-pills-settings-tab"
              to="/settings"
              style={{ textAlign: "center" }}
            >
              Paramètre
            </Link>

            <Link
              className="nav-link text-primary text-left my-1 py-3"
              id="v-pills-articles-tab"
              to="/add-product"
              style={{ textAlign: "center" }}
            >
              <i className="fa-solid fa-paragraph"></i>Add new product
            </Link>

            <Link
              className="nav-link text-primary text-left my-1 py-3"
              id="v-pills-messages-tab"
              to="/add-category"
              style={{ textAlign: "center" }}
            >
              <i className="fa-solid fa-paragraph"></i>Add new category
            </Link>
          </div>
        </div>

        <div className="col-lg-8">
          <div
            className="tab-pane fade show active"
            id="v-pills-home"
            role="tabpanel"
            aria-labelledby="v-pills-home-tab"
          >
            <div className="d-lg-flex justify-content-lg-between p-3">
              <h2>List of Products</h2>
              <Link to="/add-product" className="btn btn-info">
                <i className="fa-solid fa-plus"></i>Add a Product
              </Link>
            </div>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">Product Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.product_name}</td>
                    <td>{product.category.name}</td>
                    <td>{product.price}$</td>
                    <td className="text-right">
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ marginRight: "10px" }}
                      >
                        <i className="fa-solid fa-pencil"></i>
                        <Link to={`/modify/${product._id}`}>Edit</Link>
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteProduct(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
