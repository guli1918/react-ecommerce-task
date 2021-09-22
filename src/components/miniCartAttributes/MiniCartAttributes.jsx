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
					<p className='miniCard-left-attribute-text'>
						{attributes.value.startsWith('#') ? (
							''
						) : (
							<p>
								{attributes.value.startsWith('#') ? (
									''
								) : attributes.value === 'Yes' || attributes.value === 'No' ? (
									<>
										<span className='miniCard-product-left-attribute-yesNo'>
											{Object.keys(item.selectedAttributes)[index].slice(
												0,
												9
											)}
										</span>
									</>
								) : (
									attributes.value
								)}
							</p>
						)}
					</p>
				</div>
			))
		);
	};
	render() {
		return <div className='minicard-left-attributes'>{this.renderSelectedAttributes()}</div>;
	}
}
