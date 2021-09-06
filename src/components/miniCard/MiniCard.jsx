import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './miniCard.css';

export default class MiniCard extends Component {
	state = {
		isLoading: false,
		// totalPrice: 0,
	};

	// getTotalPrice = () => {
	// 	const { cardData } = this.props;

	// 	return cardData.reduce((a, c) => {
	// 		const price = c.prices.find((p) => p.currency === this.props.currencyType);

	// 		return a + price.amount * c.qty;
	// 	}, 0);
	// };

	render() {
		// const totalPrice = this.getTotalPrice();

		return (
			!this.state.isLoading && (
				<div className='miniCard-main'>
					<div className='miniCard-title'>
						<div className='miniCard-top'>
							<h3>
								My Bag,
								<span> {this.props.cardData.length}</span>
							</h3>
						</div>
						{this.props.cardData.map(
							(item, index) =>
								item && (
									<div key={index} className='miniCard-product'>
										<div className='miniCard-left'>
											<h3>{item.brand}</h3>
											<h3>{item.name}</h3>
											<div className='miniCard-left-price'>
												{item.prices.map(
													(price) =>
														price.currency ===
															this.props.currencyType &&
														(price.currency === 'USD'
															? '$' + price.amount
															: price.currency === 'GBP'
															? '£' + price.amount
															: '¥' + price.amount)
												)}
											</div>
											{
												<div className='miniCard-left-attribute'>
													<p>
														{this.props.attributeValue
															? item.attributes.map(
																	(attribute) =>
																		attribute.items[
																			this.props
																				.attributeValue
																		].value
															  )
															: item.attributes[0].items[0]
																	.displayValue}
														{/* item.attributes[0].items[0]
																	.displayValue */}
													</p>
												</div>
											}
										</div>
										<div className='miniCard-middle'>
											<p onClick={() => this.props.updateCardData(item)}>+</p>
											<h3>{item.qty}</h3>
											<p onClick={() => this.props.decreaseCardData(item)}>
												-
											</p>
										</div>
										<div className='miniCard-right'>
											<img src={item.gallery[0]} alt='' />
										</div>
									</div>
								)
						)}
						<div className='miniCard-bottom'>
							<div className='miniCard-bottom-amount'>
								<p>Total</p>
								<span>
									{this.props.currencyType === 'USD'
										? '$'
										: this.props.currencyType === 'GBP'
										? '£'
										: '¥'}
									{this.props.totalPrice.toFixed(2)}
								</span>
							</div>

							<div className='miniCard-bottom-payment'>
								<Link
									onClick={() => this.props.cardClick(false)}
									to='/card'
									className='miniCard-link'
								>
									<p className='miniCard-bottom-payment-left'>VIEW BAG</p>
								</Link>
								<Link
									onClick={() => this.props.cardClick(false)}
									to='/checkout'
									className='miniCard-link'
								>
									<p className='miniCard-bottom-payment-right'>CHECK OUT</p>
								</Link>
							</div>
						</div>
					</div>
				</div>
			)
		);
	}
}
