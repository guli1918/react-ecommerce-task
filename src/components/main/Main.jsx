import React, { Component } from 'react';
import './main.css';
import Data from '../data/Data';

export default class Main extends Component {
	state = {
		name: 'Category Name',
	};

	render() {
		const { updateCardData, currencyType, category, products, setProducts, card } = this.props;

		return (
			<div className={this.props.card ? 'main-noFocus' : 'main'}>
				<h1 className='main-text'>{this.props.category.toUpperCase()}</h1>
				<div className='main-wrapper'>
					<div className='products'>
						<Data
							updateCardData={updateCardData}
							currencyType={currencyType}
							category={category}
							products={products}
							setProducts={setProducts}
							card={card}
						/>
					</div>
				</div>
			</div>
		);
	}
}
