import React from 'react';
import { connect } from 'react-redux';
import { setSelected } from '../actions/selectedNote';
import { startDeleteNote } from '../actions/notes';

const Note = (props) => {
    return (
        <li>
            <button onClick={() => props.dispatch(startDeleteNote(props.note._id))}>Delete</button>
            <div onClick={() => props.dispatch(setSelected(props.note))}>
                <div>{props.note.title}</div>
                <div>{props.note.author}</div>
                <div>{props.note.content}</div>
            </div>
        </li>
    );
}

export default connect()(Note);