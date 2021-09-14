// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';

export const CurrencySymbolMap = {
	USD: '$',
	GBP: '£',
	AUD: 'A$',
	JPY: '¥',
	RUB: '₽',
};

export default class CurrencyType extends Component {
	getItemPrice = (amount, quantity) => (amount * quantity).toFixed(2);

	render() {
		const { item, currencyType, quantity } = this.props;

		const priceForCurrency = item.prices.find((price) => price.currency === currencyType);

		return priceForCurrency
			? `${CurrencySymbolMap[currencyType]}${this.getItemPrice(
					priceForCurrency.amount,
					quantity
			  )}`
			: 'No price';
	}
}
