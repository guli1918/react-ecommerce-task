import React, { Component } from 'react';
import './checkout.css';

export default class Checkout extends Component {
	render() {
		return (
			<div className='checkout'>
				<h3 className='checkout-title'>CHECKOUT</h3>
				<div className='checkout-products'>
					<div className='checkout-product'>
						<div className='checkout-product-left'>
							<h3>Product 1</h3>
							<p>Lorem ipsum dolor sit amet.</p>
						</div>
						<div className='checkout-product-right'>
							<p>$50.00</p>
						</div>
					</div>
					<span></span>
				</div>
				<div className='checkout-price'>
					<h3>TOTAL</h3>
					<p>$100.00</p>
				</div>
				<div className='checkout-details'>
					<h3>CREDIT CART DETAILS</h3>
					<form>
						<div className='checkout-form-upper'>
							<div className='checkout-form-upper-1'>
								<label>CARD HOLDER</label>
								<input placeholder='Card Holder' type='text' />
							</div>
							<div className='checkout-form-upper-2'>
								<label>EXPIRATION DATE</label>
								<div className='checkout-form-upper-2-inner'>
									<input placeholder='MM' id='checkout-date-1' type='number' />
									<span> / </span>
									<input placeholder='YY' id='checkout-date-2' type='number' />
								</div>
							</div>
						</div>
						<div className='checkout-form-below'>
							<div className='checkout-form-below-1'>
								<label>CARD NUMBER</label>
								<input placeholder='Card Number' type='number' />
							</div>
							<div className='checkout-form-below-2'>
								<label>CVC</label>
								<input placeholder='CVC' type='number' />
							</div>
						</div>
						<button className='checkout-form-button'>PAY NOW</button>
					</form>
				</div>
			</div>
		);
	}
}
