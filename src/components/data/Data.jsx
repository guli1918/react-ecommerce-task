import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import './data.css';

export default class data extends Component {
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
		const { category, products, card, currencyType, updateCardData } = this.props;

		return !isLoading ? (
			category === 'all' ? (
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
									className={!d.inStock ? 'main-imgs noStock' : 'main-imgs'}
									src={d.gallery[0]}
									alt={d.id}
								/>
								<div className='outOfStock'>
									{!d.inStock && <h3>OUT OF STOCK</h3>}
								</div>
							</div>
							<div className='product-desc'>
								<h4>
									{d.brand} {d.name}
								</h4>
								<p>
									{currencyType ? (
										<>
											{d.prices[0].currency === currencyType &&
												'$' + d.prices[0].amount}
											{d.prices[1].currency === currencyType &&
												'₤' + d.prices[1].amount}
											{d.prices[2].currency === currencyType &&
												'A$' + d.prices[2].amount}
											{d.prices[3].currency === currencyType &&
												'¥' + d.prices[3].amount}
											{d.prices[4].currency === currencyType &&
												'₽' + d.prices[4].amount}
										</>
									) : (
										'$' + d.prices[0].amount
									)}
								</p>
							</div>
						</Link>
						{hover === d.id && (
							<div
								onClick={() => {
									d.inStock && updateCardData(d);
								}}
								className={d.inStock ? 'cards ' : 'cards cards-disable'}
							>
								<img className='shopping-card' src='assets/card.png' alt='' />
							</div>
						)}
					</div>
				))
			) : (
				products.map(
					(d, index) =>
						category === d.category && (
							<div
								id={d.id}
								key={index}
								className='product'
								onMouseOver={() => this.handleHover(d.id)}
								onMouseLeave={() => this.setState({ hover: false })}
							>
								<Link className='links' to={`/product/${d.id}`}>
									<div className='img'>
										<img
											className={
												!d.inStock ? 'main-imgs noStock' : 'main-imgs'
											}
											src={d.gallery[0]}
											alt={d.id}
										/>
										<div className='outOfStock'>
											{!d.inStock && <h3>OUT OF STOCK</h3>}
										</div>
									</div>
									<div className='product-desc'>
										<h4>{d.name}</h4>

										<p>
											{currencyType ? (
												<>
													{d.prices[0].currency === currencyType &&
														'$' + d.prices[0].amount}
													{d.prices[1].currency === currencyType &&
														'₤' + d.prices[1].amount}
													{d.prices[2].currency === currencyType &&
														'A$' + d.prices[2].amount}
													{d.prices[3].currency === currencyType &&
														'¥' + d.prices[3].amount}
													{d.prices[4].currency === currencyType &&
														'₽' + d.prices[4].amount}
												</>
											) : (
												'$' + d.prices[0].amount
											)}
										</p>
									</div>
								</Link>
								{hover === d.id && (
									<div
										onClick={() => {
											d.inStock && updateCardData(d);
										}}
										className={d.inStock ? 'cards ' : 'cards cards-disable'}
									>
										<img
											className='shopping-card'
											src='assets/card.png'
											alt=''
										/>
									</div>
								)}
							</div>
						)
				)
			)
		) : (
			<Loader className='loader' type='Oval' color='#5ece7b' height={100} width={100} />
		);
	}
}
