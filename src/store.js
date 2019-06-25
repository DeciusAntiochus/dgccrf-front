import { combineReducers, createStore } from 'redux';
import navbarReducer from './containers/navbar/reducer';

export const configureStore = () => {
  const reducers = combineReducers({
    navbarReducer: navbarReducer
  });
  const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};
