import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './checkout.css';

export default class Checkout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formOk: false,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange = (e) => {
		const name = e.target.name;
		this.setState({
			[name]: e.target.value,
		});
		const form = this.state;

		form.formCardName &&
			form.formCardNumber &&
			form.formDate1 &&
			form.formDate2 &&
			form.formCVC &&
			this.setState({ formOk: true });
	};

	handleSubmit(e) {
		e.preventDefault();
	}
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
					<form onSubmit={this.handleSubmit}>
						<div className='checkout-form-upper'>
							<div className='checkout-form-upper-1'>
								<label>CARD HOLDER</label>
								<input
									onChange={this.handleChange}
									name='formCardName'
									placeholder='Card Holder'
									type='text'
								/>
							</div>
							<div className='checkout-form-upper-2'>
								<label>EXPIRATION DATE</label>
								<div className='checkout-form-upper-2-inner'>
									<input
										onChange={this.handleChange}
										name='formDate1'
										placeholder='MM'
										id='checkout-date-1'
										type='number'
									/>
									<span> / </span>
									<input
										onChange={this.handleChange}
										name='formDate2'
										placeholder='YY'
										id='checkout-date-2'
										type='number'
									/>
								</div>
							</div>
						</div>
						{console.log(this.state.formOk)}
						<div className='checkout-form-below'>
							<div className='checkout-form-below-1'>
								<label>CARD NUMBER</label>
								<input
									onChange={this.handleChange}
									name='formCardNumber'
									placeholder='Card Number'
									type='number'
								/>
							</div>
							<div className='checkout-form-below-2'>
								<label>CVC</label>
								<input
									onChange={this.handleChange}
									name='formCVC'
									placeholder='CVC'
									type='number'
								/>
							</div>
						</div>
						<Link className='form-link' to={this.state.formOk && '/success'}>
							<button
								onClick={() =>
									this.state.formOk && this.setState({ formOk: false })
								}
								type='submit'
								className={
									this.state.formOk
										? 'checkout-form-button'
										: 'checkout-form-button-disabled'
								}
							>
								PAY NOW
							</button>
						</Link>
					</form>
				</div>
			</div>
		);
	}
}
