import React, { PureComponent } from 'react';
import MinicartBottom from '../minicartBottom/MinicartBottom';
import MiniCartItems from '../miniCartItems/MiniCartItems';

import './miniCart.css';

export default class MiniCart extends PureComponent {
	render() {
		const {
			cardData,
			currencyType,
			totalPrice,
			increaseItemQuantity,
			decreaseItemQuantity,
			handleClickCard,
		} = this.props;

		const itemQuantity = cardData.reduce((a, item) => a + item.qty, 0);
		return (
			<div className='miniCard-main'>
				<div className='miniCard-title'>
					<div className='miniCard-top'>
						<h3>
							{cardData.length === 0 ? (
								<span>Cart is empty!</span>
							) : (
								<>
									My Bag,{' '}
									<span>
										{itemQuantity === 1
											? itemQuantity + ' item'
											: itemQuantity + ' items'}
									</span>
								</>
							)}
						</h3>
					</div>

					<MiniCartItems
						increaseItemQuantity={increaseItemQuantity}
						decreaseItemQuantity={decreaseItemQuantity}
						cardData={cardData}
						currencyType={currencyType}
					/>

					<MinicartBottom
						totalPrice={totalPrice}
						currencyType={currencyType}
						handleClickCard={handleClickCard}
					/>
				</div>
			</div>
		);
	}
}
