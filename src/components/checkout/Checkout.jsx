import React, { Component } from 'react';
import parse from 'html-react-parser';

import './checkout.css';
import PaymentForm from '../paymentForm/PaymentForm';
import CurrencyType, { CurrencySymbolMap } from '../currencyType/CurrencyType';

export default class Checkout extends Component {
	render() {
		const { cardData, currencyType, totalPrice, card, checkSuccessState, emptyCardData } =
			this.props;

		return (
			<div className={card ? 'checkout-noFocus' : 'checkout'}>
				<h3 className='checkout-title'>CHECKOUT</h3>
				{cardData.map((item, index) => (
					<div key={index} className='checkout-products'>
						<div className='checkout-product'>
							<div className='checkout-product-left'>
								<h3>
									{item.name}
									<span className='checkout-product-left-qty'> x{item.qty}</span>
									<span className='checkout-product-left-attributes'>
										{Object.values(item.selectedAttributes).map(
											(attribute, index) => (
												<div key={index}>
													<span>
														{Object.keys(item.selectedAttributes)[
															index
														] + ': '}
														<span className='checkout-product-left-attribute'>
															{attribute.id + ' '}
														</span>
													</span>
												</div>
											)
										)}
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
				))}
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
				/>
			</div>
		);
	}
}
