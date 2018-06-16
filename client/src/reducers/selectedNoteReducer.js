export default  (state = null, action) => {
    switch (action.type) {
        case 'SET_SELECTED':
            //should be immutable but im checking for null to conditionally render EditNote
            return action.selectedNote;
        case 'EDIT_SELECTED':
            return {
                ...state,
                ...action.edits
            };
        default:
            return state;
    }
};