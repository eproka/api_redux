
import { thunk } from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from "redux";
import { registrationReducer, userReducer } from "./reducers";
import { notesReducer } from "./reducers";

const rootReducer = combineReducers({
    registration: registrationReducer, 
    user: userReducer,
    notes: notesReducer,
  });
  

  const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;