import React, { PureComponent } from 'react';
import CurrencyType from '../currencyType/CurrencyType';
import { Link } from 'react-router-dom';
import MiniCartAttributes from '../miniCartAttributes/MiniCartAttributes';

export default class MiniCartItems extends PureComponent {
	renderCardData = () => {
		const { increaseItemQuantity, decreaseItemQuantity, cardData, currencyType } = this.props;
		return cardData.map(
			(item, index) =>
				item && (
					<div key={index} className='miniCard-product'>
						<div className='miniCard-left'>
							<h3>{item.brand}</h3>
							<h3>{item.name}</h3>
							<div className='miniCard-left-price'>
								<CurrencyType
									item={item}
									currencyType={currencyType}
									quantity={1}
								/>
							</div>

							<MiniCartAttributes item={item} />
						</div>
						<div className='miniCard-middle'>
							<p onClick={() => increaseItemQuantity(index)}>+</p>
							<h3>{item.qty}</h3>
							<p onClick={() => decreaseItemQuantity(index)}>-</p>
						</div>
						<div className='miniCard-right'>
							<>
								<Link to={`/product/${item.id}`}>
									<img
										className='miniCard-right-main'
										src={item.gallery[item.displayImg]}
										alt=''
									/>
								</Link>
							</>
						</div>
					</div>
				)
		);
	};
	render() {
		return <>{this.renderCardData()}</>;
	}
}
