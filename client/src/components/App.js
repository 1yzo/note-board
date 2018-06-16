import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notes from './Notes';
import { startSetNotes } from '../actions/notes';

class App extends Component {
	state = {
		testResult: '' 
	}

	componentDidMount() {
		this.props.dispatch(startSetNotes());
	}

	render() {
		return (
    		<div>
				<h1>Noteboard</h1>
				<Notes />
      		</div>
    	);
 	}
}

export default connect()(App);
