// src/redux/store.js

import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import cartReducer from './reducers/cartReducer';
import productReducer from './reducers/productReducer';
import rootSaga from './sagas';

const loadCartState = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    return serializedCart ? JSON.parse(serializedCart) : undefined;
  } catch {
    return undefined;
  }
};

const saveCartState = (state) => {
  try {
    const serializedCart = JSON.stringify(state.cart);
    localStorage.setItem('cart', serializedCart);
  } catch {
    // ignore write errors
  }
};

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
});

const preloadedState = {
  cart: loadCartState(),
};

const store = createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(sagaMiddleware)
);

store.subscribe(() => {
  saveCartState(store.getState());
});

sagaMiddleware.run(rootSaga);

export default store;
