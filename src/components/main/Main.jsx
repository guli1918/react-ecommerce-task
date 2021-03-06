import React, { PureComponent } from 'react';
import MainPage from '../../pages/MainPage/MainPage';

import './main.css';

export default class Main extends PureComponent {
	state = {
		name: 'Category Name',
	};

	render() {
		const { updateCardData, currencyType, category, products, setProducts, card } = this.props;

		return (
			<div className='main'>
				<h1 className='main-text'>{this.props.category.toUpperCase()}</h1>
				<div className='main-wrapper'>
					<div className='products'>
						<MainPage
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
