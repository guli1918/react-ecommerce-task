import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import './topBar.css';
import MiniCart from '../miniCart/MiniCart';
import DisplayCurrency from '../displayCurrency/DisplayCurrency';
import TopbarLinks from '../topbarLinks/TopbarLinks';

class MiniCard extends PureComponent {
	state = {
		currency: 'USD',
		activePage: window.location.href.split('/')[3],
		location1: null,
		location2: null,
	};

	handleCurrencyClick = (currency) => {
		this.setState({ currency });
	};

	handleBackdropClick = (event) => {
		const classNames = ['backdrop', 'wrapper', 'topBar-right'];
		if (classNames.some((className) => event.target.classList.contains(className))) {
			const { handleClickCard } = this.props;
			handleClickCard(false);
		}
	};

	handleCurrencyType = (type) => {
		this.setState({ currencyType: type });
		this.setState({ currency: false });
	};

	render() {
		const {
			card,
			cardData,
			currency,
			currencyType,
			handleClickCurrency,
			updateCurrencyType,
			handleClickCard,
			totalPrice,
			increaseItemQuantity,
			decreaseItemQuantity,
		} = this.props;

		const itemQuantity = cardData.reduce((a, item) => a + item.qty, 0);

		return (
			<div
				className={`miniCard-container copy-disable ${card ? 'backdrop' : ''}`}
				onClick={this.handleBackdropClick}
			>
				<div className='topbar'>
					<div className='wrapper'>
						<div className='left' style={{ visibility: card ? 'hidden' : 'visible' }}>
							<TopbarLinks />
						</div>
						<div className='topBar-right'>
							<DisplayCurrency
								currency={currency}
								currencyType={currencyType}
								handleClickCurrency={handleClickCurrency}
								updateCurrencyType={updateCurrencyType}
							/>

							<div onClick={() => handleClickCard(!card)} className='imgRight'>
								<img className='card-topBar' src='../assets/card-top.png' alt='' />
								{itemQuantity > 0 ? (
									itemQuantity <= 99 ? (
										<div className='card-topBar-circle'>{itemQuantity}</div>
									) : (
										<div className='card-topBar-circle-small'>99+</div>
									)
								) : null}
							</div>
						</div>
					</div>
				</div>

				{card && (
					<MiniCart
						handleClickCard={handleClickCard}
						cardData={cardData}
						currencyType={currencyType}
						totalPrice={totalPrice}
						increaseItemQuantity={increaseItemQuantity}
						decreaseItemQuantity={decreaseItemQuantity}
					/>
				)}
			</div>
		);
	}
}

export default withRouter(MiniCard);
