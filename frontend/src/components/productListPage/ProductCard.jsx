import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { DarkModeContext } from "../../context";
import {  useContext } from 'react';
import "../../styles/productCard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/features/productSlice';


export default function ProductCard({ products }) {
  //Dark Mode
const [darkMode] = useContext(DarkModeContext);

// Redux dispatch
const dispatch = useDispatch();

  return (
    <div >
    <Container className='cardContainer' >
      <Row>
        {products.map((product, index) => (
          <Col sm={12} md={6} lg={4} key={product._id}>
            <Card className="card product mb-4" style={{backgroundColor: darkMode ? "#857eab" : "#fff"}}>
            <Card.Img className="product-image" variant="top" src={`http://localhost:5000/uploads/${product.image}`} />
              <Card.Body >
                <div className="namePrice">
                  <Card.Title className="titleProduct">{product.product_name}</Card.Title>
                  
                  <Card.Text className="price" >{`$${product.price}`}</Card.Text>
                </div>
                <Card.Subtitle className="mb-2">{product.brand}</Card.Subtitle>
                <Card.Text style={{fontSize: "small"}}>{product.description}</Card.Text>

                <div className='addButton' onClick={() => dispatch(addToCart(product))}>Add to cart <FontAwesomeIcon icon={faCartPlus} /></div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </div>
  );
}
