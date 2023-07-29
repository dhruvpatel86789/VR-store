import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link,useNavigate  } from "react-router-dom";
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import AdminHeader from "./AdminHeader";

export default function AddProduct() {
 // Defining state variables
 const [product_name, setProduct_name] = useState("");
 const [category, setCategory] = useState("");
 const [price, setPrice] = useState("");
 const [image, setImage] = useState({ preview: "", data: "" });
 const [description, setDescription] = useState("");
 const [brand, setBrand] = useState("");
 const [countInStock, setCountInStock] = useState(0);
 const [categories, setCategories] = useState([]);

 // Getting token and isAdmin flag from redux store
 const { token, isAdmin } = useSelector((state) => state.auth);
 
 // Use react-router's navigate function to redirect user
 const navigate = useNavigate();

 // useEffect hook to fetch categories when component mounts
 useEffect(() => {
   const fetchCategories = async () => {
     try {
       const res = await axios.get("http://localhost:5000/api/categories");
       setCategories(res.data);
     } catch (err) {
       console.error(err);
     }
   };

   fetchCategories();
 }, []);

 // Function to handle form submission
 const handleSubmit = async (event) => {
   event.preventDefault();
   const formData = new FormData();
   formData.append("product_name", product_name);
   formData.append("category", category);
   formData.append("price", price);
   formData.append("image", image.data);
   formData.append("description", description);
   formData.append("brand", brand);
   formData.append("countInStock", countInStock);

   try {
     const response = await axios.post(
       "http://localhost:5000/api/products",
       formData
     );
     console.log(response);
     toast.success("Product added successfully!");
     // Reset form fields
     setProduct_name("");
     setCategory("");
     setPrice("");
     setImage({ preview: "", data: "" });
     setDescription("");
     setBrand("");
     setCountInStock(0);
   } catch (err) {
     console.error(err);
     toast.error("Error adding product.");
   }
 };
 
 // useEffect hook to revoke object URL when component unmounts
 useEffect(() => {
   return () => {
     if (image) {
       URL.revokeObjectURL(image.preview);
     }
   };
 }, [image]);

 // Function to handle file change and set image state
 const handleFileChange = (event) => {
   const img = {
     preview: URL.createObjectURL(event.target.files[0]),
     data: event.target.files[0],
   };
   setImage(img);
 };

 // useEffect hook to check if user is admin and redirect if not
 useEffect(() => {
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
              id="v-pills-add-product"
              role="tabpanel"
            >
              <div className="d-lg-flex justify-content-lg-between p-3">
                <h2>Add a product</h2>
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
                  <label htmlFor="product-image">Product Image</label>
                  <input type="file" name="image" onChange={handleFileChange} />
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
                  value="Add Product"
                />
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
