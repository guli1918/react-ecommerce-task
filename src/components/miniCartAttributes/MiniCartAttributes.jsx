import React, { PureComponent } from 'react';

export default class MiniCartAttributes extends PureComponent {
	renderSelectedAttributes = () => {
		const { item } = this.props;
		return Object.values(item.selectedAttributes).length > 0 ? (
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
						{attributes.value.startsWith('#') ? '' : attributes.value}
					</p>
				</div>
			))
		) : (
			<div className='miniCard-left-attribute'>
				<p>DFLT</p>
			</div>
		);
	};
	render() {
		return <div className='minicard-left-attributes'>{this.renderSelectedAttributes()}</div>;
	}
}
