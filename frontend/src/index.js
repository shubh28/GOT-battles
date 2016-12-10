import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import Battle from './components/Battle';
import {Router,Route,hashHistory} from 'react-router' 

ReactDOM.render(
    <Router history = {hashHistory}>
    	<Route path="/" component={App}/>
    	<Route path="/:king" component={Battle} />
    </Router>
  , document.querySelector('#container'));
