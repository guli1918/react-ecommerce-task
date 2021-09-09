import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './topbar.css';
import Currency from '../currency/Currency';
import MiniCard from '../miniCard/MiniCard';

export default class Topbar extends Component {
	state = {
		activePage: null,
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
			updateCardData,
			decreaseCardData,
			attributeValue,
			totalPrice,
			card,
			currency,
		} = this.props;

		const itemQuantity = this.props.cardData.reduce((a, item) => a + item.qty, 0);
		return (
			<div className='topbar'>
				<div className='wrapper'>
					<div className='left'>
						<ul className='left-list'>
							<li>
								<Link
									key='1'
									onClick={() => {
										this.setState({ activePage: 1 });
										handleClickCard(false);
										handleClickCurrency(false);
									}}
									className={activePage === 1 ? 'link link-active' : 'link'}
									to='/'
								>
									ALL
								</Link>
							</li>
							<li>
								<Link
									onClick={() => {
										this.setState({ activePage: 2 });
										handleClickCard(false);
										handleClickCurrency(false);
									}}
									className={activePage === 2 ? 'link link-active' : 'link'}
									to='/clothes'
								>
									CLOTHES
								</Link>
							</li>
							<li>
								<Link
									onClick={() => {
										this.setState({ activePage: 3 });
										handleClickCard(false);
										handleClickCurrency(false);
									}}
									className={activePage === 3 ? 'link link-active' : 'link'}
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
									updateCardData={updateCardData}
									decreaseCardData={decreaseCardData}
									currencyType={currencyType}
									attributeValue={attributeValue}
									totalPrice={totalPrice}
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
