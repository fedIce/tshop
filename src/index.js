import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import RootReducer from './store';
import { persistStore } from 'redux-persist'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(RootReducer, applyMiddleware(thunk))
const persist = persistStore(store)

const container = document.getElementById('root')

const root = ReactDOMClient.createRoot(container)

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persist}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
