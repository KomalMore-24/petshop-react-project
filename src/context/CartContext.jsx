import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Cart Context
const CartContext = createContext();

// Initial state
const initialState = {
  cartItems: [],
  totalItems: 0,
  subtotal: 0,
  serviceCharge: 0,
  grandTotal: 0,
  isLoading: false
};

// Action types
const CART_ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART',
  SET_LOADING: 'SET_LOADING'
};

// Calculate totals
const calculateTotals = (cartItems) => {
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const serviceCharge = subtotal * 0.05; // 5% service charge
  const grandTotal = subtotal + serviceCharge;
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    serviceCharge: parseFloat(serviceCharge.toFixed(2)),
    grandTotal: parseFloat(grandTotal.toFixed(2)),
    totalItems
  };
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_TO_CART: {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      
      let updatedCart;
      if (existingItem) {
        updatedCart = state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        updatedCart = [...state.cartItems, action.payload];
      }

      const totals = calculateTotals(updatedCart);
      
      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));

      return {
        ...state,
        cartItems: updatedCart,
        ...totals
      };
    }

    case CART_ACTIONS.REMOVE_FROM_CART: {
      const updatedCart = state.cartItems.filter(item => item.id !== action.payload);
      const totals = calculateTotals(updatedCart);
      
      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));

      return {
        ...state,
        cartItems: updatedCart,
        ...totals
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        const updatedCart = state.cartItems.filter(item => item.id !== id);
        const totals = calculateTotals(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        
        return {
          ...state,
          cartItems: updatedCart,
          ...totals
        };
      }

      const updatedCart = state.cartItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      const totals = calculateTotals(updatedCart);
      
      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));

      return {
        ...state,
        cartItems: updatedCart,
        ...totals
      };
    }

    case CART_ACTIONS.CLEAR_CART: {
      localStorage.removeItem('cartItems');
      return {
        ...initialState
      };
    }

    case CART_ACTIONS.LOAD_CART: {
      const totals = calculateTotals(action.payload);
      return {
        ...state,
        cartItems: action.payload,
        ...totals,
        isLoading: false
      };
    }

    case CART_ACTIONS.SET_LOADING: {
      return {
        ...state,
        isLoading: action.payload
      };
    }

    default:
      return state;
  }
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: cartItems });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: [] });
      }
    } else {
      dispatch({ type: CART_ACTIONS.LOAD_CART, payload: [] });
    }
  }, []);

  // Action creators
  const addToCart = (product, quantity = 1) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    };
    
    dispatch({
      type: CART_ACTIONS.ADD_TO_CART,
      payload: cartItem
    });
  };

  const removeFromCart = (productId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_FROM_CART,
      payload: productId
    });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id: productId, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const setLoading = (isLoading) => {
    dispatch({
      type: CART_ACTIONS.SET_LOADING,
      payload: isLoading
    });
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setLoading
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CART_ACTIONS };
