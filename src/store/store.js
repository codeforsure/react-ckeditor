import {createStore, applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from "../reducers/reducer.js";
import { devToolsEnhancer } from 'redux-devtools-extension'

const middleware = applyMiddleware(thunk,logger);
const enhancer = [middleware,devToolsEnhancer({})];
const store = createStore(reducer, undefined, compose(...enhancer));
export default store;
