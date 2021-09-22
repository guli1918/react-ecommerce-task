import React, { PureComponent } from 'react';

export default class MiniCartAttributes extends PureComponent {
	renderSelectedAttributes = () => {
		const { item } = this.props;
		return (
			Object.values(item.selectedAttributes).length > 0 &&
			Object.values(item.selectedAttributes).map((attributes, index) => (
				<div
					key={index}
					className='miniCard-left-attribute'
					style={{
						backgroundColor:
							attributes.value.startsWith('#') && attributes.id !== 'Black'
								? 'light' + attributes.id
								: attributes.id,
					}}
				>
					<div className='miniCard-left-attribute-text'>
						{attributes.value.startsWith('#') ? (
							''
						) : (
							<>
								{attributes.value.startsWith('#') ? (
									''
								) : attributes.value === 'Yes' || attributes.value === 'No' ? (
									<div className='miniCard-product-left-attribute-yesNo-main'>
										<span className='miniCard-product-left-attribute-yesNo'>
											{attributes.value === 'No' && (
												<div className='miniCard-product-left-attribute-cross1' />
											)}
											{Object.keys(item.selectedAttributes)[index].slice(
												0,
												9
											)}
											{attributes.value === 'No' && (
												<div className='miniCard-product-left-attribute-cross2' />
											)}
										</span>
									</div>
								) : (
									attributes.value
								)}
							</>
						)}
					</div>
				</div>
			))
		);
	};
	render() {
		return <div className='minicard-left-attributes'>{this.renderSelectedAttributes()}</div>;
	}
}
