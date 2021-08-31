import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './miniCart.css';

export default class MiniCart extends Component {
	render() {
		return (
			<div className='miniCart-main'>
				<div className='miniCart-title'>
					<div className='miniCart-top'>
						<h3>
							My Bag, <span>2 items</span>
						</h3>
					</div>
					<div className='miniCart-product'>
						<div className='miniCart-left'>
							<h3>Apollo</h3>
							<h3>Running Short</h3>
							<div className='miniCart-left-price'>$50.00</div>
							<div className='miniCart-left-attribute'>
								<p>S</p>
							</div>
						</div>
						<div className='miniCart-middle'>
							<p>+</p>
							<h3>1</h3>
							<p>-</p>
						</div>
						<div className='miniCart-right'>
							<img
								src='https://www.openair.co.uk/images/rab-downpour-eco-jacket-mens-p7155-67620_thumb.jpg'
								alt=''
							/>
						</div>
					</div>
					<div className='miniCart-bottom'>
						<div className='miniCart-bottom-amount'>
							<p>Total</p>
							<span>$100.00</span>
						</div>
						<div className='miniCart-bottom-payment'>
							<Link to='cart' className='miniCart-link'>
								<p className='miniCart-bottom-payment-left'>VIEW BAG</p>
							</Link>
							<Link to='/checkout' className='miniCart-link'>
								<p className='miniCart-bottom-payment-right'>CHECK OUT</p>
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
