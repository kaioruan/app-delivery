import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HeaderAdmin() {
  const navigate = useNavigate();
  const [nameUser, setNameUser] = useState('');

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('user'));
    const { name } = storage;
    setNameUser(name);
  }, []);

  const logOut = () => {
    const products = navigate('/login');
    localStorage.setItem('user', '');
    return products;
  };

  const redirectCreateProduct = () => {
    const products = navigate('/admin/manage/create-product');
    return products;
  };

  return (
    <div className="product-container">
      <p
        data-testid="customer_products__element-navbar-user-full-name"
        className="title"
      >
        {nameUser}
      </p>
      <div className="btn-container">
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-orders"
          onClick={ redirectCreateProduct }
          className="btn-product"
        >
          Criar Produto
        </button>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ logOut }
          className="btn-product"
        >
          Sair
        </button>
      </div>
    </div>
  );
}

export default HeaderAdmin;
