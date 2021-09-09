import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './card.css';

export default class Card extends Component {
	displayNextImg = (item) => {
		this.props.displayNextImg(item);
	};

	displayPreviousImg = (item) => {
		this.props.displayPreviousImg(item);
	};
	render() {
		const { cardData, currencyType, attributeValue, updateCardData, decreaseCardData } =
			this.props;

		return (
			<div className='card'>
				<h2 className='card-main-title'>CART</h2>
				<div className='card-products'>
					{cardData.map((item, index) => (
						<div key={index} className='card-product'>
							<div className='card-product-left'>
								<Link className='card-product-left-link' to={`/product/${item.id}`}>
									<div className='card-product-left-title card-product-left-link'>
										<h3>{item.brand}</h3>
										<h3>{item.name}</h3>
									</div>
								</Link>
								<div className='card-product-left-price'>
									<p>
										{item.prices.map(
											(price) =>
												price.currency === currencyType &&
												(price.currency === 'USD'
													? '$' + price.amount.toFixed(2) * item.qty
													: price.currency === 'GBP'
													? '£' + price.amount.toFixed(2) * item.qty
													: price.currency === 'AUD'
													? 'A$' + price.amount.toFixed(2) * item.qty
													: price.currency === 'JPY'
													? '¥' + price.amount.toFixed(2) * item.qty
													: '₽' + price.amount.toFixed(2))
										)}
									</p>
								</div>
								<div className='card-product-left-attributes'>
									<div className='card-product-left-attribute'>
										{attributeValue
											? item.attributes.length > 0
												? item.attributes.map((attribute) =>
														attribute.items[attributeValue]
															? attribute.items[attributeValue]
																	.displayValue
															: attribute.items[0].displayValue
												  )
												: 'none'
											: 'DFLT'}
									</div>
								</div>
							</div>
							<div className='card-product-middle'>
								<p onClick={() => updateCardData(item)}>+</p>
								<h3>{item.qty}</h3>
								<p onClick={() => decreaseCardData(item)}>–</p>
							</div>
							<div className='card-product-right'>
								<>
									{item.gallery.length > 1 && (
										<div className='card-product-inner'>
											<img
												onClick={() => this.displayPreviousImg(item)}
												className='card-right-arrows arrow-left'
												src='/assets/previous.png'
												alt=''
											/>
											<img
												onClick={() => this.displayNextImg(item)}
												className='card-right-arrows arrow-right'
												src='/assets/next.png'
												alt=''
											/>
										</div>
									)}
									<img
										className='card-right-main'
										src={item.gallery[item.displayImg]}
										alt=''
									/>
								</>
							</div>
						</div>
					))}
				</div>
				<div className='card-bottom'>
					<Link className='card-bottom-link' to='/'>
						<p className='card-bottom-link-1'>GO BACK</p>
					</Link>
					<Link className='card-bottom-link' to='/checkout'>
						<p className='card-bottom-link-2'>CHECKOUT</p>
					</Link>
				</div>
			</div>
		);
	}
}
