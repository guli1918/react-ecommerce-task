import React, { PureComponent } from 'react';
import SingleProductAttribute from '../singleProductAttribute/SingleProductAttribute';
import parse from 'html-react-parser';
import CurrencyType from '../currencyType/CurrencyType';

export default class SingleProductRight extends PureComponent {
	updateCard = (product) => {
		const { selectedAttributes, card } = this.props;
		const attributesEqual =
			Object.values(selectedAttributes).length === Object.keys(product.attributes).length;
		product.inStock
			? !card && attributesEqual
				? this.props.updateCardData(product)
				: alert('Choose attribute(s) first to add this item!')
			: alert('Product not available!');
	};

	render() {
		const { product, selectedAttributes, setAttributeValue, currencyType } = this.props;
		return (
			<div className='product-right'>
				<div className='right-title'>
					<h3 className='right-title-brand'>{product.brand}</h3>
					<h3 className='right-title-name'>{product.name}</h3>
				</div>
				<SingleProductAttribute
					selectedAttributes={selectedAttributes}
					product={product}
					setAttributeValue={setAttributeValue}
				/>

				<div className='right-price'>
					<h3 className='right-price-text'>PRICE:</h3>
					<h4 className='right-price-amount'>
						<CurrencyType item={product} currencyType={currencyType} quantity={1} />
					</h4>
				</div>
				<div
					onClick={() => this.updateCard(product)}
					className={
						product.inStock
							? 'add-to-card copy-disable'
							: 'add-to-card add-to-card-disable copy-disable'
					}
				>
					<p>ADD TO CARD</p>
				</div>
				<div className='right-desc right-desc-text'>{parse(product.description)}</div>
			</div>
		);
	}
}
