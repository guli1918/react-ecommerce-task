import React, { PureComponent } from 'react';
import Loader from 'react-loader-spinner';
import ProductLink from '../../components/productLink/ProductLink';
import RenderProducts from '../../components/renderProducts.jsx/RenderProducts';

import './categoryPage.css';

export default class CategoryPage extends PureComponent {
	state = {
		isLoading: true,
	};

	async fetchCategoryProducts() {
		const { categoryName, setProducts } = this.props;
		const my_query = `{
            category(input:{title:"${categoryName}"}) {
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
		setProducts(data.data.category.products);
		this.setState({ isLoading: false });
	}

	async componentDidMount() {
		this.fetchCategoryProducts();
	}

	async componentDidUpdate() {
		const { products, categoryName } = this.props;
		if (categoryName !== products[0].category) {
			this.fetchCategoryProducts();
		}
	}

	render() {
		const { isLoading } = this.state;
		const { categoryName, products, card, currencyType, updateCardData } = this.props;

		return (
			<div className='main'>
				<h1 className='main-text'>{categoryName.toUpperCase()}</h1>
				<div className='main-wrapper'>
					<div className='products'>
						<RenderProducts
							isLoading={isLoading}
							products={products}
							card={card}
							currencyType={currencyType}
							updateCardData={updateCardData}
						/>
					</div>
				</div>
			</div>
		);
	}
}
