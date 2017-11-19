import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../components/PhotoBrowser.css';
import { photos } from '../utils/photos-api'
import Pagination from "react-js-pagination";

class PhotoBrowser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			photos: [],
			total: 0,
			limit: 250,
			activePage: 1,
		}
	}

	componentWillMount() {
		this.getPhotos()	
	}

	getPhotos() {
		let limit = this.state.limit;
		let start = (this.state.activePage - 1) * limit;
		photos(start, limit).then((response) => {
			this.setState({
				total: response.total,
				photos: response.photos,
			});
		})
	}

	handlePageChange = (pageNumber) => {
		this.setState({
			activePage: pageNumber
		}, () => {
			this.getPhotos()
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
				<h1>Photo Browser</h1>
				<p>Click thumbnail see full size photo!</p>
				<div className="photo-pagination">
					<Pagination
						hideDisabled
						activePage={this.state.activePage}
						itemsCountPerPage={this.state.skip}
						totalItemsCount={this.state.total}
						onChange={this.handlePageChange}
					/>
				</div>
				<ul className='photo-list'>
					{photos}
				</ul>
            </div>
        )
	};
}

export default PhotoBrowser;