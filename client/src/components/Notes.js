import React from 'react';
import { connect } from 'react-redux';
import Note from './Note';
import EditNote from './EditNote';
import { setSelected } from '../actions/selectedNote';
import '../styles/container.css';

class Notes extends React.Component {
    getExtraDivs = () => {
        const extras = [];
        const extraCount = this.props.notes.length % 4;
        for (let i = 0; i < extraCount; i++) {
            extras.push(<div key={i} style={{ width: '27rem', height: 0}} />);
        }
        return extras;
    }
    
    render() {
        return (
            <div className="container">
                <div className="notes__container">
                    {this.props.notes.map((note) => {
                        return <Note key={note._id} note={note} />;
                    })} 
                    {this.getExtraDivs()}
                </div>
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