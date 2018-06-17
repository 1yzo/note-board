import React from 'react';
import { connect } from 'react-redux';
import Note from './Note';
import EditNote from './EditNote';
import '../styles/container.css';

class Notes extends React.Component {
    state = {
        childExpanded: false,
        expandedChildId: undefined
    }

    toggleChildExpand = (childId) => {
        this.setState((prevState) => ({ 
            childExpanded: !prevState.childExpanded,
            expandedChildId: childId
        }));
    }
    
    getExtraDivs = () => {
        if (!this.state.childExpanded) {
            const extras = [];
            const extraCount = (this.props.notes.length % 4) + 1;
            for (let i = 0; i < extraCount; i++) {
                extras.push(<div key={i} style={{ width: '27rem', height: 0}} />);
            }
            return extras;
        }
    }
    
    render() {
        return (
            <div className="container">
                <div className="notes__container">
                    {(this.props.selectedNote !== null && this.props.selectedNote.isAdding) && <EditNote />}
                    {this.props.notes.map((note) => {
                        return <Note
                                    key={note._id} 
                                    note={note} 
                                    toggleExpand={this.toggleChildExpand}
                                    siblingExpanded={this.state.childExpanded}
                                    expandedSiblingId={this.state.expandedChildId}
                                 />;
                    })} 
                    {this.getExtraDivs()}
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