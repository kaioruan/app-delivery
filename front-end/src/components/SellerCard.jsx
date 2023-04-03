import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import * as moment from 'moment';

function SellerCard({
  id, saleDate, totalPrice, status, deliveryAddress, deliveryNumber }) {
  const [deliveryStatus, setDeliveryStatus] = useState('');
  const formatDate = moment(saleDate).format('DD/MM/YYYY');

  useEffect(() => {
    switch (status) {
    case 'Entregue':
      setDeliveryStatus('orderEntregue');
      break;
    case 'Preparando':
      setDeliveryStatus('orderTransito');
      break;
    case 'Pendente':
      setDeliveryStatus('orderPendente');
      break;
    default:
      break;
    }
  }, [status, saleDate]);

  return (
    <div className="item-seller order">
      <span
        data-testid={ `seller_orders__element-order-id-${id}` }
        className="orderNum"
      >
        {`Pedido ${String(id)}`}
      </span>
      <p
        data-testid={ `seller_orders__element-delivery-status-${id}` }
        className={ deliveryStatus }
      >
        {status}
      </p>
      <p data-testid={ `seller_orders__element-card-address-${id}` }>
        {`Endereço: ${deliveryAddress}, ${deliveryNumber}`}
      </p>
      <div className="orderDetail">
        <p data-testid={ `seller_orders__element-order-date-${id}` }>
          {`Data do Pedido: ${formatDate}`}
        </p>
        <p data-testid={ `seller_orders__element-card-price-${id}` }>
          {`Valor: R$ ${String(totalPrice).replace('.', ',')}`}
        </p>
      </div>
    </div>
  );
}

SellerCard.propTypes = {
  id: PropTypes.number.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  deliveryAddress: PropTypes.string.isRequired,
  deliveryNumber: PropTypes.string.isRequired,
};

export default SellerCard;
