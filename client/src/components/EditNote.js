import React from 'react';
import { connect } from 'react-redux';
import { setSelected, editSelected } from '../actions/selectedNote';
import { editNote, startAddNote } from '../actions/notes';

class EditNote extends React.Component {
    state = {
        undoNote: {}
    };

    handleSave = () => {
        const { isAdding = false, _id: id = '', __v, ...edits } = this.props.note;
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
        const {__v, _id: id, ...edits} = this.state.undoNote;
        this.props.dispatch(editNote(id, edits));
        this.props.dispatch(setSelected(null));
    }

    handleChange = (e) => {
        const edits = {};
        edits[e.target.name] = e.target.value;
        this.props.dispatch(editSelected(edits));
        this.props.dispatch(editNote(this.props.note._id, edits));
    }
    componentDidMount() {
        this.setState(() => ({undoNote: this.props.note}));
    }

    
    render() {
        return (
            <div>
                <div>
                    <label>author: </label>
                    <input 
                        type="text"
                        name="author"
                        value={this.props.note.author}
                        placeholder="author"
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <label>title: </label>
                    <input 
                        type="text"
                        name="title"
                        value={this.props.note.title}
                        placeholder="title"
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <label>content: </label>
                    <input 
                        type="text"
                        name="content"
                        value={this.props.note.content}
                        placeholder="content"
                        onChange={this.handleChange}
                    />
                </div>
                <button onClick={this.handleSave}>Save</button>
                <button onClick={this.handleCancel}>Cancel</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    note: state.selectedNote
});

export default connect(mapStateToProps)(EditNote);