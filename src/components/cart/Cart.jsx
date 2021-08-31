import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './cart.css';

export default class Cart extends Component {
	render() {
		return (
			<div className='cart'>
				<h2 className='cart-main-title'>CART</h2>
				<div className='cart-products'>
					<div className='cart-product'>
						<div className='cart-product-left'>
							<div className='cart-product-left-title'>
								<h3>Apollo</h3>
								<h3>Running Short</h3>
							</div>
							<div className='cart-product-left-price'>
								<p>$50.00</p>
							</div>
							<div className='cart-product-left-attributes'>
								<div className='cart-product-left-attribute'>S</div>
							</div>
						</div>
						<div className='cart-product-middle'>
							<p>+</p>
							<h3>1</h3>
							<p>–</p>
						</div>
						<div className='cart-product-right'>
							<img
								src='https://www.openair.co.uk/images/rab-downpour-eco-jacket-mens-p7155-67620_thumb.jpg'
								alt=''
							/>
						</div>
					</div>
				</div>
				<div className='cart-bottom'>
					<Link className='cart-bottom-link' to='/'>
						<p className='cart-bottom-link-1'>GO BACK</p>
					</Link>
					<Link className='cart-bottom-link' to='/checkout'>
						<p className='cart-bottom-link-2'>CHECKOUT</p>
					</Link>
				</div>
			</div>
		);
	}
}
