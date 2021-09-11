import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Loader from 'react-loader-spinner';
import parse from 'html-react-parser';

import './singleProduct.css';

class SingleProduct extends Component {
	state = {
		image: 0,
		size: null,
		product: null,
		isLoading: true,
	};

	async componentDidMount() {
		const { history, match } = this.props;

		const my_query = `{
			product(id:"${match.params.id}"){
			  id
			  name
			  gallery
			  description
			  brand
			  inStock
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

		if (response.status === 200) {
			const { data } = await response.json();

			if (data && data.product) {
				this.setState({ product: data.product });
			} else {
				// Normally, we could check the response status to get users to 404 in case of not found product.
				// However, the back-end returns 200 code for not found products, too.
				history.push('/404');
			}
		} else {
			// TODO: Show toast alert to user indicating that the product details could not be loaded properly.
			console.error('An error occurred while fetcing product data.');
		}
		this.setState({ isLoading: false });
	}

	async componentDidUpdate() {
		const { history, location, match } = this.props;
		const { product } = this.state;

		if (product.id !== location.pathname.split('/')[2]) {
			const my_query = `{
				product(id:"${match.params.id}"){
					id
				  name
				  gallery
				  description
				  brand
				  inStock
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

			if (response.status === 200) {
				const { data } = await response.json();

				if (data && data.product) {
					this.setState({ product: data.product });
				} else {
					// Normally, we could check the response status to get users to 404 in case of not found product.
					// However, the back-end returns 200 code for not found products, too.
					history.push('/404');
				}
			} else {
				// TODO: Show toast alert to user indicating that the product details could not be loaded properly.
				console.error('An error occurred while fetcing product data.');
			}
		}
	}

	updateCard = (product) => {
		this.props.updateCardData(product);
		this.props.updateAttributeValue(product);
	};

	imageClick = (id) => {
		this.setState({ image: id });
	};

	handleAttributeValue = (item) => {
		this.props.getAttributeValue(item.displayValue);
	};

	render() {
		const { product, isLoading, image } = this.state;
		const { attributeValue, currencyType } = this.props;

		return !isLoading ? (
			product && (
				<div className='singleProduct'>
					<div className='product-wrapper'>
						<div className='product-left'>
							{product.gallery.length > 0 &&
								product.gallery.map((img, index) => (
									<img
										onClick={() => this.imageClick(index)}
										className={
											image === index
												? 'secondary-img secondary-active'
												: 'secondary-img'
										}
										src={img}
										id={index}
										key={index}
										alt=''
									/>
								))}
						</div>
						<div className='product-middle'>
							{product.gallery.length > 0 && (
								<img className='main-img' src={product.gallery[image]} alt='' />
							)}
						</div>
						<div className='product-right'>
							<div className='right-title'>
								<h3 className='right-title-brand'>{product.brand}</h3>
								<h3 className='right-title-name'>{product.name}</h3>
							</div>
							{product.attributes.length > 0 &&
								product.attributes.map((type, index) => (
									<div key={index} className='right-size'>
										<h4 className='right-size-text'>{type.name}</h4>
										<div className='right-sizes'>
											{product.attributes.length > 0 &&
											product.attributes[index].name === 'Color'
												? product.attributes[index].items.map(
														(item, index) => (
															<button
																onClick={() =>
																	this.handleAttributeValue(item)
																}
																key={index}
																className='size-box'
																style={{
																	backgroundColor:
																		item.displayValue !==
																		'Black'
																			? 'light' +
																			  item.displayValue
																			: item.displayValue,
																}}
															></button>
														)
												  )
												: product.attributes[index].items.map(
														(item, index) => (
															<button
																onClick={() =>
																	this.handleAttributeValue(item)
																}
																key={index}
																className={
																	attributeValue.includes(
																		item.displayValue
																	)
																		? 'size-box size-box-active'
																		: 'size-box'
																}
															>
																{item.value}
															</button>
														)
												  )}
										</div>
									</div>
								))}
							<div className='right-price'>
								<h3 className='right-price-text'>PRICE:</h3>
								<h4 className='right-price-amount'>
									{currencyType ? (
										<>
											{product.prices[0].currency === currencyType &&
												'$' + product.prices[0].amount}
											{product.prices[1].currency === currencyType &&
												'₤' + product.prices[1].amount}
											{product.prices[2].currency === currencyType &&
												'A$' + product.prices[2].amount}
											{product.prices[3].currency === currencyType &&
												'¥' + product.prices[3].amount}
											{product.prices[4].currency === currencyType &&
												'₽' + product.prices[4].amount}
										</>
									) : (
										'$' + product.prices[0].amount
									)}
								</h4>
							</div>
							<div
								onClick={() => product.inStock && this.updateCard(product)}
								className={
									product.inStock
										? 'add-to-card'
										: 'add-to-card add-to-card-disable'
								}
							>
								<p>ADD TO CARD</p>
							</div>
							<div className='right-desc right-desc-text'>
								{parse(product.description)}
							</div>
						</div>
					</div>
				</div>
			)
		) : (
			<Loader className='loader' type='Oval' color='#5ece7b' height={100} width={100} />
		);
	}
}

export default withRouter(SingleProduct);
