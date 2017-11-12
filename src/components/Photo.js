import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../components/Photo.css';

class Photo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			photo: {}
		}
	}

	componentWillMount() {
		this.getPhoto()	
	}

	getPhoto() {
		const photoId = this.props.match.params.id;
		const URL = `https://jsonplaceholder.typicode.com/photos/${photoId}`;

		fetch(URL)
		.then( (response) => {
			return response.json()
		})
		.then((json) => {
			this.setState({
				photo: json
			});
		});
	}
	
	render() {
		return (
			<div>
				<Link to={'/'} title='Return to photos page'>Back to photos</Link>
				<div className='photo-main'>
					<div className='photo'>
						<img className='photo-image'src={this.state.photo.url}
							title={this.state.photo.title} alt={''} />

						<div className='photo-title'>{this.state.photo.title}</div>
					</div>
				</div>
			</div>
        )
	};
}

export default Photo;