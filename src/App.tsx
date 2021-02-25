import React from 'react';
import './App.css';
import { hot } from 'react-hot-loader'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Chat from './pages/chat'
import { RecoilRoot } from 'recoil';
import Login from './pages/account/Login';
import Register from './pages/account/Register';
import Contact from './pages/contact';

function App() {
	return (
		<RecoilRoot>
			<BrowserRouter>
				<Switch>
					<Route exact path="/chat" component={Chat}/>
					<Route exact path="/contact" component={Contact}/>
					<Route exact path="/account/login" component={Login}/>
					<Route exact path="/account/register" component={Register}/>
				</Switch>
			</BrowserRouter>
		</RecoilRoot>
	)
}

export default hot(module)(App);
