import React, { PureComponent } from 'react';
import Currency from '../currency/Currency';

export default class DisplayCurrency extends PureComponent {
	handleClickCurrency = () => {
		const { handleClickCurrency, currency } = this.props;
		handleClickCurrency(!currency);
	};

	handleBlurCurrency = () => {
		const { handleClickCurrency } = this.props;
		handleClickCurrency(false);
	};

	render() {
		const { currency, currencyType, handleClickCurrency, updateCurrencyType } = this.props;

		return (
			<div
				onClick={this.handleClickCurrency}
				onBlur={this.handleBlurCurrency}
				tabIndex={0}
				className='imgLeft'
			>
				<p onClick={() => handleClickCurrency(true)} className='imgLeft-currency'>
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

				{currency && (
					<Currency
						closeCurrencyBar={this.handleCurrencyClick}
						updateCurrencyType={updateCurrencyType}
						handleClickCurrency={handleClickCurrency}
					/>
				)}
			</div>
		);
	}
}
