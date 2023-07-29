import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { Pagination, Container, Row, Col } from 'react-bootstrap';
import { DarkModeContext } from "../../context";
import ProductCard from "./ProductCard";
import Header from "./header";
import Slider from "./slider";
import CategorySelector from "./categorySelector";
import SearchBar from "./searchBar";
import Footer from "./footer";

const ProductList = () => {
  //Dark Mode
  const [darkMode] = useContext(DarkModeContext);

  //Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Products state
  const [products, setProducts] = useState([]);

  //category selector state
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  //search bar state
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch products from your API
  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let filteredProducts = products;
    
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(product => product.category._id === selectedCategory);
    }
    

    if (searchTerm) {
      filteredProducts = filteredProducts.filter(product =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    

    // Slice the products to display for the current page
    filteredProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    setDisplayedProducts(filteredProducts);

  }, [selectedCategory, currentPage, products,searchTerm]);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the total number of page
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div style={{backgroundColor: darkMode ? "#080B16" : "#fff"}}>
      <Header />
      <Slider />
      <Container>
        <Row className="d-flex justify-content-between">
          <Col xs={12} md={3}>
            <CategorySelector setSelectedCategory={setSelectedCategory} />
          </Col>
          <Col xs={12} md={5}>
            <SearchBar setSearchTerm={setSearchTerm}/>
          </Col>
        </Row>
      </Container>
      <ProductCard products={displayedProducts}  />
      <Container className="d-flex justify-content-center">
        <Pagination>
          {[...Array(totalPages)].map((page, i) => 
            <Pagination.Item key={i} active={i === currentPage - 1} onClick={() => handleClick(i + 1)}>
              {i + 1}
            </Pagination.Item>
          )}
        </Pagination>
      </Container>
      <Footer/>
    </div>
  );
};

export default ProductList;
