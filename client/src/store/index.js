import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk' // helpl when action dispatch
import AllReducers from './reducers/index';


const store = createStore (
    AllReducers,
    {},
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    //window.devToolsExtension && window.devToolsExtension(),
    applyMiddleware(thunk)
    

); // Three parameters. first Reducers, second any object e.g { } , third middleware

export default store;