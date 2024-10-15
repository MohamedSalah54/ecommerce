import React, { useState, useEffect } from 'react';
import { MyContext } from './MyContext';
import { useContext } from 'react';

const Cart = () => {

const {cart,updateQuantity,removeFromCart} =useContext(MyContext);

  // State to manage quantities

  const [quantities, setQuantities] = useState({});

  // Initialize quantities from cartItems
  useEffect(() => {
    const initialQuantities = cart.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {});
    setQuantities(initialQuantities);
  }, [cart]);

  // Update local storage whenever quantities change
  useEffect(() => {
    const updatedCart = cart.map(item => ({
      ...item,
      quantity: quantities[item.id] || 1
    }));
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }, [quantities, cart]);

  // Calculate total cost
  const totalCost = cart.reduce(
    (total, item) => total + item.price * (quantities[item.id] || 1),
    0
  );

  const increaseQuantity = (id) => {
    const newQuantity = (quantities[id] || 1) + 1;
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: newQuantity
    }));
    updateQuantity(id, newQuantity);
  };

  const decreaseQuantity = (id) => {
    const newQuantity = Math.max((quantities[id] || 1) - 1, 1);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: newQuantity
    }));
    updateQuantity(id, newQuantity);
  };

  return (
    <section className="cart-section">
      <h2> 🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>${(item.price * (quantities[item.id] || 1)).toFixed(2)}</p>
                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{quantities[item.id] || 1}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="total-cost">

        <h3>Total Cost: ${totalCost.toFixed(2)}</h3>
      </div>
    </section>
  );
};

export default Cart;
