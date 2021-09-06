import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './card.css';

export default class Card extends Component {
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
									<p>${item.prices[0].amount}</p>
								</div>
								<div className='card-product-left-attributes'>
									<div className='card-product-left-attribute'>
										{this.props.attributeValue &&
											item.attributes[0].items[this.props.attributeValue]
												.displayValue}
									</div>
								</div>
							</div>
							<div className='card-product-middle'>
								<p>+</p>
								<h3>{item.qty}</h3>
								<p>–</p>
							</div>
							<div className='card-product-right'>
								<img src={item.gallery[0]} alt='' />
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
