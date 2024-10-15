import React from 'react';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
    const navigate = useNavigate()  
    
    const handleHome = () =>{
        navigate("/products")
    }
  return (
    <div className="homepage">
      <header className="hero-section">
        <h1>Welcome to ShopEasy</h1>
        <p>Your one-stop shop for all your needs</p>
        <button className="shop-now-btn" onClick={handleHome}>Shop Now</button>
      </header>
      
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {/* Example product cards */}
          <div className="product-card">
            <img src="https://media.finishline.com/i/finishline/NF0A833C_001_M5?$default$&w=670&h=670&bg=rgb(237,237,237)" alt="Product 1" />
            <h3>Product 1</h3>
            <p>$199.99</p>
            <button className="view-details-btn">View Details</button>
          </div>
          <div className="product-card">
            <img src="https://content.woolovers.com/img/747x856/78085_p100c_greymarl_w_52.jpg" alt="Product 2" />
            <h3>Product 2</h3>
            <p>$249.99</p>
            <button className="view-details-btn">View Details</button>
          </div>
          <div className="product-card">
            <img src="https://image.doba.com/dg7-OQqDkYzUpovJ/men-casual-shoes-fashion-men-shoes-pu-leather-mens-loafers-shoes-moccasins-slip-on-mens-flats-male-driving-shoes.webp" alt="Product 3" />
            <h3>Product 3</h3>
            <p>$129.99</p>
            <button className="view-details-btn">View Details</button>
          </div>
          {/* Add more products as needed */}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
