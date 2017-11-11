import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PhotoBrowser from './components/PhotoBrowser';
import Photo from './components/Photo';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Route exact path='/' component={PhotoBrowser} />
					<Route path='/photo/:id' component={Photo} />
				</div>
			</BrowserRouter>
		);
	}	
}

export default App;
