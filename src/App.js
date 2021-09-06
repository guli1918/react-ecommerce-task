import './App.css';

import React, { Component } from 'react';
import Topbar from './components/topbar/Topbar';
import Main from './components/main/Main';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import SingleProduct from './components/singleProduct/SingleProduct';
import NotFoundPage from './components/notFoundPage/NotFoundPage';
import Checkout from './components/checkout/Checkout';
import Card from './components/card/Card';
import SuccessPage from './components/successPage/SuccessPage';

class App extends Component {
	state = {
		products: [],
		singleProduct: [],
		currencyType: 'USD',
		cardData: [],
		attributeValue: null,
		totalPrice: 0,
		successState: false,
	};

	updateCurrencyType = (currencyType) => {
		this.setState({ currencyType });
	};

	updateCardData = (data) => {
		const { cardData } = this.state;
		const existingProductIndex = cardData.findIndex((product) => product.id === data.id);

		if (existingProductIndex !== -1) {
			cardData[existingProductIndex].qty = cardData[existingProductIndex].qty + 1;
		} else {
			cardData.push({
				...data,
				qty: 1,
			});
		}

		this.setState({ cardData });
	};

	decreaseCardData = (data) => {
		const { cardData } = this.state;
		const productIndex = this.state.cardData.findIndex((product) => product.id === data.id);

		if (cardData[productIndex].qty > 1) {
			cardData[productIndex].qty = cardData[productIndex].qty - 1;
		} else {
			cardData.splice(productIndex, 1);
		}

		this.setState({ cardData });
	};

	updateAttributeValue = (attributeValue) => {
		this.setState({ attributeValue });
	};

	getTotalPrice = () => {
		const { cardData } = this.state;

		return cardData.reduce((a, c) => {
			const price = c.prices.find((p) => p.currency === this.state.currencyType);

			return a + price.amount * c.qty;
		}, 0);
	};

	checkSuccessState = (state) => {
		this.setState({ successState: state });
	};
	render() {
		const totalPrice = this.getTotalPrice();
		return (
			<Router>
				<Topbar
					currencyType={this.state.currencyType}
					updateCurrencyType={this.updateCurrencyType}
					cardData={this.state.cardData}
					updateCardData={this.updateCardData}
					decreaseCardData={this.decreaseCardData}
					attributeValue={this.state.attributeValue}
					totalPrice={totalPrice}
				/>
				<Switch>
					<Route exact path='/'>
						<Main
							updateCardData={this.updateCardData}
							currencyType={this.state.currencyType}
							category='all'
							products={this.state.products}
							setProducts={(products) => this.setState({ products })}
						/>
					</Route>
					<Route path='/clothes'>
						<Main
							updateCardData={this.updateCardData}
							currencyType={this.state.currencyType}
							category='clothes'
							products={this.state.products}
							setProducts={(products) => this.setState({ products })}
						/>
					</Route>
					<Route path='/tech'>
						<Main
							updateCardData={this.updateCardData}
							currencyType={this.state.currencyType}
							category='tech'
							products={this.state.products}
							setProducts={(products) => this.setState({ products })}
						/>
					</Route>
					<Route
						path='/product/:id'
						render={(props) => (
							<SingleProduct
								updateCardData={this.updateCardData}
								currencyType={this.state.currencyType}
								updateAttributeValue={this.updateAttributeValue}
								attributeValue={this.state.attributeValue}
								{...props}
							/>
						)}
					/>
					<Route path='/card'>
						<Card
							attributeValue={this.state.attributeValue}
							cardData={this.state.cardData}
						/>
					</Route>
					<Route path='/checkout'>
						{console.log(this.state.successState)}
						<Checkout
							cardData={this.state.cardData}
							currencyType={this.state.currencyType}
							totalPrice={totalPrice}
							checkSuccessState={this.checkSuccessState}
						/>
					</Route>
					{this.state.successState && (
						<Route path='/success'>
							<SuccessPage />
						</Route>
					)}
					<Route component={NotFoundPage} />
					<Redirect to='/404' />
				</Switch>
			</Router>
		);
	}
}

export default App;
