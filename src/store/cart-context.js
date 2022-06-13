import React from 'react';

const CartContext = React.createContext({
  items: [],
  persons: [],
  amounts: 0,
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
  deleteItem: (id) => {},
  addFewItem: (item) => {},
  addNext: (person) => {},
});

export default CartContext;