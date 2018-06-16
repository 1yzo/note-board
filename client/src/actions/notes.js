export const setNotes = (notes = []) => ({
    type: 'SET_NOTES',
    notes
});

export const startSetNotes = () => {
    return (dispatch) => {
        return fetch('api/notes')
            .then(res => res.json())
            .then(res => {
                dispatch(setNotes(res));
            });
    }
};

export const editNote = (id, edits) => ({
    type: 'EDIT_NOTE',
    id,
    edits
});

export const deleteNote = (id) => ({
    type: 'DELETE_NOTE',
    id
});

export const startDeleteNote = (id) => {
    return (dispatch) => {
        return fetch(`/api/note/${id}`, { method: 'DELETE' })
            .then(() => {
                dispatch(deleteNote(id));
            });
        
    };
};

export const addNote = (note) => ({
    type: 'ADD_NOTE',
    note
});

export const startAddNote = (note) => {
    return (dispatch) => {
        return fetch('api/note', {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'content-type': 'application/json'
            }
        }).then((res) => res.json()).then((note) => dispatch(addNote(note)));
    }
};