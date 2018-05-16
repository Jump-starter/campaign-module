import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class About extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			aboutInfo: ''
		}
	}

	componentDidMount() {
		let context = this;
		axios.get(`${this.props.url}/about/${this.props.projectId}`)
		.then(result => {
			context.setState({aboutInfo: result.data});
		})
		.catch(err => {
			console.log('ERROR', err);
		})
	}

	render() {
		console.log('test===', this.props.url)
		return (
			<div id="about-master-container">
				<div id="about-container">
					<h1 id="about-header" className="section-header">About</h1>
					<div id="about-info">{this.state.aboutInfo}</div>
				</div>
			</div>
		)
	}
}

export default About;
