import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import createStore from './store';


ReactDOM.render(
    <Provider store={createStore()}>
        <App/>
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
