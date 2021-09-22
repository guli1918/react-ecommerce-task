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
						<>
							<span className='card-product-left-attribute-yesNo'>
								{Object.keys(item.selectedAttributes)[index]}
							</span>
						</>
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
