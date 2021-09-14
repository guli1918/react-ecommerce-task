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
import CategoryPage from './components/categoryPage/CategoryPage';
import arraysEqual from '../src/utils/array';

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
		selectedAttributes: {},
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

	/*
		Function to check if there is already the same product(alongside its attributes) in the card.
	*/
	areProductsSame = (productInCard, newProduct) => {
		const { selectedAttributes } = this.state;

		const selectedAttributeIds = Object.values(selectedAttributes).map((values) => values.id);
		const productSelectedAttributeIds = Object.values(productInCard.selectedAttributes).map(
			(values) => values.id
		);

		return (
			productInCard.id === newProduct.id &&
			arraysEqual(selectedAttributeIds, productSelectedAttributeIds)
		);
	};

	updateAttributeValue = (product) => {
		const { cardData, selectedAttributes } = this.state;
		const existingProductIndex = cardData.findIndex((d) => this.areProductsSame(d, product));

		if (
			existingProductIndex !== -1 &&
			product.attributes.length === Object.values(selectedAttributes).length
		) {
			cardData[existingProductIndex].selectedAttributes = selectedAttributes;
		} else {
			alert('Please choose item attributes first!');
		}
	};

	setAttributeValue = (type, value) => {
		this.setState({
			selectedAttributes: { ...this.state.selectedAttributes, [type]: value },
		});
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
		const { cardData, selectedAttributes } = this.state;

		const existingProductIndex = cardData.findIndex((product) =>
			this.areProductsSame(product, data)
		);

		if (existingProductIndex !== -1) {
			cardData[existingProductIndex].qty = cardData[existingProductIndex].qty + 1;
		} else {
			data.attributes.length === Object.values(selectedAttributes).length &&
				cardData.push({
					...data,
					qty: 1,
					displayImg: 0,
					selectedAttributes,
				});
		}

		this.setState({ cardData });
	};

	increaseItemQuantity = (productIndex) => {
		const { cardData } = this.state;

		cardData[productIndex].qty += 1;
		this.setState({ cardData });
	};

	decreaseItemQuantity = (productIndex) => {
		const { cardData } = this.state;
		const product = cardData[productIndex];

		if (product.qty > 1) {
			product.qty = product.qty - 1;
			cardData[productIndex] = product;
		} else {
			const result = window.confirm(
				`Are you sure you want to remove "${
					product.brand + ' ' + product.name
				}" from basket?`
			);
			if (result === true) {
				cardData.splice(productIndex, 1);
			}
		}
		this.setState({ cardData });
	};

	emptyCardData = () => {
		this.setState({ cardData: [] });
	};

	emptyAttributes = () => {
		this.setState({ selectedAttributes: {} });
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
		const {
			products,
			currencyType,
			cardData,
			successState,
			currency,
			card,
			selectedAttributes,
		} = this.state;

		const totalPrice = this.getTotalPrice();
		return (
			<Router>
				<Topbar
					currencyType={currencyType}
					updateCurrencyType={this.updateCurrencyType}
					cardData={cardData}
					updateCardData={this.updateCardData}
					totalPrice={totalPrice}
					card={card}
					currency={currency}
					handleClickCurrency={this.handleClickCurrency}
					handleClickCard={this.handleClickCard}
					attributeValue={selectedAttributes}
					increaseItemQuantity={this.increaseItemQuantity}
					decreaseItemQuantity={this.decreaseItemQuantity}
				/>
				<div onClick={this.handleClickOverlays} className='App'>
					<Switch>
						<Route exact path='/'>
							<Main
								updateCardData={this.updateCardData}
								currencyType={currencyType}
								category='all products'
								products={products}
								setProducts={(products) => this.setState({ products })}
								card={card}
							/>
						</Route>
						<Route path='/clothes'>
							<CategoryPage
								categoryName='clothes'
								updateCardData={this.updateCardData}
								currencyType={currencyType}
								products={products}
								setProducts={(products) => this.setState({ products })}
								card={card}
							/>
						</Route>
						<Route path='/tech'>
							<CategoryPage
								categoryName='tech'
								updateCardData={this.updateCardData}
								currencyType={currencyType}
								products={products}
								setProducts={(products) => this.setState({ products })}
								card={card}
							/>
						</Route>
						<Route
							path='/product/:id'
							render={(props) => (
								<SingleProduct
									updateCardData={this.updateCardData}
									currencyType={currencyType}
									updateAttributeValue={this.updateAttributeValue}
									setAttributeValue={this.setAttributeValue}
									selectedAttributes={selectedAttributes}
									emptyAttributes={this.emptyAttributes}
									card={card}
									{...props}
								/>
							)}
						/>
						<Route path='/cart'>
							<Card
								updateCardData={this.updateCardData}
								decreaseCardData={this.decreaseCardData}
								cardData={cardData}
								currencyType={currencyType}
								displayNextImg={this.displayNextImg}
								displayPreviousImg={this.displayPreviousImg}
								increaseItemQuantity={this.increaseItemQuantity}
								decreaseItemQuantity={this.decreaseItemQuantity}
								card={card}
							/>
						</Route>
						<Route path='/checkout'>
							<Checkout
								cardData={cardData}
								currencyType={currencyType}
								totalPrice={totalPrice}
								checkSuccessState={this.checkSuccessState}
								emptyCardData={this.emptyCardData}
								card={card}
							/>
						</Route>
						{successState && (
							<Route path='/success'>
								<SuccessPage card={card} />
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
