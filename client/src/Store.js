import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

// const initialState = {};
/* eslint-disable no-underscore-dangle */
const devTools =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    : null;
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    devTools
  )
);
/* eslint-enable */
export default store;
