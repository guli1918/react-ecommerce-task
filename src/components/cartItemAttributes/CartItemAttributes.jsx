import React, { PureComponent } from 'react';

export default class CartItemAttributes extends PureComponent {
	renderSelectedAttributes = () => {
		const { item } = this.props;
		return Object.values(item.selectedAttributes).map((attributes, index) => (
			<div
				key={index}
				className='card-product-left-attribute'
				style={{
					backgroundColor:
						attributes.value.startsWith('#') && attributes.id !== 'Black'
							? 'light' + attributes.id
							: attributes.id,
				}}
			>
				<p>
					{attributes.value.startsWith('#') ? (
						''
					) : attributes.value === 'Yes' || attributes.value === 'No' ? (
						<div className='card-product-left-attribute-yesNo-main'>
							<span className='card-product-left-attribute-yesNo'>
								{attributes.value === 'No' && (
									<div className='card-product-left-attribute-cross1' />
								)}
								{Object.keys(item.selectedAttributes)[index]}
								{attributes.value === 'No' && (
									<div className='card-product-left-attribute-cross2' />
								)}
							</span>
						</div>
					) : (
						attributes.value
					)}
				</p>
			</div>
		));
	};
	render() {
		return (
			<div className='card-product-left-attributes copy-disable'>
				{this.renderSelectedAttributes()}
			</div>
		);
	}
}
