import React, { Component } from 'react';
import './currency.css';
export default class Currency extends Component {
	currencyUsd = () => {
		this.props.updateCurrencyType('USD');
		this.props.handleClickCurrency(false);
	};
	currencyGbp = () => {
		this.props.updateCurrencyType('GBP');
		this.props.handleClickCurrency(false);
	};
	currencyJpy = () => {
		this.props.updateCurrencyType('JPY');
		this.props.handleClickCurrency(false);
	};

	currencyAud = () => {
		this.props.updateCurrencyType('AUD');
		this.props.handleClickCurrency(false);
	};

	currencyRub = () => {
		this.props.updateCurrencyType('RUB');
		this.props.handleClickCurrency(false);
	};

	render() {
		return (
			<div className='currency'>
				<ul>
					<li onClick={this.currencyUsd}>$ USD</li>
					<li onClick={this.currencyGbp}>£ GBP</li>
					<li onClick={this.currencyAud}>$ AUD</li>
					<li onClick={this.currencyJpy}>¥ JPY</li>
					<li onClick={this.currencyRub}>₽ RUB</li>
				</ul>
			</div>
		);
	}
}
