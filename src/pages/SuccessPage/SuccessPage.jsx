import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import './successPage.css';

export default class SuccessPage extends PureComponent {
	render() {
		const { card } = this.props;
		return (
			<div className={card ? 'success-noFocus' : 'success'}>
				<div className='success-content'>
					<img className='copy-disable' src='assets/success.png' alt='' />
					<h3 className='success-main'>Thank you, enjoy!</h3>
					<p className='success-text'>Your order is being proccessed.</p>
					<Link className='success-link' to='/'>
						<p className='success-button copy-disable'>BACK HOME</p>
					</Link>
				</div>
			</div>
		);
	}
}
