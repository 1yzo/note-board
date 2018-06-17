import React from 'react';
import { connect } from 'react-redux';
import { setSelected } from '../actions/selectedNote';
import { startDeleteNote } from '../actions/notes';
import '../styles/note.css';
import moment from 'moment';
import EditNote from './EditNote';

const Note = (props) => {
    if (props.selectedNote && props.selectedNote._id === props.note._id) {
        return <EditNote />;
    } else {
        return (
            <div className="note">
                <i className="material-icons" onClick={() => props.dispatch(startDeleteNote(props.note._id))}>clear</i>
                <div onClick={() => props.dispatch(setSelected(props.note))} style={{ width: '100%', height: '170px'}}>
                    <div className="note__title">{props.note.title}</div>
                    <div className="note__date">{moment(props.note.date).format('LL')}</div>
                    <div className="note__content">{props.note.content}</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedNote: state.selectedNote
});

export default connect(mapStateToProps)(Note);