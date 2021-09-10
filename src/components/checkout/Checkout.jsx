import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

import './checkout.css';

export default class Checkout extends Component {
	state = {
		formCardName: '',
		formCardNumber: '',
		formDate1: '',
		formDate2: '',
		formCVC: '',
	};

	handleSubmit = (e) => {
		e.preventDefault();
	};

	checkSuccessState = () => {
		this.props.checkSuccessState(true);
	};
	render() {
		const { cardData, currencyType, totalPrice } = this.props;
		const { formCardName, formCardNumber, formDate1, formDate2, formCVC } = this.state;

		return (
			<div className='checkout'>
				<h3 className='checkout-title'>CHECKOUT</h3>
				{cardData.map((item) => (
					<div key={item.id} className='checkout-products'>
						<div className='checkout-product'>
							<div className='checkout-product-left'>
								<h3>
									{item.name} <span> x{item.qty}</span>
								</h3>
								{parse(item.description)}
							</div>
							<div className='checkout-product-right'>
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
												: '₽' + price.amount.toFixed(2) * item.qty)
									)}
								</p>
							</div>
						</div>
					</div>
				))}
				<div className='checkout-price'>
					<h3>TOTAL</h3>
					<p>
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
					</p>
				</div>
				<div className='checkout-details'>
					<h3>CREDIT CARD DETAILS</h3>
					<form onSubmit={this.handleSubmit}>
						<div className='checkout-form-upper'>
							<div className='checkout-form-upper-1'>
								<label>CARD HOLDER</label>
								<input
									onChange={(e) =>
										this.setState({ formCardName: e.target.value })
									}
									name='formCardName'
									placeholder='Card Holder'
									type='text'
									value={formCardName}
									required
								/>
							</div>
							<div className='checkout-form-upper-2'>
								<label>EXPIRATION DATE</label>
								<div className='checkout-form-upper-2-inner'>
									<input
										onChange={(e) =>
											this.setState({ formDate1: e.target.value })
										}
										name='formDate1'
										placeholder='MM'
										id='checkout-date-1'
										type='number'
										value={formDate1}
										required
									/>
									<span> / </span>
									<input
										onChange={(e) =>
											this.setState({ formDate2: e.target.value })
										}
										name='formDate2'
										placeholder='YY'
										id='checkout-date-2'
										type='number'
										value={formDate2}
										required
									/>
								</div>
							</div>
						</div>
						<div className='checkout-form-below'>
							<div className='checkout-form-below-1'>
								<label>CARD NUMBER</label>
								<input
									onChange={(e) =>
										this.setState({ formCardNumber: e.target.value })
									}
									name='formCardNumber'
									placeholder='Card Number'
									type='number'
									value={formCardNumber}
									required
								/>
							</div>
							<div className='checkout-form-below-2'>
								<label>CVC</label>
								<input
									onChange={(e) => this.setState({ formCVC: e.target.value })}
									name='formCVC'
									placeholder='CVC'
									type='number'
									value={formCVC}
									required
								/>
							</div>
						</div>
						{formCardName && formCardNumber && formDate1 && formDate2 && formCVC ? (
							<Link
								onClick={this.checkSuccessState}
								className='form-link'
								to='/success'
							>
								<button type='submit' className='checkout-form-button'>
									PAY NOW
								</button>
							</Link>
						) : (
							<button type='submit' className='checkout-form-button-disabled'>
								PAY NOW
							</button>
						)}
					</form>
				</div>
			</div>
		);
	}
}
