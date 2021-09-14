import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import './mainPage.css';
import CurrencyType from '../currencyType/CurrencyType';

export default class MainPage extends Component {
	state = {
		hover: null,
		isLoading: true,
	};

	handleHover = (id) => {
		this.setState({ hover: id });
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
		const { isLoading, hover } = this.state;
		const { products, card, currencyType } = this.props;

		return !isLoading ? (
			products.map((d, index) => (
				<div
					id={d.id}
					key={index}
					className={card ? 'product-noFocus' : 'product'}
					onMouseOver={() => this.handleHover(d.id)}
					onMouseLeave={() => this.setState({ hover: false })}
				>
					<Link className='links' to={`/product/${d.id}`}>
						<div className='img'>
							<img
								className={
									!d.inStock
										? 'main-imgs noStock copy-disable'
										: 'main-imgs copy-disable'
								}
								src={d.gallery[0]}
								alt={d.id}
							/>
							<div className='outOfStock copy-disable'>
								{!d.inStock && <h3>OUT OF STOCK</h3>}
							</div>
						</div>
						<div className='product-desc'>
							<h4>
								{d.brand} {d.name}
							</h4>
							<p>
								<CurrencyType item={d} currencyType={currencyType} quantity={1} />
							</p>
						</div>
						{hover === d.id && (
							<div
								className={
									d.inStock ? 'cards copy-disable ' : 'cards-disable copy-disable'
								}
							>
								<img className='shopping-card' src='assets/card.png' alt='' />
							</div>
						)}
					</Link>
				</div>
			))
		) : (
			<Loader className='loader' type='Oval' color='#5ece7b' height={100} width={100} />
		);
	}
}
