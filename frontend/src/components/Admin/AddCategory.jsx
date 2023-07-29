import React, { useState,useEffect } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import { Link,useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import CategoriesList from "./CategoriesList";

export default function AddCategory() {
  const [categoryName, setCategoryName] = useState("");

  const { token, isAdmin } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/categories",
        { name: categoryName }
      );
      console.log(response);
      setCategoryName("");
      toast.success("Category added successfully Please refresh the page");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // If the user is not an admin, redirect them to the login page
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);
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
          <div className="tab-content" id="v-pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="v-pills-add-category"
              role="tabpanel"
            >
              <div className="d-lg-flex justify-content-lg-between p-3">
                <h2>Add a Category</h2>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="category-name">Category Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="category-name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Enter category name"
                  />
                </div>

                <button type="submit" className="btn btn-info">
                  Add Category
                </button>
                <CategoriesList />
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
