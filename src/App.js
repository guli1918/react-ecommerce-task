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
		currencyType: 'USD',
		cardData: [],
		totalPrice: 0,
		successState: false,
		cardClick: false,
		currency: false,
		card: false,
		attributeValue: [],
		uniqueValue: true,
	};

	handleClickCurrency = (state) => {
		this.setState({ currency: state });
		this.setState({ card: false });
	};
	handleClickCard = (state) => {
		this.setState({ card: state });
		this.setState({ currency: false });
	};

	updateCurrencyType = (currencyType) => {
		this.setState({ currencyType });
	};

	updateAttributeValue = (item) => {
		const { cardData, attributeValue } = this.state;
		const existingProductIndex = cardData.findIndex((product) => product.id === item.id);

		const uniqueValue =
			cardData[existingProductIndex].selectedAttributes.indexOf(attributeValue) === -1;
		cardData[existingProductIndex].selectedAttributes = [
			...cardData[existingProductIndex].selectedAttributes,
			attributeValue,
		];
		this.setState({ uniqueValue });
		this.setState({ attributeValue: [] });
		console.log(cardData[existingProductIndex].selectedAttributes);
	};

	getAttributeValue = (value) => {
		this.setState({ attributeValue: [...this.state.attributeValue, value] });
	};

	displayNextImg = (item) => {
		const { cardData } = this.state;

		if (item.gallery.length - 1 > item.displayImg) {
			item.displayImg = item.displayImg + 1;
		}

		this.setState({ cardData });
	};

	displayPreviousImg = (item) => {
		const { cardData } = this.state;
		if (item.displayImg !== 0) {
			item.displayImg = item.displayImg - 1;
		}
		this.setState({ cardData });
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
				displayImg: 0,
				selectedAttributes: [],
			});
		}
		this.setState({ cardData });
	};

	decreaseCardData = (data) => {
		const { cardData } = this.state;
		const productIndex = cardData.findIndex((product) => product.id === data.id);

		if (cardData[productIndex].qty > 1) {
			cardData[productIndex].qty = cardData[productIndex].qty - 1;
		} else {
			cardData.splice(productIndex, 1);
		}

		this.setState({ cardData });
	};

	getTotalPrice = () => {
		const { cardData, currencyType } = this.state;

		return cardData.reduce((a, c) => {
			const price = c.prices.find((p) => p.currency === currencyType);

			return a + price.amount * c.qty;
		}, 0);
	};

	checkSuccessState = (state) => {
		this.setState({ successState: state });
	};

	handleClickOverlays = () => {
		this.setState({
			card: false,
			currency: false,
		});
	};

	render() {
		const { products, currencyType, cardData, successState, currency, card, attributeValue } =
			this.state;

		const totalPrice = this.getTotalPrice();
		return (
			<Router>
				<Topbar
					currencyType={currencyType}
					updateCurrencyType={this.updateCurrencyType}
					cardData={cardData}
					updateCardData={this.updateCardData}
					decreaseCardData={this.decreaseCardData}
					totalPrice={totalPrice}
					card={card}
					currency={currency}
					handleClickCurrency={this.handleClickCurrency}
					handleClickCard={this.handleClickCard}
				/>
				<div onClick={this.handleClickOverlays} className='App'>
					<Switch>
						<Route exact path='/'>
							<Main
								updateCardData={this.updateCardData}
								currencyType={currencyType}
								category='all'
								products={products}
								setProducts={(products) => this.setState({ products })}
								card={card}
							/>
						</Route>
						<Route path='/clothes'>
							<Main
								updateCardData={this.updateCardData}
								currencyType={currencyType}
								category='clothes'
								products={products}
								setProducts={(products) => this.setState({ products })}
							/>
						</Route>
						<Route path='/tech'>
							<Main
								updateCardData={this.updateCardData}
								currencyType={currencyType}
								category='tech'
								products={products}
								setProducts={(products) => this.setState({ products })}
							/>
						</Route>
						<Route
							path='/product/:id'
							render={(props) => (
								<SingleProduct
									updateCardData={this.updateCardData}
									currencyType={currencyType}
									updateAttributeValue={this.updateAttributeValue}
									getAttributeValue={this.getAttributeValue}
									attributeValue={attributeValue}
									{...props}
								/>
							)}
						/>
						<Route path='/card'>
							<Card
								updateCardData={this.updateCardData}
								decreaseCardData={this.decreaseCardData}
								cardData={cardData}
								currencyType={currencyType}
								displayNextImg={this.displayNextImg}
								displayPreviousImg={this.displayPreviousImg}
							/>
						</Route>
						<Route path='/checkout'>
							<Checkout
								cardData={cardData}
								currencyType={currencyType}
								totalPrice={totalPrice}
								checkSuccessState={this.checkSuccessState}
							/>
						</Route>
						{successState && (
							<Route path='/success'>
								<SuccessPage />
							</Route>
						)}
						<Route component={NotFoundPage} />
						<Redirect to='/404' />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
