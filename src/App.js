import './App.css';

import React, { Component } from 'react';
import Topbar from './components/topbar/Topbar';
import Main from './components/main/Main';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import SingleProduct from './components/singleProduct/SingleProduct';
import NotFoundPage from './components/notFoundPage/NotFoundPage';
import Checkout from './components/checkout/Checkout';
import Cart from './components/cart/Cart';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currencyType: null,
		};
	}
	handleCurrencyType = (type) => {
		this.setState({ currencyType: type });
	};
	render() {
		return (
			<div>
				{console.log(this.state.currencyType)}
				<Router>
					<Topbar sendCurrencyType={this.handleCurrencyType} />
					<Switch>
						<Route exact path='/'>
							<Main currencyType={this.state.currencyType} category='all' />
						</Route>
						<Route path='/clothes'>
							<Main category='clothes' />
						</Route>
						<Route path='/tech'>
							<Main category='tech' />
						</Route>
						<Route path='/product/:id' component={SingleProduct} />
						<Route path='/checkout'>
							<Checkout />
						</Route>
						<Route path='/cart'>
							<Cart />
						</Route>
						<Route path='/404' component={NotFoundPage} />
						<Redirect to='/404' />
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
