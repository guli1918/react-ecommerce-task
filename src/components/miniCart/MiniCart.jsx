import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './miniCart.css';

export default class MiniCart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cartItem: [],
			isLoading: false,
		};
		this.totalPrice = 0;
	}

	async componentDidUpdate(prevProps) {
		if (prevProps.cartData !== this.props.cartData) {
			const my_query = `{
				product(id:"${this.props.cartData}"){
				  id
				  name
				  gallery
				  description
				  brand
				  prices{
					currency
					amount
				  }
				  attributes{
					  name
					items {
					  displayValue
					  id
					  value
					}
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
			this.setState({ cartItem: [...this.state.cartItem, data.data.product] });
			this.setState({ isLoading: false });
		}
	}

	async componentDidMount() {
		const my_query = `{
				product(id:"${this.props.cartData}"){
				  id
				  name
				  gallery
				  description
				  brand
				  prices{
					currency
					amount
				  }
				  attributes{
					  name
					items {
					  displayValue
					  id
					  value
					}
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
		this.setState({ cartItem: [...this.state.cartItem, data.data.product] });
		this.setState({ isLoading: false });
	}

	render() {
		return (
			!this.state.isLoading && (
				<div className='miniCart-main'>
					<div className='miniCart-title'>
						<div className='miniCart-top'>
							<h3>
								{console.log(this.state.cartItem)}
								My Bag,
								<span> {this.state.cartItem.length}</span>
							</h3>
						</div>
						{this.state.cartItem.map(
							(item) =>
								item && (
									<div className='miniCart-product'>
										<div className='miniCart-left'>
											<h3>{item.brand}</h3>
											<h3>{item.name}</h3>
											<div className='miniCart-left-price'>
												{item.prices[0].amount}
											</div>
											<div className='miniCart-left-attribute'>
												<p>S</p>
											</div>
										</div>
										<div className='miniCart-middle'>
											<p>+</p>
											<h3>1</h3>
											<p>-</p>
										</div>
										<div className='miniCart-right'>
											<img src={item.gallery[0]} alt='' />
										</div>
									</div>
								)
						)}
						<div className='miniCart-bottom'>
							<div className='miniCart-bottom-amount'>
								<p>Total</p>
								<span>$100.00</span>
							</div>
							<div className='miniCart-bottom-payment'>
								<Link
									onClick={() => this.props.cartClick(false)}
									to='/cart'
									className='miniCart-link'
								>
									<p className='miniCart-bottom-payment-left'>VIEW BAG</p>
								</Link>
								<Link
									onClick={() => this.props.cartClick(false)}
									to='/checkout'
									className='miniCart-link'
								>
									<p className='miniCart-bottom-payment-right'>CHECK OUT</p>
								</Link>
							</div>
						</div>
					</div>
				</div>
			)
		);
	}
}
