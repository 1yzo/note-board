export const setSelected = (note = null) => ({
    type: 'SET_SELECTED',
    selectedNote: note
});

export const editSelected = (edits) => ({
    type: 'EDIT_SELECTED',
    edits
});