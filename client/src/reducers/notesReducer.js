export default (state = [], action) => {
    switch (action.type) {
        case 'SET_NOTES':
            return action.notes;
        case 'ADD_NOTE':
            return [action.note, ...state];
        case 'EDIT_NOTE':
            return state.map((note) => {
                if (note._id === action.id) {
                    return {
                        ...note,
                        ...action.edits
                    };
                } else {
                    return note;
                }
            });
        case 'DELETE_NOTE':
            return state.filter((note) => {
                return note._id !== action.id;
            });
        default:
            return state;
    }
}