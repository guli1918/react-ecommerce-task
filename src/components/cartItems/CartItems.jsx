import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import CartItemAttributes from '../cartItemAttributes/CartItemAttributes';
import CurrencyType from '../currencyType/CurrencyType';

export default class CartItems extends PureComponent {
	displayNextImg = (item) => {
		!this.props.card && this.props.displayNextImg(item);
	};

	displayPreviousImg = (item) => {
		!this.props.card && this.props.displayPreviousImg(item);
	};

	renderCartItems = () => {
		const { cardData, currencyType, card, increaseItemQuantity, decreaseItemQuantity } =
			this.props;
		return cardData.map((item, index) => (
			<div key={index} className='card-product'>
				<div className='card-product-left'>
					<Link className='card-product-left-link' to={`/product/${item.id}`}>
						<div className='card-product-left-title card-product-left-link'>
							<h3>{item.brand}</h3>
							<h3>{item.name}</h3>
						</div>
					</Link>
					<div className='card-product-left-price'>
						<p>
							<CurrencyType item={item} currencyType={currencyType} quantity={1} />
						</p>
					</div>
					<CartItemAttributes item={item} />
				</div>
				<div className='card-product-middle copy-disable'>
					<p onClick={() => !card && increaseItemQuantity(index)}>+</p>
					<h3>{item.qty}</h3>
					<p onClick={() => !card && decreaseItemQuantity(index)}>–</p>
				</div>
				<div className='card-product-right'>
					<>
						{item.gallery.length > 1 && (
							<div className='card-product-inner copy-disable'>
								<img
									onClick={() => this.displayPreviousImg(item)}
									className='card-right-arrows arrow-left'
									src='/assets/previous.png'
									alt=''
								/>
								<img
									onClick={() => this.displayNextImg(item)}
									className='card-right-arrows arrow-right'
									src='/assets/next.png'
									alt=''
								/>
							</div>
						)}
						<img
							className='card-right-main copy-disable'
							src={item.gallery[item.displayImg]}
							alt=''
						/>
					</>
				</div>
			</div>
		));
	};

	render() {
		const { cardData } = this.props;

		return cardData.length > 0 ? (
			<div className='card-products'>{this.renderCartItems()}</div>
		) : (
			<p>Cart is empty!</p>
		);
	}
}
