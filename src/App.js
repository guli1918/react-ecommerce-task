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
			cartData: [],
		};
	}
	handleCurrencyType = (type) => {
		this.setState({ currencyType: type });
	};
	handleCartData = (data) => {
		this.setState({ cartData: data });
	};
	render() {
		return (
			<div>
				<Router>
					<Topbar
						sendCartData={this.state.cartData}
						sendCurrencyType={this.handleCurrencyType}
					/>
					<Switch>
						<Route exact path='/'>
							<Main
								cartData={this.handleCartData}
								currencyType={this.state.currencyType}
								category='all'
							/>
						</Route>
						<Route path='/clothes'>
							<Main
								cartData={this.handleCartData}
								currencyType={this.state.currencyType}
								category='clothes'
							/>
						</Route>
						<Route path='/tech'>
							<Main
								cartData={this.handleCartData}
								currencyType={this.state.currencyType}
								category='tech'
							/>
						</Route>
						<Route
							path='/product/:id'
							component={(props) => (
								<SingleProduct currencyType={this.state.currencyType} {...props} />
							)}
						/>
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
