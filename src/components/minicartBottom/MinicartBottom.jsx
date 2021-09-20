import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { CurrencySymbolMap } from '../currencyType/CurrencyType';

export default class MinicartBottom extends PureComponent {
	closeCartOverlay = () => {
		this.props.handleClickCard(false);
	};

	render() {
		const { totalPrice, currencyType } = this.props;
		return (
			<div className='miniCard-bottom'>
				<div className='miniCard-bottom-amount'>
					<p>Total</p>
					<span>
						{CurrencySymbolMap[currencyType]}
						{totalPrice.toFixed(2)}
					</span>
				</div>

				<div className='miniCard-bottom-payment'>
					<Link onClick={this.closeCartOverlay} to='/cart' className='miniCard-link'>
						<p className='miniCard-bottom-payment-left'>VIEW BAG</p>
					</Link>
					<Link onClick={this.closeCartOverlay} to='/checkout' className='miniCard-link'>
						<p className='miniCard-bottom-payment-right'>CHECK OUT</p>
					</Link>
				</div>
			</div>
		);
	}
}
