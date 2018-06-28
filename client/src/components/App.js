import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notes from './Notes';
import '../styles/container.css';
import { startSetNotes } from '../actions/notes';
import Header from './Header';

class App extends Component {
	componentDidMount() {
		// this.props.dispatch(startSetNotes());
	}

	render() {
		return (
    		<div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
				<Header />
				<Notes />
      		</div>
    	);
 	}
}

export default connect()(App);
