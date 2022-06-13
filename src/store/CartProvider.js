import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  persons: [],
  amounts: 0,
  totalAmount: 0,
};



const cartReducer = (state, action) => {

  switch (action.type) { 

  //console.log('aaaa',state)
  
  
  case  "ADD" :  {
    
    // console.log(state.items)
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount + (action.item.price );
    
    // console.log(state.persons)
    // console.log(state.items)
    // console.log(state.totalAmount)

    // const updatedTotalAmount = state.totalAmount + (existingCartItem.price * existingCartItem.amount);
    // let updatedTotalAmount;
    // if (existingCartItem) {
    //    updatedTotalAmount =
    //    state.totalAmount + (existingCartItem.price );
    // }else{
    //    updatedTotalAmount =
    // state.totalAmount + (action.item.price );
    // }
    
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        // amount: existingCartItem.amount + action.item.amount,
        amount: existingCartItem.amount + 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    
    return {
      ...state,
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }




  case "ADDFEW" : {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );


    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount);
    
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        // amount: existingCartItem.amount + action.item.amount,
        amount: existingCartItem.amount + action.item.amount ,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      ...state,
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  case  "DELETE" : {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - (existingItem.price * existingItem.amount);
    let updatedItems;
    updatedItems = state.items.filter((item) => item.id !== action.id);

    return {
      ...state,
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      
    };
  }

  case "REMOVE" : {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    const updatedAmount = existingItem.amount
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
      
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      amounts : updatedAmount,
    };
  }

  case "ADDNEXT" :  {
    return{
      ...state,
      persons:  [...state.persons,action.person],
      // items: [],
      // totalAmount: 0
    }
  }

  case  "CLEAR" : {
    return defaultCartState;
  }

  default: {
    return defaultCartState;
  }

}

  // return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const addFewItemHandler = (item) => {
    dispatchCartAction({ type: 'ADDFEW', item: item})
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const deleteItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "DELETE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const addNextPersonHandler = (person) => {
    dispatchCartAction({ type: "ADDNEXT", person: person });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    persons: cartState.persons,
    amounts: cartState.amounts,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
    deleteItem: deleteItemFromCartHandler,
    addFewItem: addFewItemHandler,
    addNext: addNextPersonHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
