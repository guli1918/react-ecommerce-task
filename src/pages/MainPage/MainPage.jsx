import React, { PureComponent } from 'react';
import RenderProducts from '../../components/renderProducts.jsx/RenderProducts';

import './mainPage.css';

export default class MainPage extends PureComponent {
	state = {
		isLoading: true,
	};

	async componentDidMount() {
		const my_query = `{
			category {
			  products {
				id
				name
				inStock
				gallery
				description
				category
				attributes {
					name
					id
					items {
						id
						value
					  	displayValue
					}
				  }
				prices {
					currency
					amount
				}
				brand
			  }
			}
		  }`;
		const url = 'http://localhost:4000/';
		const response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query: my_query }),
		});
		const data = await response.json();
		this.props.setProducts(data.data.category.products);
		this.setState({ isLoading: false });
	}

	render() {
		const { isLoading } = this.state;
		const { products, card, currencyType, updateCardData } = this.props;

		return (
			<RenderProducts
				isLoading={isLoading}
				products={products}
				card={card}
				currencyType={currencyType}
				updateCardData={updateCardData}
			/>
		);
	}
}
