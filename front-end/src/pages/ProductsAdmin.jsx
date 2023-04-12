import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services';
import ProductCard from '../components/ProductCardAdmin';
import Header from '../components/HeaderAdmin';

function ProductsAdmin() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // validação para token ao acessar a page
    const getToken = JSON.parse(localStorage.getItem('user'));
    const { token } = getToken;
    const requestValid = async () => {
      try {
        api.setToken(token);
        const validToken = await api.validLogin('/login/validate');
        if (!validToken) {
          localStorage.setItem('user', '');
          navigate('/login');
        }
      } catch (err) {
        console.error(err);
      }
    };
    requestValid();
  }, [navigate]);

  useEffect(() => {
    const loginValidate = async () => {
      try {
        const data = await api.requestData('/customer/products');
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };
    loginValidate();
  }, []);

  return (
    <section>
      <Header />
      <div className="container-products">
        { products.map((product) => (
          <ProductCard
            key={ product.id }
            product={ product }
          />
        ))}
      </div>
    </section>
  );
}

export default ProductsAdmin;
