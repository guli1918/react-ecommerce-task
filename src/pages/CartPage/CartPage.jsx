import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import CartItems from '../../components/cartItems/CartItems';
import './cartPage.css';

export default class Card extends PureComponent {
	render() {
		const {
			cardData,
			currencyType,
			card,
			increaseItemQuantity,
			decreaseItemQuantity,
			displayNextImg,
			displayPreviousImg,
		} = this.props;

		return (
			<div className={card ? 'card-noFocus' : 'card'}>
				<h2 className='card-main-title'>CART</h2>
				<CartItems
					card={card}
					cardData={cardData}
					currencyType={currencyType}
					increaseItemQuantity={increaseItemQuantity}
					decreaseItemQuantity={decreaseItemQuantity}
					displayNextImg={displayNextImg}
					displayPreviousImg={displayPreviousImg}
				/>
				<div className='card-bottom copy-disable'>
					{!card ? (
						<>
							<Link className='card-bottom-link ' to='/'>
								<p className='card-bottom-link-1'>GO BACK</p>
							</Link>
							<Link className='card-bottom-link' to='/checkout'>
								<p className='card-bottom-link-2'>CHECKOUT</p>
							</Link>
						</>
					) : (
						<>
							<p className='card-bottom-link-1'>GO BACK</p>
							<p className='card-bottom-link-2'>CHECKOUT</p>
						</>
					)}
				</div>
			</div>
		);
	}
}
