import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CurrencyType from '../currencyType/CurrencyType';
import './card.css';

export default class Card extends Component {
	displayNextImg = (item) => {
		this.props.displayNextImg(item);
	};

	displayPreviousImg = (item) => {
		this.props.displayPreviousImg(item);
	};
	render() {
		const { cardData, currencyType, card, increaseItemQuantity, decreaseItemQuantity } =
			this.props;

		return (
			<div className={card ? 'card-noFocus' : 'card'}>
				<h2 className='card-main-title'>CART</h2>
				{cardData.length > 0 ? (
					<div className='card-products'>
						{cardData.map((item, index) => (
							<div key={index} className='card-product'>
								<div className='card-product-left'>
									<Link
										className='card-product-left-link'
										to={`/product/${item.id}`}
									>
										<div className='card-product-left-title card-product-left-link'>
											<h3>{item.brand}</h3>
											<h3>{item.name}</h3>
										</div>
									</Link>
									<div className='card-product-left-price'>
										<p>
											<CurrencyType
												item={item}
												currencyType={currencyType}
												quantity={item.qty}
											/>
										</p>
									</div>
									<div className='card-product-left-attributes copy-disable'>
										{Object.values(item.selectedAttributes).map(
											(attributes, index) => (
												<div
													key={index}
													className='card-product-left-attribute'
													style={{
														backgroundColor:
															attributes.value.startsWith('#') &&
															attributes.id !== 'Black'
																? 'light' + attributes.id
																: attributes.id,
													}}
												>
													<p>
														{attributes.value.startsWith('#')
															? ''
															: attributes.value}
													</p>
												</div>
											)
										)}
									</div>
								</div>
								<div className='card-product-middle copy-disable'>
									<p onClick={() => increaseItemQuantity(index)}>+</p>
									<h3>{item.qty}</h3>
									<p onClick={() => decreaseItemQuantity(index)}>–</p>
								</div>
								<div className='card-product-right'>
									<>
										{item.gallery.length > 1 && (
											<div className='card-product-inner copy-disable'>
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
											className='card-right-main copy-disable'
											src={item.gallery[item.displayImg]}
											alt=''
										/>
									</>
								</div>
							</div>
						))}
					</div>
				) : (
					<p>Cart is empty!</p>
				)}
				<div className='card-bottom copy-disable'>
					<Link className='card-bottom-link ' to='/'>
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
