import React, { Component } from 'react';
import './main.css';
import Data from '../data/Data';

export default class Main extends Component {
	state = {
		name: 'Category Name',
	};

	render() {
		return (
			<div className='main'>
				<h1 className='main-text'>{this.props.category.toUpperCase()}</h1>
				<div className='main-wrapper'>
					<div className='products'>
						<Data
							updateCardData={this.props.updateCardData}
							currencyType={this.props.currencyType}
							category={this.props.category}
							products={this.props.products}
							setProducts={this.props.setProducts}
						/>
					</div>
				</div>
			</div>
		);
	}
}
