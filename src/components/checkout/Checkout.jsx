import React, { Component } from 'react';
import parse from 'html-react-parser';

import './checkout.css';
import PaymentForm from '../paymentForm/PaymentForm';
import CurrencyType from '../currencyType/CurrencyType';

export default class Checkout extends Component {
	render() {
		const { cardData, currencyType, totalPrice, card, checkSuccessState, emptyCardData } =
			this.props;

		return (
			<div className={card ? 'checkout-noFocus' : 'checkout'}>
				<h3 className='checkout-title'>CHECKOUT</h3>
				{cardData.map((item) => (
					<div key={item.id} className='checkout-products'>
						<div className='checkout-product'>
							<div className='checkout-product-left'>
								<h3>
									{item.name} <span> x{item.qty}</span>
								</h3>
								{parse(item.description)}
							</div>
							<div className='checkout-product-right'>
								<p>
									<CurrencyType item={item} currencyType={currencyType} />
								</p>
							</div>
						</div>
					</div>
				))}
				<div className='checkout-price'>
					<h3>TOTAL</h3>
					<p>
						{currencyType === 'USD'
							? '$'
							: currencyType === 'GBP'
							? '£'
							: currencyType === 'AUD'
							? 'A$'
							: currencyType === 'JPY'
							? '¥'
							: '₽'}
						{totalPrice.toFixed(2)}
					</p>
				</div>
				<PaymentForm
					cardData={cardData}
					checkSuccessState={checkSuccessState}
					emptyCardData={emptyCardData}
				/>
			</div>
		);
	}
}
