import React from 'react';
import { connect } from 'react-redux';
import '../styles/container.css';
import '../styles/header.css';
import { setSelected } from '../actions/selectedNote';


const Header = (props) => (
    <div className="header">
        <div className="container">
            <div className="header__content">
                <h1>NotePage</h1>
                <i 
                    className="material-icons"
                    onClick={() => {
                        props.dispatch(setSelected({
                            isAdding: true,
                            title: '',
                            author: '',
                            content: ''
                        }))
                    }}
                >
                    add_circle
                </i>
            </div>
        </div>
    </div>
);

export default connect()(Header);