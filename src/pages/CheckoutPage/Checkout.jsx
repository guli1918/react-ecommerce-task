import React, { PureComponent } from 'react';
import PaymentForm from '../../components/paymentForm/PaymentForm';
import { CurrencySymbolMap } from '../../components/currencyType/CurrencyType';
import CheckoutProducts from '../../components/checkoutProducts/CheckoutProducts';

import './checkout.css';

export default class Checkout extends PureComponent {
	render() {
		const { cardData, currencyType, totalPrice, card, checkSuccessState, emptyCardData } =
			this.props;

		return (
			<div className={card ? 'checkout-noFocus' : 'checkout'}>
				<h3 className='checkout-title'>CHECKOUT</h3>
				<CheckoutProducts cardData={cardData} currencyType={currencyType} />
				<div className='checkout-price'>
					<h3>TOTAL</h3>
					<p>
						{CurrencySymbolMap[currencyType]}
						{totalPrice.toFixed(2)}
					</p>
				</div>
				<PaymentForm
					cardData={cardData}
					checkSuccessState={checkSuccessState}
					emptyCardData={emptyCardData}
					card={card}
				/>
			</div>
		);
	}
}
