import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate  } from "react-router-dom";

import AdminHeader from "./AdminHeader";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product_name, setProduct_name] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchProductAndCategories = async () => {
    const productResponse = await axios.get(`http://localhost:5000/api/dashboard/products/${id}`);
    const categoriesResponse = await axios.get("http://localhost:5000/api/categories");

    setProduct_name(productResponse.data.product.product_name);
    setCategory(productResponse.data.product.category._id);
    setBrand(productResponse.data.product.brand);
    setPrice(productResponse.data.product.price);
    setDescription(productResponse.data.product.description);
    setCountInStock(productResponse.data.product.countInStock);
    setCategories(categoriesResponse.data);
  };

  useEffect(() => {
    fetchProductAndCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      product_name,
      category,
      brand,
      price,
      description,
      countInStock,
    };
    await axios.put(`http://localhost:5000/api/dashboard/products/${id}`, updatedProduct);
    navigate("/dashboard");
  };

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
            <button
              className="nav-link   text-primary text-left my-1 py-3 "
              id="v-pills-home-tab"
              type="button"
              role="tab"
              aria-controls="v-pills-home"
              aria-selected="true"
            >
              <i className="fa-solid fa-house "></i>Tableau de bord
            </button>
            <button
              className="nav-link text-left disabled  my-1 py-3"
              id="v-pills-settings-tab"
              data-toggle="pill"
              data-target="#v-pills-settings"
              type="button"
              role="tab"
              aria-controls="v-pills-settings"
              aria-selected="false"
            >
              Paramètre
            </button>
            <button
              className="nav-link text-primary text-left  my-1 py-3"
              id="v-pills-articles-tab"
              data-toggle="pill"
              data-target="#v-pills-gestion-articles"
              type="button"
              role="tab"
              aria-controls="v-pills-tabContent"
              aria-selected="false"
            >
              <i className="fa-solid fa-paragraph"></i>Add new product
            </button>
            <button
              className="nav-link text-primary text-left  my-1 py-3"
              id="v-pills-messages-tab"
              data-toggle="pill"
              data-target="#v-pills-messages"
              type="button"
              role="tab"
              aria-controls="v-pills-messages"
              aria-selected="false"
            >
              <i className="fa-solid fa-paragraph"></i>Add new category
            </button>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="tab-content" id="v-pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="v-pills-add-product"
              role="tabpanel"
            >
              <div className="d-lg-flex justify-content-lg-between p-3">
                <h2>Edit Product</h2>
              </div>
              <form
                method="post"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <div className="form-group">
                  <label htmlFor="product-name">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-name"
                    value={product_name}
                    onChange={(e) => setProduct_name(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="product-category">Category</label>
                  <select
                    className="form-control"
                    id="product-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Choose your category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="product-brand">Brand</label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="product-price">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="product-price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="product-description">Description</label>
                  <textarea
                    className="form-control"
                    id="product-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="product-stock">Stock Count</label>
                  <input
                    type="number"
                    className="form-control"
                    id="product-stock"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-info"
                  value="Save Changes"
                />
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
