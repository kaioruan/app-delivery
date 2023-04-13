import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../services';
import ProductCard from '../components/ProductCardAdmin';
import Header from '../components/HeaderAdmin';
import { requestDelete } from '../services/request';

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

  const handleDelete = async (event) => {
    const { id } = event.target;
    console.log(id);
    await requestDelete(`/admin/manage/products/${id}`);
    const data = await api.requestData('/customer/products');
    setProducts(data);
    Swal.fire({
      title: 'Deletado!',
      text: 'Produto foi removido com sucesso!',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };

  return (
    <section>
      <Header />
      <div className="container-products">
        { products.map((product) => (
          <ProductCard
            key={ product.id }
            product={ product }
            handleDelete={ handleDelete }
          />
        ))}
      </div>
    </section>
  );
}

export default ProductsAdmin;
