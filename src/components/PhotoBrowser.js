import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../components/PhotoBrowser.css';
import Pagination from "react-js-pagination";

class PhotoBrowser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			photos: [],
			total: 0,
			skip: 250,
			activePage: 1,
		}
	}

	componentWillMount() {
		this.readPhotos()
	}

	readPhotos() {
		let limit = this.state.skip;
		let start = (this.state.activePage - 1) * limit;
		const URL = `https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`;
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

	handlePageChange = (pageNumber) => {
		this.setState({
			activePage: pageNumber
		}, () => {
			this.readPhotos() 
		});
	}

	render() {
		let photos = this.state.photos.map((photo, i) => {
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
				<div className="photo-pagination">
					<Pagination
						hideDisabled
						activePage={this.state.activePage}
						itemsCountPerPage={this.state.skip}
						totalItemsCount={this.state.total}
						onChange={this.handlePageChange} />
				</div>
				
				<ul className='photo-list'>
					{photos}
				</ul>
            </div>
        )
	};
}

export default PhotoBrowser;