import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer,toast  } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Welcome from "./components/welcomePage/welcome"
import WhyChooseUs from './components/welcomePage/WhyChooseUs';
import ContactUs from "./components/welcomePage/contactUs";
import ProductList from "./components/productListPage/ProductList";
import Login from "./components/userAuth/Login"
import Register from "./components/userAuth/Register"
import Dashboard from "./components/Admin/Dashboard";
import AddProduct from "./components/Admin/AddProduct";
import AddCategory from "./components/Admin/AddCategory";
import EditProduct from "./components/Admin/EditProduct";



function App() {
  useEffect(() => {
    if (!document.querySelector('#quickchat_script')) {
      const script = document.createElement('script');
      script.src = "https://quickchat.ai/user_kit/quickchat8vqb7j.js";
      script.async = true;
      script.id = "quickchat_script";
      script.setAttribute("scenario_id", "q4lr06996t");
      document.body.appendChild(script);
    }
  }, []);
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/why-choose-us" element={<WhyChooseUs />} />
          <Route path="/contact-us" element={<ContactUs/>} /> 
          <Route path="/products" element={<ProductList/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/add-product" element={<AddProduct/>} />
          <Route path="/add-category" element={<AddCategory/>} />
          <Route path="/modify/:id" element={<EditProduct/>} />

        </Routes>
      </BrowserRouter>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </>
  )
}

export default App
