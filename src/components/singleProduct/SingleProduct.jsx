import React, { Component } from 'react';
import { withRouter } from 'react-router';

import './singleProduct.css';

class SingleProduct extends Component {
	state = {
		image: 0,
		size: null,
		product: null,
	};

	async componentDidMount() {
		const { history } = this.props;

		const my_query = `{
			product(id:"${this.props.match.params.id}"){
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
			console.error('An error occurred while fetcing product data.s');
		}
	}

	imageClick(id) {
		this.setState({ image: id });
	}

	render() {
		const { product } = this.state;

		return (
			product && (
				<div className='singleProduct'>
					<div className='product-wrapper'>
						<div className='product-left'>
							{product.gallery.length > 0 &&
								product.gallery.map((img, index) => (
									<img
										onClick={() => this.imageClick(index)}
										className={
											this.state.image === index
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
								<img
									className='main-img'
									src={product.gallery[this.state.image]}
									alt=''
								/>
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
															<div
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
															></div>
														)
												  )
												: product.attributes[index].items.map(
														(item, index) => (
															<div
																key={index}
																onClick={() =>
																	this.props.updateAttributeValue(
																		index
																	)
																}
																className={
																	index ===
																	this.props.attributeValue
																		? 'size-box size-box-active'
																		: 'size-box'
																}
															>
																{item.value}
															</div>
														)
												  )}
										</div>
									</div>
								))}
							<div className='right-price'>
								<h3 className='right-price-text'>PRICE:</h3>
								<h4 className='right-price-amount'>
									{this.props.currencyType ? (
										<>
											{product.prices[0].currency ===
												this.props.currencyType &&
												'$' + product.prices[0].amount}
											{product.prices[1].currency ===
												this.props.currencyType &&
												'₤' + product.prices[1].amount}
											{product.prices[3].currency ===
												this.props.currencyType &&
												'¥' + product.prices[3].amount}
										</>
									) : (
										'$' + product.prices[0].amount
									)}
								</h4>
							</div>
							<div
								onClick={() => this.props.updateCardData(product)}
								className='add-to-card'
							>
								<p>ADD TO CARD</p>
							</div>
							<div className='right-desc'>
								<p
									className='right-desc-text'
									dangerouslySetInnerHTML={{
										__html: this.state.product.description,
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			)
		);
	}
}

export default withRouter(SingleProduct);
