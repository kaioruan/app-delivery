import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services';
import Header from '../components/HeaderAdmin';
import CadastroUserAdmin from '../components/CadastroUserAdmin';
import TableUsers from '../components/TableUsers';

function Gerenciamento() {
  const navigate = useNavigate();
  const [usersList, setUsersList] = useState([]);
  const ROUTER_ADMIN = '/admin/manage';
  useEffect(() => {
    const getToken = JSON.parse(localStorage.getItem('user'));
    const { token } = getToken;
    const validToken = api.setToken(token);

    if (validToken) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const loginValidate = async () => {
      try {
        const token = localStorage.getItem('token');
        const validate = await api.requestLogin('/login/validate', { token });
        if (!validate) {
          localStorage.setItem('user', '');
          navigate('/login');
        }
        const data = await api.requestData(ROUTER_ADMIN);

        const result = data.filter((user) => user.role !== 'administrator');
        setUsersList(result);
      } catch (err) {
        console.error(err);
      }
    };
    loginValidate();
  }, [navigate]);

  return (
    <main>
      <Header />
      <h1 className="subtitle">Cadastro</h1>
      <CadastroUserAdmin setUsersList={ setUsersList } />
      <h1 className="subtitle-users">Lista de Usuários</h1>
      <TableUsers usersList={ usersList } setUsersList={ setUsersList } />
    </main>
  );
}

export default Gerenciamento;
