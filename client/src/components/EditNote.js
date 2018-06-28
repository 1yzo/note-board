import React from 'react';
import { connect } from 'react-redux';
import { setSelected, editSelected } from '../actions/selectedNote';
import { editNote, addNote } from '../actions/notes';
import '../styles/note.css';
import '../styles/button.css';

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
            this.props.dispatch(addNote({ 
                ...edits
            }));
            this.props.dispatch(setSelected(null));
        } else {
            this.props.dispatch(editNote(reqBody));
            this.props.dispatch(setSelected(null));
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

    handleKeyPress = (e) => {
        if (e.keyCode === 27) {
            this.handleCancel();
        } else if (e.keyCode === 13) {
            this.handleSave();
        }
    }
    
    componentDidMount() {
        this.setState(() => ({undoNote: this.props.note}));
        window.addEventListener('keyup', this.handleKeyPress, false);
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleKeyPress, false);        
    }
    
    render() {
        return (
            <div className={'note note--edit' + (this.props.isExpanded ? ' note--expanded' : '')}>
                <i className="material-icons button--icon" onClick={this.handleCancel}>clear</i>
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
                <textarea
                    type="text"
                    name="content"
                    value={this.props.note.content}
                    placeholder="content"
                    onChange={this.handleChange}
                />
                <i className="material-icons button--icon" onClick={this.handleSave} style={{ alignSelf: 'end'}}>done</i>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    note: state.selectedNote
});

export default connect(mapStateToProps)(EditNote);