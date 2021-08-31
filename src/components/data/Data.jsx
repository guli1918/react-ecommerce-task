import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import './data.css';

export default class data extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			hover: '',
			click: false,
			isLoading: true,
		};
		this.handleHover = this.handleHover.bind(this);
	}
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
		this.setState({ data: data.data.category.products });
		this.setState({ isLoading: false });
	}
	render() {
		return !this.state.isLoading ? (
			this.props.category === 'all' ? (
				this.state.data.map((d, index) => (
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
									className={!d.inStock ? 'main-imgs noStock' : 'main-imgs'}
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
									{this.props.currencyType ? (
										<>
											{d.prices[0].currency === this.props.currencyType &&
												'$' + d.prices[0].amount}
											{d.prices[1].currency === this.props.currencyType &&
												'₤' + d.prices[1].amount}
											{d.prices[3].currency === this.props.currencyType &&
												'¥' + d.prices[3].amount}
										</>
									) : (
										'$' + d.prices[0].amount
									)}
								</p>
							</div>
						</Link>
						{this.state.hover === d.id && (
							<div className='carts'>
								<img className='shopping-cart' src='assets/cart.png' alt='' />
							</div>
						)}
					</div>
				))
			) : (
				this.state.data.map(
					(d, index) =>
						this.props.category === d.category && (
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
										<p>${d.prices[0].amount}</p>
									</div>
								</Link>
								{this.state.hover === d.id && (
									<div className='carts'>
										<img
											className='shopping-cart'
											src='assets/cart.png'
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
