import React, { Component } from 'react';

export default class CurrencyType extends Component {
	render() {
		const { item, currencyType } = this.props;
		return (
			<div>
				{item.prices.map(
					(price) =>
						price.currency === currencyType &&
						(price.currency === 'USD'
							? '$' + price.amount.toFixed(2) * item.qty
							: price.currency === 'GBP'
							? '£' + price.amount.toFixed(2) * item.qty
							: price.currency === 'AUD'
							? 'A$' + price.amount.toFixed(2) * item.qty
							: price.currency === 'JPY'
							? '¥' + price.amount.toFixed(2) * item.qty
							: '₽' + price.amount.toFixed(2))
				)}
			</div>
		);
	}
}
