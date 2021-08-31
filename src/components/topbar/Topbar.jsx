import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import './topbar.css';
import Currency from '../currency/Currency';
import MiniCart from '../miniCart/MiniCart';

export default class Topbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			classLine1: '',
			classText1: '',
			classLine2: '',
			classText2: '',
			classLine3: '',
			classText3: '',
		};
		this.state = {
			currency: false,
		};

		this.state = {
			cart: false,
		};
		this.state = {
			click1: false,
			click2: false,
			click3: false,
		};
		//THIS IS TO GET DATA FROM CHILD COMPONENT "CURRENCY"
		this.state = {
			currencyType: null,
		};
		this.onHover1 = this.onHover1.bind(this);
		this.onHover2 = this.onHover2.bind(this);
		this.onHover3 = this.onHover3.bind(this);
		this.onLeave1 = this.onLeave1.bind(this);
		this.onLeave2 = this.onLeave2.bind(this);
		this.onLeave3 = this.onLeave3.bind(this);
		this.onClick1 = this.onClick1.bind(this);
		this.onClick2 = this.onClick2.bind(this);
		this.onClick3 = this.onClick3.bind(this);
		this.handleClickCurrency = this.handleClickCurrency.bind(this);
	}
	onHover1 = () => {
		this.setState({ classLine1: 'line' });
		this.setState({ classText1: 'text' });
	};
	onLeave1 = () => {
		this.setState({ classLine1: '' });
		this.setState({ classText1: '' });
	};
	onClick1 = () => {
		this.setState({ click1: !this.state.click1 });
		this.setState({ click2: false });
		this.setState({ click3: false });
	};
	onHover2 = () => {
		this.setState({ classLine2: 'line' });
		this.setState({ classText2: 'text' });
	};
	onLeave2 = () => {
		this.setState({ classLine2: '' });
		this.setState({ classText2: '' });
	};
	onClick2 = () => {
		this.setState({ click2: !this.state.click2 });
		this.setState({ click1: false });
		this.setState({ click3: false });
	};
	onHover3 = () => {
		this.setState({ classLine3: 'line' });
		this.setState({ classText3: 'text' });
	};
	onLeave3 = () => {
		this.setState({ classLine3: '' });
		this.setState({ classText3: '' });
	};
	onClick3 = () => {
		this.setState({ click3: !this.state.click3 });
		this.setState({ click2: false });
		this.setState({ click1: false });
	};

	handleClickCurrency = () => {
		this.setState({ currency: !this.state.currency });
		this.setState({ cart: false });
	};
	handleClickCart = () => {
		this.setState({ cart: !this.state.cart });
		this.setState({ currency: false });
	};
	handleCurrencyType = (type) => {
		this.setState({ currencyType: type });
		this.setState({ currency: false });
	};

	sendHandleCurrencyType = () => {
		this.props.sendCurrencyType(this.state.currencyType);
	};

	render() {
		return (
			<div className='topbar'>
				<div className='wrapper'>
					<div className='left'>
						<ul className='left-list'>
							<li>
								<Link
									onClick={this.onClick1}
									onMouseOver={this.onHover1}
									onMouseLeave={this.onLeave1}
									className={
										this.state.click1
											? 'link text'
											: 'link ' + this.state.classText1
									}
									to='/'
								>
									ALL
									<div
										className={
											this.state.click1 ? 'line ' : this.state.classLine1
										}
									></div>
								</Link>
							</li>
							<li>
								<Link
									onClick={this.onClick2}
									className={
										this.state.click2
											? 'link text'
											: 'link ' + this.state.classText2
									}
									onMouseOver={this.onHover2}
									onMouseLeave={this.onLeave2}
									to='/clothes'
								>
									CLOTHES
									<div
										className={
											this.state.click2 ? 'line ' : this.state.classLine2
										}
									></div>
								</Link>
							</li>
							<li>
								<Link
									onClick={this.onClick3}
									className={
										this.state.click3
											? 'link text'
											: 'link ' + this.state.classText3
									}
									onMouseOver={this.onHover3}
									onMouseLeave={this.onLeave3}
									to='/tech'
								>
									TECH
									<div
										className={
											this.state.click3 ? 'line ' : this.state.classLine3
										}
									></div>
								</Link>
							</li>
						</ul>
					</div>
					<div className='right'>
						<div onClick={this.handleClickCurrency} className='imgLeft'>
							<img className='dollar' src='assets/dollar.png' alt='' />
							<img
								className={this.state.currency ? 'down rotateDollar' : 'down'}
								src='assets/down.png'
								alt=''
							/>
						</div>
						<div className='currencyBar'>
							{this.state.currency && (
								<Currency
									dataToCurrency={this.sendHandleCurrencyType}
									currencyType={this.handleCurrencyType}
								/>
							)}
						</div>
						<div onClick={this.handleClickCart} className='imgRight'>
							<img className='cart-topBar' src='assets/cart.png' alt='' />
						</div>
						<div className='cartBar'>{this.state.cart && <MiniCart />}</div>
					</div>
				</div>
			</div>
		);
	}
}
