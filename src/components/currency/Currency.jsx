import React, { PureComponent } from 'react';
import './currency.css';
export default class Currency extends PureComponent {
	state = {
		currencyData: null,
		isLoading: true,
	};

	currencyConvert = (type) => {
		this.props.updateCurrencyType(type);
		this.props.handleClickCurrency(true);
	};

	async componentDidMount() {
		const my_query = `{
			currencies 
		}`;

		const url = 'http://localhost:4000/';
		const response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query: my_query }),
		});
		const currencyData = await response.json();
		this.setState({ currencyData: currencyData.data });
		this.setState({ isLoading: false });
	}

	renderCurrencyData = () => {
		const { currencyData } = this.state;
		return currencyData.currencies.map((currency) => (
			<li key={currency} onClick={() => this.currencyConvert(currency)}>
				{currency === 'USD'
					? '$ ' + currency
					: currency === 'GBP'
					? '£ ' + currency
					: currency === 'AUD'
					? 'A$ ' + currency
					: currency === 'JPY'
					? '¥ ' + currency
					: '₽ ' + currency}
			</li>
		));
	};

	render() {
		return (
			!this.state.isLoading && (
				<div className='currency'>
					<ul>{this.renderCurrencyData()}</ul>
				</div>
			)
		);
	}
}
