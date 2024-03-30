import React, { useReducer, useContext, createContext } from "react";
const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];
    case "REMOVE":
      return state.filter((_, index) => index !== action.index);
    case "DROP":
      return [];
    case "UPDATE":
      return state.map((food) => {
        if (food.id === action.id) {
          const newQty = parseInt(action.qty);
          const originalPrice = food.price / food.qty; // Calculate original price per item

          return {
            ...food,
            qty: newQty,
            price: originalPrice * newQty,
          };
        }
        return food;
      });
    default:
      console.error("Error in Reducer");
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => {
  const state = useContext(CartStateContext);
  return Array.isArray(state) ? state : [];
};

export const useDispatchCart = () => useContext(CartDispatchContext);
