import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './successPage.css';

export default class SuccessPage extends Component {
	render() {
		return (
			<div className='success'>
				<div className='success-content'>
					<img src='assets/success.png' alt='' />
					<h3 className='success-main'>Thank you, enjoy!</h3>
					<p className='success-text'>Your order is being proccessed.</p>
					<Link className='success-link' to='/'>
						<p className='success-button'>BACK HOME</p>
					</Link>
				</div>
			</div>
		);
	}
}
