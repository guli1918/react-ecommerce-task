import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './paymentForm.css';

export default class PaymentForm extends Component {
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
		this.props.emptyCardData();
	};

	checkCartCount = () => {
		this.props.cardData.length === 0 && alert("Cart can't be empty!");
	};
	render() {
		const { formCardName, formCardNumber, formDate1, formDate2, formCVC } = this.state;
		const { cardData } = this.props;
		return (
			<div className='checkout-details'>
				<h3>CREDIT CARD DETAILS</h3>
				<form onSubmit={this.handleSubmit}>
					<div className='checkout-form-upper'>
						<div className='checkout-form-upper-1'>
							<label>CARD HOLDER</label>
							<input
								onChange={(e) => this.setState({ formCardName: e.target.value })}
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
									onChange={(e) => this.setState({ formDate1: e.target.value })}
									name='formDate1'
									placeholder='MM'
									id='checkout-date-1'
									type='number'
									value={formDate1}
									required
								/>
								<span> / </span>
								<input
									onChange={(e) => this.setState({ formDate2: e.target.value })}
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
								onChange={(e) => this.setState({ formCardNumber: e.target.value })}
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
					{formCardName &&
					formCardNumber &&
					formDate1 &&
					formDate2 &&
					formCVC &&
					cardData.length > 0 ? (
						<Link onClick={this.checkSuccessState} className='form-link' to='/success'>
							<button type='submit' className='checkout-form-button copy-disable'>
								PAY NOW
							</button>
						</Link>
					) : (
						<button
							onClick={this.checkCartCount}
							type='submit'
							className='checkout-form-button-disabled copy-disable'
						>
							PAY NOW
						</button>
					)}
				</form>
			</div>
		);
	}
}
