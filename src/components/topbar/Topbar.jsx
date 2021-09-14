import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import './topbar.css';
import Currency from '../currency/Currency';
import MiniCard from '../miniCard/MiniCard';

class Topbar extends Component {
	state = {
		activePage: window.location.href.split('/')[3],
		location1: null,
		location2: null,
	};

	handleClickCurrency = () => {
		this.props.handleClickCurrency(!this.props.currency);
	};
	handleClickCard = () => {
		this.props.handleClickCard(!this.props.card);
	};

	handleClickOverlays = () => {
		this.props.handleClickCard(false);
		this.props.handleClickCurrency(false);
	};

	handleCurrencyType = (type) => {
		this.setState({ currencyType: type });
		this.setState({ currency: false });
	};

	handleCardClick = () => {
		this.props.handleClickCard(false);
		this.props.handleClickCurrency(false);
	};
	handleCurrencyClick = (click) => {
		this.setState({ currency: click });
	};

	render() {
		const { activePage } = this.state;
		const {
			handleClickCard,
			handleClickCurrency,
			currencyType,
			updateCurrencyType,
			cardData,
			existingProduct,
			totalPrice,
			card,
			currency,
			increaseItemQuantity,
			decreaseItemQuantity,
		} = this.props;

		const itemQuantity = this.props.cardData.reduce((a, item) => a + item.qty, 0);
		return (
			<div className='topbar copy-disable'>
				<div className='wrapper'>
					<div className='left'>
						<ul className='left-list'>
							<li>
								<Link
									key='1'
									onClick={() => {
										this.setState({
											activePage: '',
										});
										handleClickCard(false);
										handleClickCurrency(false);
									}}
									className={activePage === '' ? 'link link-active' : 'link'}
									to='/'
								>
									ALL
								</Link>
							</li>
							<li>
								<Link
									onClick={() => {
										this.setState({
											activePage: 'clothes',
										});
										handleClickCard(false);
										handleClickCurrency(false);
									}}
									className={
										activePage === 'clothes' ? 'link link-active' : 'link'
									}
									to='/clothes'
								>
									CLOTHES
								</Link>
							</li>
							<li>
								<Link
									onClick={() => {
										this.setState({
											activePage: 'tech',
										});
										handleClickCard(false);
										handleClickCurrency(false);
									}}
									className={activePage === 'tech' ? 'link link-active' : 'link'}
									to='/tech'
								>
									TECH
								</Link>
							</li>
						</ul>
					</div>
					<div onClick={this.handleClickOverlays} className='topBar-middle'></div>
					<div className='topBar-right'>
						<div onClick={this.handleClickCurrency} className='imgLeft'>
							<p className='imgLeft-currency'>
								{currencyType === 'USD'
									? '$'
									: currencyType === 'GBP'
									? '£'
									: currencyType === 'AUD'
									? 'A$'
									: currencyType === 'JPY'
									? '¥'
									: '₽'}
							</p>
							<img
								className={currency ? 'down rotateDollar' : 'down'}
								src='../assets/down.png'
								alt=''
							/>
						</div>
						<div className='currencyBar'>
							{currency && (
								<Currency
									closeCurrencyBar={this.handleCurrencyClick}
									updateCurrencyType={updateCurrencyType}
									handleClickCurrency={handleClickCurrency}
								/>
							)}
						</div>
						<div onClick={this.handleClickCard} className='imgRight'>
							<img className='card-topBar' src='../assets/card-top.png' alt='' />
							{itemQuantity > 0 ? (
								itemQuantity <= 99 ? (
									<div className='card-topBar-circle'>{itemQuantity}</div>
								) : (
									<div className='card-topBar-circle-small'>99+</div>
								)
							) : null}
						</div>
						<div className='cardBar'>
							{card && (
								<MiniCard
									cardClick={this.handleCardClick}
									cardData={cardData}
									existingProduct={existingProduct}
									currencyType={currencyType}
									totalPrice={totalPrice}
									increaseItemQuantity={increaseItemQuantity}
									decreaseItemQuantity={decreaseItemQuantity}
								/>
							)}
						</div>
						<div onClick={this.handleClickOverlays} className='topBar-right-part'></div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Topbar);
