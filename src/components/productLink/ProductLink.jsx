import React, { PureComponent } from 'react';
import CurrencyType from '../currencyType/CurrencyType';
import { Link } from 'react-router-dom';

export default class ProductLink extends PureComponent {
	render() {
		const { card, currencyType, d } = this.props;
		return (
			<Link className='links' to={!card && `/product/${d.id}`}>
				<div className='img'>
					<img
						className={
							!d.inStock ? 'main-imgs noStock copy-disable' : 'main-imgs copy-disable'
						}
						src={d.gallery[0]}
						alt={d.id}
					/>
					<div className='outOfStock copy-disable'>
						{!d.inStock && <h3>OUT OF STOCK</h3>}
					</div>
				</div>
				<div className='product-desc'>
					<h4>
						{d.brand} {d.name}
					</h4>
					<p>
						<CurrencyType item={d} currencyType={currencyType} quantity={1} />
					</p>
				</div>
			</Link>
		);
	}
}
