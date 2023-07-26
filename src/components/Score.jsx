import React, { Component } from 'react';

export default class Score extends Component {
	render() {
		const { score } = this.props;
		return (
			<div>
				<h2>Results</h2>
				<h4>Your score: {score}</h4>
			</div>
		);
	}
}
