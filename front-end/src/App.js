import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import './App.css';
import DeliveryProvider from './context/Provider';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import MeusPedidosCostumer from './pages/MeusPedidosCostumer';
import Products from './pages/Products';
import ProductsAdmin from './pages/ProductsAdmin';
import Gerenciamento from './pages/Gerenciamento';
import DetalhesPedidoCostumer from './pages/DetalhesDePedidosCostumer';
import MeusPedidosSeller from './pages/MeusPedidosSeller';
import DetalhesDePedidoSeller from './pages/DetalhesDePedidoSeller';
import CreateProduct from './pages/CreateProduct';

function App() {
  return (
    <DeliveryProvider>
      <Routes>
        <Route exact path="/" element={ <Navigate to="/login" /> } />
        <Route exact path="/admin/manage" element={ <Gerenciamento /> } />
        <Route exact path="/register" element={ <Cadastro /> } />
        <Route exact path="/login" element={ <Login /> } />
        <Route exact path="/customer/orders" element={ <MeusPedidosCostumer /> } />
        <Route exact path="/customer/checkout" element={ <Checkout /> } />
        <Route exact path="/customer/products" element={ <Products /> } />
        <Route exact path="/customer/orders/:id" element={ <DetalhesPedidoCostumer /> } />
        <Route exact path="/seller/orders" element={ <MeusPedidosSeller /> } />
        <Route exact path="/seller/orders/:id" element={ <DetalhesDePedidoSeller /> } />
        <Route exact path="/admin/manage/create-product" element={ <CreateProduct /> } />
        <Route exact path="/admin/manage/products" element={ <ProductsAdmin /> } />
      </Routes>
    </DeliveryProvider>
  );
}

export default App;
