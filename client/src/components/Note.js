import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { setSelected } from '../actions/selectedNote';
import { startDeleteNote } from '../actions/notes';
import '../styles/note.css';
import moment from 'moment';
import EditNote from './EditNote';

class Note extends React.Component {
    state = {
        isOverflowing: false
    };

    checkOverflow = (prevState = 'false') => {
        const ref = ReactDOM.findDOMNode(this.contentRef);
        if (ref) {
            if (ref.clientHeight > 109) {
                if (prevState.isOverflowing !== true) {
                    this.setState((prevState) => ({ isOverflowing : true }));
                }
            } else {
                if (prevState.isOverflowing !== false) {
                    this.setState((prevState) => ({ isOverflowing : false }));
                }
            }
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
            return <EditNote />;
        } else {
            return (
                <div className="note">
                    <div className="note__top-actions">
                        <i 
                            style={{marginRight: '3rem'}}
                            className="material-icons" 
                            onClick={() => this.props.dispatch(startDeleteNote(this.props.note._id))}
                        >
                            clear
                        </i>
                        {this.state.isOverflowing && <p>-></p>}
                    </div>
                    <div onClick={() => this.props.dispatch(setSelected(this.props.note))} style={{ width: '100%', height: '170px'}}>
                        <div className="note__title">{this.props.note.title}</div>
                        <div className="note__date">{moment(this.props.note.date).format('LL')}</div>
                        <div
                            ref={el => {this.contentRef = el}}
                            className="note__content"
                        >{this.props.note.content}</div>
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