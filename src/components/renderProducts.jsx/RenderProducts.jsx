import React, { PureComponent } from 'react';
import Loader from 'react-loader-spinner';
import ProductLink from '../productLink/ProductLink';

export default class RenderProducts extends PureComponent {
	state = {
		hover: null,
	};
	addProductToCart = (product) => {
		const { updateCardData } = this.props;

		const selectedAttributes = product.attributes.reduce((prevValue, currentValue) => {
			const items = currentValue.items;
			if (!items.length) {
				return prevValue;
			}

			return {
				...prevValue,
				[currentValue.id]: currentValue.items[0],
			};
		}, {});

		updateCardData(product, selectedAttributes);
	};

	handleHover = (id) => {
		!this.props.card && this.setState({ hover: id });
	};

	renderProducts = () => {
		const { products, card, currencyType, isLoading } = this.props;
		const { hover } = this.state;
		return !isLoading ? (
			products.map((d, index) => (
				<div
					id={d.id}
					key={index}
					className={card ? 'product-noFocus' : 'product'}
					onMouseOver={() => this.handleHover(d.id)}
					onMouseLeave={() => this.setState({ hover: false })}
				>
					<ProductLink d={d} currencyType={currencyType} />
					{hover === d.id && (
						<div
							className={
								d.inStock ? 'cards copy-disable' : 'cards-disable copy-disable'
							}
							onClick={() => d.inStock && this.addProductToCart(d)}
						>
							<img className='shopping-card' src='assets/card.png' alt='' />
						</div>
					)}
				</div>
			))
		) : (
			<Loader className='loader' type='Oval' color='#5ece7b' height={100} width={100} />
		);
	};

	render() {
		return this.renderProducts();
	}
}
