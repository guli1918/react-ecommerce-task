import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './miniCard.css';

export default class MiniCard extends Component {
	state = {
		isLoading: false,
	};

	render() {
		const { isLoading } = this.state;
		const {
			cardData,
			currencyType,
			attributeValue,
			updateCardData,
			decreaseCardData,
			totalPrice,
			cardClick,
		} = this.props;

		return (
			!isLoading && (
				<div className='miniCard-main'>
					<div className='miniCard-title'>
						<div className='miniCard-top'>
							<h3>
								My Bag,
								<span> {cardData.length}</span>
							</h3>
						</div>
						{cardData.map(
							(item, index) =>
								item && (
									<div key={index} className='miniCard-product'>
										<div className='miniCard-left'>
											<h3>{item.brand}</h3>
											<h3>{item.name}</h3>
											<div className='miniCard-left-price'>
												{item.prices.map(
													(price) =>
														price.currency === currencyType &&
														(price.currency === 'USD'
															? '$' +
															  price.amount.toFixed(2) * item.qty
															: price.currency === 'GBP'
															? '£' +
															  price.amount.toFixed(2) * item.qty
															: price.currency === 'AUD'
															? 'A$' +
															  price.amount.toFixed(2) * item.qty
															: price.currency === 'JPY'
															? '¥' +
															  price.amount.toFixed(2) * item.qty
															: '₽' +
															  price.amount.toFixed(2) * item.qty)
												)}
											</div>
											{
												<div className='miniCard-left-attribute'>
													<p>
														{attributeValue
															? item.attributes.length > 0
																? item.attributes.map((attribute) =>
																		attribute.items[
																			this.attributeValue
																		]
																			? attribute.items[
																					this
																						.attributeValue
																			  ].displayValue
																			: attribute.items[0]
																					.displayValue
																  )
																: 'none'
															: 'DFLT'}
													</p>
												</div>
											}
										</div>
										<div className='miniCard-middle'>
											<p onClick={() => updateCardData(item)}>+</p>
											<h3>{item.qty}</h3>
											<p onClick={() => decreaseCardData(item)}>-</p>
										</div>
										<div className='miniCard-right'>
											<>
												<Link to={`/product/${item.id}`}>
													<img
														className='miniCard-right-main'
														src={item.gallery[item.displayImg]}
														alt=''
													/>
												</Link>
											</>
										</div>
									</div>
								)
						)}
						<div className='miniCard-bottom'>
							<div className='miniCard-bottom-amount'>
								<p>Total</p>
								<span>
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
								</span>
							</div>

							<div className='miniCard-bottom-payment'>
								<Link
									onClick={() => cardClick()}
									to='/card'
									className='miniCard-link'
								>
									<p className='miniCard-bottom-payment-left'>VIEW BAG</p>
								</Link>
								<Link
									onClick={() => cardClick()}
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
