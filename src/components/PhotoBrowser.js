import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../components/PhotoBrowser.css';

class PhotoBrowser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			photos: [],
			total: 0,
			skip: 100,
		}
	}

	componentWillMount() {
		this.readPhotos();	
	}

	readPhotos() {
		const URL = 'https://jsonplaceholder.typicode.com/photos?_start=0&_limit=500';
		fetch(URL)
		.then( (response) => {
			let total = response.headers.get('x-total-count')
			this.setState({
				total: total
			});
			return response.json()
		})
		.then((json) => {
			this.setState({
				photos: json
			});
		});
	}

	render() {
		let photos = this.state.photos.map(function(photo, i) {
			return (
				<li key={i} className='photo-item'>
					<Link to={`/photo/${photo.id}`}>
						<img src={photo.thumbnailUrl} title={photo.title} alt={''} />
					</Link>
				</li>
			)
		})
		return (
            <div className='photos-main'>
				<ul className='photo-list'>
					{photos}
				</ul>
            </div>
        )
	};
}

export default PhotoBrowser;