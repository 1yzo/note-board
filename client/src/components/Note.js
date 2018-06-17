import React from 'react';
import { connect } from 'react-redux';
import { setSelected } from '../actions/selectedNote';
import { startDeleteNote } from '../actions/notes';
import '../styles/note.css';

const Note = (props) => {
    return (
        <div className="note" onClick={() => props.dispatch(setSelected(props.note))}>
            <i className="material-icons" onClick={() => props.dispatch(startDeleteNote(props.note._id))}>clear</i>
            <div>
                <div className="note__title">{props.note.title}</div>
                <div>{props.note.date}</div>
                <div>{props.note.content}</div>
            </div>
        </div>
    );
}

export default connect()(Note);