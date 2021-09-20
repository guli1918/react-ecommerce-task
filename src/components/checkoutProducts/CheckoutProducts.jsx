import React, { PureComponent } from 'react';
import CurrencyType from '../currencyType/CurrencyType';
import parse from 'html-react-parser';

export default class CheckoutProducts extends PureComponent {
	renderSelectedAttributes = (item) => {
		return Object.values(item.selectedAttributes).map((attribute, index) => (
			<div key={index}>
				<span>
					{Object.keys(item.selectedAttributes)[index] + ': '}
					<span className='checkout-product-left-attribute'>{attribute.id + ' '}</span>
				</span>
			</div>
		));
	};
	renderCardData = () => {
		const { cardData, currencyType } = this.props;
		return cardData.map((item, index) => (
			<div key={index} className='checkout-products'>
				<div className='checkout-product'>
					<div className='checkout-product-left'>
						<h3>
							{item.name}
							<span className='checkout-product-left-qty'> x{item.qty}</span>
							<span className='checkout-product-left-attributes'>
								{this.renderSelectedAttributes(item)}
							</span>
						</h3>
						{parse(item.description)}
					</div>
					<div className='checkout-product-right'>
						<p>
							<CurrencyType
								item={item}
								currencyType={currencyType}
								quantity={item.qty}
							/>
						</p>
					</div>
				</div>
			</div>
		));
	};
	render() {
		return this.renderCardData();
	}
}
