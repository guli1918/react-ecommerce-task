import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './notFoundPage.css';

export default class NotFoundPage extends Component {
	render() {
		return (
			<div className='notFoundPage'>
				<div className='notFoundPage-text'>
					<span>404</span>
					<h3>Page Not Found!</h3>
					<p className='notFoundPage-text-1'>
						Woops. Looks like this page doesn't exist.
					</p>
					<Link className='notFoundPage-link' to='/'>
						<p>↻ Go to Homepage</p>
					</Link>
				</div>
			</div>
		);
	}
}
