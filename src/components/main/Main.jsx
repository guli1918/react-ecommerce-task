import React, { Component } from 'react';
import './main.css';
import Data from '../data/Data';

export default class main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'Category Name',
		};
	}
	render() {
		return (
			<div className='main'>
				<div className='main-wrapper'>
					<h1 className='main-text'>{this.props.category.toUpperCase()}</h1>
					<div className='products'>
						<Data
							currencyType={this.props.currencyType}
							category={this.props.category}
						/>
					</div>
				</div>
			</div>
		);
	}
}
