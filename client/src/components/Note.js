import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { setSelected } from '../actions/selectedNote';
import { deleteNote } from '../actions/notes';
import '../styles/note.css';
import '../styles/button.css';
import moment from 'moment';
import EditNote from './EditNote';

class Note extends React.Component {
    state = {
        isOverflowing: false,
        isExpanded: false
    };

    checkOverflow = (prevState = 'false') => {
        const ref = ReactDOM.findDOMNode(this.contentRef);
        if (ref) {
            if (ref.clientHeight > 109) {
                if (prevState.isOverflowing !== true) {
                    this.setState((prevState) => ({ isOverflowing : true }));
                }
            } else {
                if (ref.clientHeight <= 109) {
                    if (prevState.isOverflowing !== false) {
                        this.setState((prevState) => ({ isOverflowing : false }));
                    }
                }
            }
        }
    }

    handleTransitionEnd = (e) => {
        if (e.target.classList.contains('note') && !e.target.classList.contains('note--expanded')) {
            this.checkOverflow();
        }
    }

    componentDidMount() {
        this.checkOverflow();
    }

    componentDidUpdate(prevProps, prevState) {
        this.checkOverflow(prevState)
    }
    
    render() {
        if (this.props.selectedNote && this.props.selectedNote._id === this.props.note._id) {
            return <EditNote isExpanded={this.state.isExpanded}/>;
        } else {
            return (
                <div 
                    className={'note' + (this.state.isExpanded ? ' note--expanded' : '')}
                    style={{display: this.props.siblingExpanded && (this.props.expandedSiblingId !== this.props.note._id) && 'none'}}
                    onTransitionEnd={this.handleTransitionEnd}
                >
                    <div className="note__top-actions">
                        <i 
                            style={{marginRight: '3rem'}}
                            className="material-icons button--icon" 
                            onClick={() => this.props.dispatch(deleteNote(this.props.note._id))}
                        >
                            clear
                        </i>
                        {
                            (this.state.isOverflowing || this.state.isExpanded) &&  
                            <i 
                                className={"material-icons button--icon arrow" + (this.state.isExpanded ? ' arrow--expanded' : '')} 
                                onClick={() => {
                                    this.setState((prevState) => ({ isExpanded: !prevState.isExpanded }));
                                    this.props.toggleExpand(this.props.note._id);
                                }}
                            >
                                expand_more
                            </i>
                        }
                    </div>
                    <div onClick={() => this.props.dispatch(setSelected(this.props.note))} style={{ width: '100%'}}>
                        <div className="note__title">{this.props.note.title}</div>
                        <div className="note__date">{moment(this.props.note.date).format('LL')}</div>
                        <div
                            ref={el => {this.contentRef = el}}
                            className="note__content"
                            
                        >
                            {this.props.note.content}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    selectedNote: state.selectedNote
});

export default connect(mapStateToProps)(Note);