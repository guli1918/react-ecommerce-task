import React, { Component } from 'react';
import './currency.css';
export default class Currency extends Component {
	currencyUsd = () => {
		this.props.updateCurrencyType('USD');
		this.props.closeCurrencyBar(false);
	};
	currencyGbp = () => {
		this.props.updateCurrencyType('GBP');
		this.props.closeCurrencyBar(false);
	};
	currencyJpy = () => {
		this.props.updateCurrencyType('JPY');
		this.props.closeCurrencyBar(false);
	};

	render() {
		return (
			<div className='currency'>
				<ul>
					<li onClick={this.currencyUsd}>$ USD</li>
					<li onClick={this.currencyGbp}>£ GBP</li>
					<li onClick={this.currencyJpy}>¥ JPY</li>
				</ul>
			</div>
		);
	}
}
