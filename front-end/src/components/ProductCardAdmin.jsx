import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ProductCard({ product, handleDelete }) {
  const [productCard] = useState(product);

  return (
    <div>
      <div key={ productCard.id } className="item">
        <p
          name={ productCard.name }
          data-testid={ `customer_products__element-card-title-${productCard.id}` }
        >
          {productCard.name}
        </p>
        <p
          name={ productCard.name }
          data-testid={ `customer_products__element-card-price-${productCard.id}` }
        >
          { `R$ ${productCard.price.replace('.', ',')}` }
        </p>
        <img
          name={ productCard.name }
          data-testid={ `customer_products__img-card-bg-image-${productCard.id}` }
          src={ productCard.url_image }
          alt={ productCard.name }
        />
        <div className="quantity remove">
          <button
            type="button"
            id={ productCard.id }
            data-testid={ `customer_products__button-card-rm-item-${productCard.id}` }
            name={ productCard.name }
            value={ productCard.price }
            onClick={ handleDelete }
          >

            X
          </button>
        </div>

      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    url_image: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ProductCard;
