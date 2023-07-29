import React from 'react'
import { Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart,decrementCartQuantity } from '../../store/features/productSlice';
import '../../styles/shoppingCart.css' 

export default function ShoppingCart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      {cart.items.map((item) => (
        <Card className='shopCart' key={item._id}>
          <Row className='w-100'>
            <Col lg={4} style={{ paddingLeft: 0 }}>
              <Card.Img variant="top" src={`http://localhost:5000/uploads/${item.image}`} />
            </Col>
            <Col lg={6} style={{ padding: 0 }}>
              <Card.Body>
                <Card.Title>{item.product_name}</Card.Title>
                <Card.Text style={{ fontWeight: 'light', marginBottom: 0 }}>
                  <span>{item.quantity}</span> x
                  {item.price} $
                </Card.Text>
                <Card.Text style={{ fontWeight: 'bold' }}>
                  {item.price * item.quantity} $
                </Card.Text>
              </Card.Body>
            </Col>
            <Col lg={2} className='edit' style={{ padding: 0 }}>
              <div className='delete'>
                <FontAwesomeIcon icon={faTrashCan} onClick={() => dispatch(removeFromCart(item._id))} />
              </div>
              <div className='quantity'>
              <button onClick={() => dispatch(decrementCartQuantity(item._id))}>-</button>
                <span className='counter'>{item.quantity}</span>
                <button onClick={() => dispatch(addToCart(item))}>+</button>
              </div>
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  )
}
