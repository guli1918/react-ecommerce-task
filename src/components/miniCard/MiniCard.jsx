import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CurrencyType, { CurrencySymbolMap } from '../currencyType/CurrencyType';

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
			totalPrice,
			cardClick,
			increaseItemQuantity,
			decreaseItemQuantity,
		} = this.props;

		const itemQuantity = this.props.cardData.reduce((a, item) => a + item.qty, 0);

		return (
			!isLoading && (
				<div className='miniCard-main'>
					<div className='miniCard-title'>
						<div className='miniCard-top'>
							<h3>
								{cardData.length === 0 ? (
									<span>Cart is empty!</span>
								) : (
									<>
										My Bag,{' '}
										<span>
											{itemQuantity === 1
												? itemQuantity + ' item'
												: itemQuantity + ' items'}
										</span>
									</>
								)}
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
												<CurrencyType
													item={item}
													currencyType={currencyType}
													quantity={item.qty}
												/>
											</div>
											{
												<div className='minicard-left-attributes'>
													{Object.values(item.selectedAttributes).length >
													0 ? (
														Object.values(item.selectedAttributes).map(
															(attributes, index) => (
																<div
																	key={index}
																	className='miniCard-left-attribute'
																	style={{
																		backgroundColor:
																			attributes.value.startsWith(
																				'#'
																			) &&
																			attributes.id !==
																				'Black'
																				? 'light' +
																				  attributes.id
																				: attributes.id,
																	}}
																>
																	<p className='miniCard-left-attribute-text'>
																		{attributes.value.startsWith(
																			'#'
																		)
																			? ''
																			: attributes.value}
																	</p>
																</div>
															)
														)
													) : (
														<div className='miniCard-left-attribute'>
															<p>DFLT</p>
														</div>
													)}
												</div>
											}
										</div>
										<div className='miniCard-middle'>
											<p onClick={() => increaseItemQuantity(index)}>+</p>
											<h3>{item.qty}</h3>
											<p onClick={() => decreaseItemQuantity(index)}>-</p>
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
									{CurrencySymbolMap[currencyType]}
									{totalPrice.toFixed(2)}
								</span>
							</div>

							<div className='miniCard-bottom-payment'>
								<Link
									onClick={() => cardClick()}
									to='/cart'
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
