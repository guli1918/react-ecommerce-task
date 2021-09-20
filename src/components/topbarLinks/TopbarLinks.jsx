import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export default class TopbarLinks extends PureComponent {
	state = {
		currency: 'USD',
		activePage: window.location.href.split('/')[3],
		location1: null,
		location2: null,
	};
	render() {
		const { activePage } = this.state;
		return (
			<ul className='left-list'>
				<li>
					<Link
						key='1'
						onClick={() => {
							this.setState({
								activePage: '',
							});
						}}
						className={activePage === '' ? 'link link-active' : 'link'}
						to='/'
					>
						ALL
					</Link>
				</li>
				<li>
					<Link
						onClick={() => {
							this.setState({
								activePage: 'clothes',
							});
						}}
						className={activePage === 'clothes' ? 'link link-active' : 'link'}
						to='/clothes'
					>
						CLOTHES
					</Link>
				</li>
				<li>
					<Link
						onClick={() => {
							this.setState({
								activePage: 'tech',
							});
						}}
						className={activePage === 'tech' ? 'link link-active' : 'link'}
						to='/tech'
					>
						TECH
					</Link>
				</li>
			</ul>
		);
	}
}
