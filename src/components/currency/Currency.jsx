import React, { Component } from 'react';
import './currency.css';
export default class Currency extends Component {
	constructor(props) {
		super(props);
		this.currencyUsd = this.currencyUsd.bind(this);
		this.currencyGbp = this.currencyGbp.bind(this);
		this.currencyJpy = this.currencyJpy.bind(this);
	}
	currencyUsd = () => {
		this.props.currencyType('USD');
		this.props.dataToCurrency();
	};
	currencyGbp = () => {
		this.props.currencyType('GBP');
		this.props.dataToCurrency();
	};
	currencyJpy = () => {
		this.props.currencyType('JPY');
		this.props.dataToCurrency();
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
