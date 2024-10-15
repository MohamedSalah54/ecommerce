import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa'; // Import the cart icon
import { TbListDetails } from "react-icons/tb";
import { MyContext } from './MyContext';
import { useContext } from 'react';

const Products = () => {

  const {addToCart,isLogged,searchQuery} = useContext(MyContext)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Filter products based on the search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  const handleShowDetails = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (product) => {
    if (isLogged) {
      addToCart(product);
    } else {
      navigate('/login'); // Redirect to login page if not logged in
    }
  };

  return (
    <section className="products-section">
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
                <button className="view-details-btn" onClick={() => handleShowDetails(product.id)}>
                  <TbListDetails />
                  View Details
                </button>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                  <FaCartPlus className="view-details-icon" /> Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </section>
  );
};

export default Products;
