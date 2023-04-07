/* eslint-disable react/jsx-closing-tag-location */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services';
import Header from '../components/HeaderAdmin';

function CreateProduct() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [failedToRegister, setFailedToRegister] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [input, setInput] = useState({
    name: '',
    price: '',
    role: 'administrador',
  });
  console.log(users);
  const ROUTER_ADMIN = '/admin/manage';

  useEffect(() => {
    const getToken = JSON.parse(localStorage.getItem('user'));
    const { token } = getToken;
    const validToken = api.setToken(token);

    if (validToken) {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = ({ target }) => {
    if (target.name === 'urlImage') {
      setInput({ ...input, urlImage: target.files[0] });
    } else {
      setInput({
        ...input,
        [target.name]: target.value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await api.requestListProduct(
        '/admin/manage/create-product',
        { ...input, urlImage: URL.createObjectURL(selectedImage) },
      );
      setFailedToRegister(false);
      setUsers((prevState) => [...prevState, data]);
      navigate('/admin/manage');
    } catch (error) {
      setFailedToRegister(true);
    }
  };

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
        setUsers(result);
      } catch (err) {
        console.error(err);
      }
    };
    loginValidate();
  }, [navigate]);

  return (
    <div>
      <Header />
      <h1 className="subtitle">Cadastrar Produto</h1>
      <div className="manage">
        <form className="list-product">
          { selectedImage
           && <div className="product-image">
             <img
               src={ URL.createObjectURL(selectedImage) }
               alt="imagem do produto"
             />

           </div>}
          <label htmlFor="nome" className="input-div one">
            <input
              id="nome"
              value={ input.name }
              name="name"
              type="text"
              placeholder="Descrição do Produto"
              onChange={ handleChange }
              className="input-price"
            />
          </label>
          <label htmlFor="price" className="input-div one">
            <input
              id="price"
              value={ input.price }
              name="price"
              type="number"
              placeholder="Preço R$: "
              onChange={ handleChange }
              className="input-price"
            />
          </label>
          <label htmlFor="urlImage" className="input-div one urlImage">
            Insira uma Imagem
            <input
              id="urlImage"
              placeholder="Insira uma Imagem"
              className="url-image"
              type="file"
              name="urlImage"
              onChange={ (event) => {
                setSelectedImage(event.target.files[0]);
              } }
            />
          </label>
          <button
            data-testid="admin_manage__button-register"
            type="submit"
            disabled={ !input.name || !input.price || !selectedImage }
            onClick={ handleSubmit }
            className="btn"
          >
            CADASTRAR
          </button>
          {
            (failedToRegister)
              ? (
                <p
                  data-testid="admin_manage__element-invalid-register"
                >
                  {
                    `Algo deu errado no seu cadastro.
                    Por favor, tente novamente.`
                  }
                </p>
              )
              : null
          }
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
