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
		return (
			<div className='card'>
				<h2 className='card-main-title'>CARD</h2>
				<div className='card-products'>
					{this.props.cardData.map((item, index) => (
						<div key={index} className='card-product'>
							<div className='card-product-left'>
								<div className='card-product-left-title'>
									<h3>{item.brand}</h3>
									<h3>{item.name}</h3>
								</div>
								<div className='card-product-left-price'>
									<p>
										{item.prices.map(
											(price) =>
												price.currency === this.props.currencyType &&
												(price.currency === 'USD'
													? '$' + price.amount.toFixed(2) * item.qty
													: price.currency === 'GBP'
													? '£' + price.amount.toFixed(2) * item.qty
													: '¥' + price.amount.toFixed() * item.qty)
										)}
									</p>
								</div>
								<div className='card-product-left-attributes'>
									<div className='card-product-left-attribute'>
										{this.props.attributeValue &&
											item.attributes &&
											item.attributes[0].items[this.props.attributeValue]
												.displayValue}
									</div>
								</div>
							</div>
							<div className='card-product-middle'>
								<p onClick={() => this.props.updateCardData(item)}>+</p>
								<h3>{item.qty}</h3>
								<p onClick={() => this.props.decreaseCardData(item)}>–</p>
							</div>
							<div className='card-product-right'>
								<>
									{item.gallery.length > 1 && (
										<div className='car-product-inner'>
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
									<Link to={`/product/${item.id}`}>
										<img
											className='card-right-main'
											src={item.gallery[item.displayImg]}
											alt=''
										/>
									</Link>
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
