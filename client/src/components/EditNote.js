import React from 'react';
import { connect } from 'react-redux';
import { setSelected, editSelected } from '../actions/selectedNote';
import { editNote, startAddNote } from '../actions/notes';
import '../styles/note.css';

class EditNote extends React.Component {
    state = {
        undoNote: {}
    };

    handleSave = () => {
        const { isAdding = false, _id: id = '', __v, date, ...edits } = this.props.note;
        const reqBody = { 
            id,
            edits
        };
        if (!!isAdding) {
            this.props.dispatch(startAddNote({ 
                ...edits
            })).then(() => this.props.dispatch(setSelected(null)));
        } else {
            fetch('api/note', {
                method: 'PUT',
                body: JSON.stringify(reqBody),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(() => this.props.dispatch(setSelected(null)));
        }   
    }

    handleCancel = () => {
        const {__v, _id: id, date, ...edits} = this.state.undoNote;
        this.props.dispatch(editNote(id, edits));
        this.props.dispatch(setSelected(null));
    }

    handleChange = (e) => {
        const edits = {};
        edits[e.target.name] = e.target.value;
        this.props.dispatch(editSelected(edits));
        if (!this.props.isAdding) {
            this.props.dispatch(editNote(this.props.note._id, edits));
        }
    }

    handleEscape = (e) => {
        if (e.keyCode === 27) {
            this.handleCancel();
        }
    }
    
    componentDidMount() {
        this.setState(() => ({undoNote: this.props.note}));
        window.addEventListener('keyup', this.handleEscape, false);
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleEscape, false);        
    }
    
    render() {
        return (
            <div className='note note--edit'>
                <i className="material-icons" onClick={this.handleCancel}>clear</i>
                <div>
                    <input 
                        type="text"
                        name="title"
                        value={this.props.note.title}
                        placeholder="Title"
                        onChange={this.handleChange}
                        autoFocus
                    />  
                </div>
                <div>
                    <textarea
                        type="text"
                        name="content"
                        value={this.props.note.content}
                        placeholder="content"
                        onChange={this.handleChange}
                    />
                </div>
                <i className="material-icons" onClick={this.handleSave} style={{ alignSelf: 'end'}}>done</i>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    note: state.selectedNote
});

export default connect(mapStateToProps)(EditNote);