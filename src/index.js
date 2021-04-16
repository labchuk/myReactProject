import reportWebVitals from './reportWebVitals'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReduser from './store/reducers/rootReduser'
import thunk from 'redux-thunk'
import {transitions, positions, Provider as AlertProvider, types} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import {AUTH_SUCCESS} from "./store/actions/actionTypes";

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose

const store = createStore(rootReduser, composeEnhancers(applyMiddleware(thunk)))
const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_CENTER,
    type: types.SUCCESS,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
};
const app = (
  <React.StrictMode>
    <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AlertProvider>
    </Provider>
  </React.StrictMode>
)

ReactDOM.render(app, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
