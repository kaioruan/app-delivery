import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validLogin, setToken, requestSale } from '../services/request';
// import { pessoa } from '../mock/checkout';
import Header from '../components/Header';

function Checkout() {
  const navigate = useNavigate();

  const [dataCart, setDataCart] = useState([]);
  const [dataSeller, setDataSeller] = useState([]);
  const [total, setTotal] = useState(0);
  const [IdSeller, setIdSeller] = useState(0);
  const [dados, setDados] = useState({
    option: '',
    endereco: '',
    numero: '',
  });

  useEffect(() => {
    // validação do token ao acessar a página
    const getToken = JSON.parse(localStorage.getItem('user'));
    const { token } = getToken;
    const requestValid = async () => {
      try {
        setToken(token);
        const validToken = await validLogin('/login/validate');
        if (!validToken) {
          navigate('/login');
        }
      } catch (error) {
        console.log(error);
      }
    };
    requestValid();
  }, [navigate]);

  useEffect(() => {
    const getSeller = JSON.parse(localStorage.getItem('seller'));
    const getCart = JSON.parse(localStorage.getItem('cart'));
    const getTotal = JSON.parse(localStorage.getItem('total'));
    getCart.forEach((i) => {
      i.totalProduct = (i.price * i.quantity).toFixed(2);
    });
    setDataSeller(getSeller);
    setDataCart(getCart);
    setTotal(getTotal);
  }, [setDataCart]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'option') {
      const { selectedIndex, childNodes } = target;
      const getId = childNodes[selectedIndex];
      const option = getId.getAttribute('id');
      setIdSeller(option);
    }
    setDados((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createNewOrderRedirectDetail = async () => {
    const getUser = JSON.parse(localStorage.getItem('user'));
    const getTotal = JSON.parse(localStorage.getItem('total'));
    // const getIdSeller = dataSeller.fi((i) => i.name === dados.option);
    const newOrder = {
      userId: getUser.id,
      sellerId: Number(IdSeller),
      totalPrice: getTotal,
      deliveryAddress: dados.endereco,
      deliveryNumber: dados.numero,
      status: 'Pendente',
      order: dataCart,
    };

    console.log(newOrder);
    setToken(getUser.token);
    const { id } = await requestSale('/customer/sale', newOrder);
    if (id) return navigate(`customer/orders/${id}`);
  };

  const handleClickRemove = ({ target }) => {
    const removeItem = dataCart.filter((i, index) => index !== Number(target.id));
    localStorage.setItem('cart', JSON.stringify(removeItem));
    setDataCart(removeItem);
    const totalValue = removeItem.reduce((
      acc,
      { price, quantity },
    ) => acc + (price * quantity), 0).toFixed(2);
    localStorage.setItem('total', JSON.stringify(totalValue));
    setTotal(totalValue);
  };

  const titulos = [
    'Item',
    'Descrição',
    'Quantidade',
    'Valor Unitário',
    'Sub-total',
    'Remover Item',
  ];

  return (
    <div>
      <Header />
      <h1>Finalizar Pedido</h1>
      <div>
        <table>
          <thead>
            <tr>
              { titulos.map((titulo) => (
                <th key={ titulo }>{titulo}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {
              dataCart.map((data, index) => (
                <tr key={ index }>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-item-number-${index}`
                    }
                  >
                    {(index + 1)}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-name-${index}`
                    }
                  >
                    {data.name}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-quantity-${index}`
                    }
                  >
                    {data.quantity}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-unit-price-${index}`
                    }
                  >
                    {`R$ ${data.price.replace('.', ',')}`}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-sub-total-${index}`
                    }
                  >
                    {`R$ ${data.totalProduct.replace('.', ',')}`}
                  </td>
                  <td>
                    <button
                      id={ index }
                      type="button"
                      onClick={ handleClickRemove }
                      data-testid={
                        `customer_checkout__element-order-table-remove-${index}`
                      }
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <h2
          data-testid="customer_checkout__element-order-total-price"
        >
          {`Total: R$ ${total.toString().replace('.', ',')}`}

        </h2>
      </div>
      <h1>Detalhes e Endereço para Entrega</h1>
      <div>
        <label htmlFor="1">
          P.Vendedora Responsável:
          <select
            id="1"
            data-testid="customer_checkout__select-seller"
            value={ dados.option }
            name="option"
            onChange={ handleChange }
          >
            { dataSeller.map(({ name, id }, index) => (
              <option id={ id } key={ id }>{ name }</option>
            ))}
          </select>
        </label>
        <label htmlFor="2">
          Endereço
          <input
            id="2"
            type="text"
            name="endereco"
            data-testid="customer_checkout__input-address"
            value={ dados.endereco }
            onChange={ handleChange }
            placeholder="Rua dos remotos, bairro AWS"
          />
        </label>
        <label htmlFor="3">
          Número
          <input
            id="3"
            type="text"
            name="numero"
            data-testid="customer_checkout__input-address-number"
            value={ dados.numero }
            onChange={ handleChange }
            placeholder="666"
          />
        </label>
        <div>
          <button
            type="submit"
            data-testid="customer_checkout__button-submit-order"
            onClick={ createNewOrderRedirectDetail }
          >
            FINALIZAR PEDIDO
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
