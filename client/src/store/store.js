import {combineReducers, createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";

import tickerReducer from "./ticker-reducer";

let reducers = combineReducers({
    tickerReducer: tickerReducer,
});


let store = createStore(reducers, applyMiddleware(thunkMiddleware));


export default store;