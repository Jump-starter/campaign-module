import React from 'react';
import ReactDOM from 'react-dom';
import About from './components/About.jsx';
import Support from './components/Support.jsx';

class Campaign extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			projectId: this.props.projectId,
		}
	}

	render() {
		return (
			<div id="app-container">
				<About projectId={this.props.projectId} url={this.props.url} />
				<Support projectId={this.props.projectId} url={this.props.url} />
			</div>
		)
	}
}

export default Campaign;
