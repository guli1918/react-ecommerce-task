import React, { PureComponent } from 'react';

export default class SingleProductAttribute extends PureComponent {
	handleAttributeValue = (type, item) => {
		this.props.setAttributeValue(type, item);
	};
	renderColor = (type, index) => {
		const { product, selectedAttributes } = this.props;
		return product.attributes[index].items.map((item, index) => (
			<button
				onClick={() => this.handleAttributeValue(type.name, item)}
				key={index}
				className={
					selectedAttributes[type.name] && selectedAttributes[type.name].id === item.id
						? 'size-box size-box-color'
						: 'size-box'
				}
				style={{
					backgroundColor:
						item.displayValue !== 'Black'
							? 'light' + item.displayValue
							: item.displayValue,
				}}
			></button>
		));
	};

	renderNormal = (type, index) => {
		const { product, selectedAttributes } = this.props;
		return product.attributes[index].items.map((item, index) => (
			<button
				onClick={() => this.handleAttributeValue(type.name, item)}
				key={index}
				className={
					selectedAttributes[type.name] && selectedAttributes[type.name].id === item.id
						? 'size-box size-box-active copy-disable'
						: 'size-box copy-disable'
				}
			>
				{item.displayValue}
			</button>
		));
	};

	renderProductAttribute = () => {
		const { product } = this.props;
		return (
			product.attributes.length > 0 &&
			product.attributes.map((type, index) => (
				<div key={index} className='right-size'>
					<h4 className='right-size-text'>{type.name}</h4>
					<div className='right-sizes'>
						{product.attributes.length > 0 && product.attributes[index].name === 'Color'
							? this.renderColor(type, index)
							: this.renderNormal(type, index)}
					</div>
				</div>
			))
		);
	};
	render() {
		return this.renderProductAttribute();
	}
}
