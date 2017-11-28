import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { photo } from '../utils/photos-api'
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
        let photoId = this.props.match.params.id;
        photo(photoId).then((photo) => {
            this.setState({
                photo: photo
            });
        })
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
	}
}

export default Photo;