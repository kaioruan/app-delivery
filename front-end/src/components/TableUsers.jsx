import React from 'react';

import PropTypes from 'prop-types';
import api from '../services';

function TableUsers({ usersList, setUsersList }) {
  const deleteUser = async ({ target }) => {
    const { id } = target;
    await api.requestDelete(`/admin/manage/${id}`);
    const newListUser = usersList.filter((user) => user.id !== Number(id));
    setUsersList(newListUser);
  };

  return (
    <div className="table-all">
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((user, index) => (
            <tr key={ user.id }>
              <td
                data-testid={ `admin_manage__element-user-table-item-number-${index}` }
              >
                {(index + 1)}

              </td>
              <td
                data-testid={ `admin_manage__element-user-table-name-${index}` }
              >
                {user.name}

              </td>
              <td
                data-testid={ `admin_manage__element-user-table-email-${index}` }
              >
                {user.email}

              </td>
              <td
                data-testid={ `admin_manage__element-user-table-role-${index}` }
              >
                {user.role === 'seller' ? 'P. Vendedora' : 'Cliente'}

              </td>
              <td>
                {' '}
                <button
                  type="button"
                  data-testid={ `admin_manage__element-user-table-remove-${index}` }
                  id={ user.id }
                  onClick={ deleteUser }
                  className="btn"
                >
                  X
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

TableUsers.propTypes = {
  usersList: PropTypes.arrayOf().isRequired,
  setUsersList: PropTypes.func.isRequired,
};
export default TableUsers;
