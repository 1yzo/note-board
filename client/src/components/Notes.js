import React from 'react';
import { connect } from 'react-redux';
import Note from './Note';
import EditNote from './EditNote';
import { setSelected } from '../actions/selectedNote';
import '../styles/container.css';

class Notes extends React.Component {
    render() {
        return (
            <div className="container">
                {this.props.notes.map((note) => {
                    return <Note key={note._id} note={note} />;
                })}
                <div>
                    <button 
                        onClick={() => {
                            this.props.dispatch(setSelected({
                                isAdding: true,
                                title: '',
                                author: '',
                                content: ''
                            }))
                        }}
                    >
                         Add Note
                    </button>
                    {this.props.selectedNote !== null && <EditNote />}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    notes: state.notes,
    selectedNote: state.selectedNote
});

export default connect(mapStateToProps)(Notes);