import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import Loader from 'react-loader-spinner';
import SingleProductRight from '../../components/singleProductRight/SingleProductRight';

import './singleProduct.css';

class SingleProduct extends PureComponent {
	state = {
		image: 0,
		product: null,
		isLoading: true,
	};

	async fetchProductData() {
		const { history, match, emptyAttributes } = this.props;

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
				emptyAttributes();
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

	componentDidMount() {
		this.fetchProductData();
	}

	componentDidUpdate() {
		const { location } = this.props;
		const { product } = this.state;

		if (product.id !== location.pathname.split('/')[2]) {
			this.fetchProductData();
		}
	}

	imageClick = (id) => {
		this.setState({ image: id });
	};

	renderProductGallery = () => {
		const { product, image } = this.state;
		const { card } = this.props;
		return (
			product.gallery.length > 0 &&
			product.gallery.map((img, index) => (
				<img
					onClick={() => !card && this.imageClick(index)}
					className={
						image === index
							? 'secondary-img secondary-active copy-disable'
							: 'secondary-img copy-disable'
					}
					src={img}
					id={index}
					key={index}
					alt=''
				/>
			))
		);
	};

	render() {
		const { product, isLoading, image } = this.state;
		const { selectedAttributes, currencyType, card, setAttributeValue, updateCardData } =
			this.props;

		return !isLoading ? (
			product && (
				<div className={card ? 'singleProduct-noFocus' : 'singleProduct'}>
					<div className='product-wrapper'>
						<div className='product-left'>{this.renderProductGallery()}</div>

						<div className='product-middle'>
							{product.gallery.length > 0 && (
								<img
									className='main-img copy-disable'
									src={product.gallery[image]}
									alt=''
								/>
							)}
						</div>
						<SingleProductRight
							selectedAttributes={selectedAttributes}
							currencyType={currencyType}
							setAttributeValue={setAttributeValue}
							product={product}
							card={card}
							updateCardData={updateCardData}
						/>
					</div>
				</div>
			)
		) : (
			<Loader className='loader' type='Oval' color='#5ece7b' height={100} width={100} />
		);
	}
}

export default withRouter(SingleProduct);
