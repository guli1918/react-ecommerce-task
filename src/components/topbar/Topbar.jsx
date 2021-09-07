import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './topbar.css';
import Currency from '../currency/Currency';
import MiniCard from '../miniCard/MiniCard';

export default class Topbar extends Component {
	state = {
		currency: false,
		card: false,
		activePage: null,
		location1: null,
		location2: null,
	};

	handleClickCurrency = () => {
		this.setState({ currency: !this.state.currency });
		this.setState({ card: false });
	};
	handleClickCard = (state) => {
		state = false;
		this.setState({ card: !this.state.card });
		this.setState({ currency: false });
	};

	handleCurrencyType = (type) => {
		this.setState({ currencyType: type });
		this.setState({ currency: false });
	};

	handleCardClick = (click) => {
		this.setState({ card: click });
	};
	handleCurrencyClick = (click) => {
		this.setState({ currency: click });
	};

	render() {
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
										this.setState({ card: false });
										this.setState({ currency: false });
									}}
									className={
										this.state.activePage === 1 ? 'link link-active' : 'link'
									}
									to='/'
								>
									ALL
								</Link>
							</li>
							<li>
								<Link
									onClick={() => {
										this.setState({ activePage: 2 });
										this.setState({ card: false });
										this.setState({ currency: false });
									}}
									className={
										this.state.activePage === 2 ? 'link link-active' : 'link'
									}
									to='/clothes'
								>
									CLOTHES
								</Link>
							</li>
							<li>
								<Link
									onClick={() => {
										this.setState({ activePage: 3 });
										this.setState({ card: false });
										this.setState({ currency: false });
									}}
									className={
										this.state.activePage === 3 ? 'link link-active' : 'link'
									}
									to='/tech'
								>
									TECH
								</Link>
							</li>
						</ul>
					</div>
					<div className='topBar-right'>
						<div></div>
						<div onClick={this.handleClickCurrency} className='imgLeft'>
							<p className='imgLeft-currency'>
								{this.props.currencyType === 'USD'
									? '$'
									: this.props.currencyType === 'GBP'
									? '£'
									: '¥'}
							</p>
							<img
								className={this.state.currency ? 'down rotateDollar' : 'down'}
								src='../assets/down.png'
								alt=''
							/>
						</div>
						<div className='currencyBar'>
							{this.state.currency && (
								<Currency
									closeCurrencyBar={this.handleCurrencyClick}
									updateCurrencyType={this.props.updateCurrencyType}
								/>
							)}
						</div>
						<div onClick={this.handleClickCard} className='imgRight'>
							<img className='card-topBar' src='../assets/card-top.png' alt='' />
							{this.props.cardData.length > 0 && (
								<div className='card-topBar-circle'>
									{this.props.cardData.length}
								</div>
							)}
						</div>
						<div className='cardBar'>
							{this.state.card && (
								<MiniCard
									cardClick={this.handleCardClick}
									cardData={this.props.cardData}
									existingProduct={this.props.existingProduct}
									updateCardData={this.props.updateCardData}
									decreaseCardData={this.props.decreaseCardData}
									currencyType={this.props.currencyType}
									attributeValue={this.props.attributeValue}
									totalPrice={this.props.totalPrice}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
