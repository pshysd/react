import React, { Component } from 'react';

class WordRelay extends Component {
	state = {
		text: 'Hello, Webpack',
	};

	render() {
		return <div>{this.state.text}</div>;
	}
}

export default WordRelay;
