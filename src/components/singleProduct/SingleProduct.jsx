import React, { Component } from 'react';
import './singleProduct.css';

export default class SingleProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			image: 0,
			size: null,
			data: null,
		};
	}
	async componentDidMount() {
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
		const data = await response.json();
		this.setState({ data: data.data.product });
	}

	imageClick(id) {
		this.setState({ image: id });
	}

	render() {
		return (
			this.state.data && (
				<div className='singleProduct'>
					<div className='product-wrapper'>
						<div className='product-left'>
							{this.state.data.gallery.length > 0 &&
								this.state.data.gallery.map((img, index) => (
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
							{this.state.data.gallery && (
								<img
									className='main-img'
									src={this.state.data.gallery[this.state.image]}
									alt=''
								/>
							)}
						</div>
						<div className='product-right'>
							<div className='right-title'>
								<h3 className='right-title-brand'>{this.state.data.brand}</h3>
								<h3 className='right-title-name'>{this.state.data.name}</h3>
							</div>
							{this.state.data.attributes.length !== 0 &&
								this.state.data.attributes.map((type, index) => (
									<div key={index} className='right-size'>
										<h4 className='right-size-text'>{type.name}</h4>
										<div className='right-sizes'>
											{this.state.data.attributes.length !== 0 &&
											this.state.data.attributes[index].name === 'Color'
												? this.state.data.attributes[index].items.map(
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
												: this.state.data.attributes[index].items.map(
														(item, index) => (
															<div key={index} className='size-box'>
																{item.displayValue}
															</div>
														)
												  )}
										</div>
									</div>
								))}
							<div className='right-price'>
								<h3 className='right-price-text'>PRICE:</h3>
								<h4 className='right-price-amount'>
									${this.state.data.prices[0].amount}
								</h4>
							</div>
							<div className='add-to-cart'>
								<p>ADD TO CART</p>
							</div>
							<div className='right-desc'>
								<p
									className='right-desc-text'
									dangerouslySetInnerHTML={{
										__html: this.state.data.description,
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
