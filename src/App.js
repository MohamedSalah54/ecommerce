import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from "./component/Nav";
import HomePage from './component/Home';
import Products from './component/products';
import Footer from './component/Footer';
import ProductDetails from './component/Details';
import SignUpForm from './component/Signup';
import SignInForm from './component/Signin';
import Cart from './component/Cart';
import {MyContext} from './component/MyContext';


function App() {
  const [isLogged, setLogged] = useState(false);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Search query state

  useEffect(() => {
    const user = localStorage.getItem("email");
    setLogged(!!user);

    // Load cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleLogin = (email) => {
    localStorage.setItem("email", email);
    setLogged(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    setLogged(false);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) => prevCart.map(item =>
      item.id === productId
        ? { ...item, quantity }
        : item
    ));
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(product => product.id !== productId));
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <MyContext.Provider value={{isLogged,handleLogout,cartItemCount,searchQuery,setSearchQuery,addToCart,handleLogin,cart,updateQuantity,removeFromCart}}> 
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products  />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/signup" element={<SignUpForm  />} />
        <Route path="/login" element={<SignInForm />} />
        <Route path="/cart" element={<Cart  />} />
      </Routes>
      <Footer />
    </Router>
    </MyContext.Provider>
);
}

export default App;
