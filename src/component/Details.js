import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MyContext } from './MyContext';
import { useContext } from 'react';

const ProductDetails = () => {
  const {addToCart,isLogged} = useContext(MyContext)
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the specific product from JSON file
    fetch(`http://localhost:8000/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
        setLoading(false);
      });
  }, [id]);

  const handleBack = () => {
    navigate('/products');
  };

  const handleAddToCart = (product) => {
    if (isLogged) {
      addToCart(product);
      setMessage('Added to cart successfully!');

    } else if(isLogged){
      navigate('/login'); // Redirect to login page if not logged in
    }
  };
    

  
  
  



  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <section className="product-details">
      <div className="product-detail-card">
        <img src={product.image} alt={product.name} />
        <div className="product-detail-info">
          <h2>{product.name}</h2>
          <p>${product.price.toFixed(2)}</p>
          <p>{product.description}</p>
          <button className='back' onClick={handleBack}>Back To Products</button>
          {!message && (
            <button className='add' onClick={() => handleAddToCart(product)}>Add to cart</button>
          )}
          {message && <p className="success-message">{message}</p>}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
