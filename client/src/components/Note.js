import React from 'react';
import { connect } from 'react-redux';
import { setSelected } from '../actions/selectedNote';
import { startDeleteNote } from '../actions/notes';
import '../styles/note.css';

const Note = (props) => {
    return (
        <div className="note">
            <i className="material-icons" onClick={() => props.dispatch(startDeleteNote(props.note._id))}>clear</i>
            <div onClick={() => props.dispatch(setSelected(props.note))}>
                <div className="note__title">{props.note.title}</div>
                <div>{props.note.author}</div>
                <div>{props.note.content}</div>
            </div>
        </div>
    );
}

export default connect()(Note);