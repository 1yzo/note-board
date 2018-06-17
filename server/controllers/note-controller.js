const Note = require('../models/note-model');

require('../mongo').connect();

get = (req, res) => {
    Note.find({}).read().exec()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).send(err));
};

getSingle = (req, res) => {
    const { id } = req.params;
    Note.findById(id)
        .then((note) => res.json(note))
        .catch((err) => res.status(404).send(err));
};

create = (req, res) => {
    const { title, author, content } = req.body;
    const note = new Note({
        title,
        author,
        content
    });

    note.save()
        .then(() => res.json(note))
        .catch(err => res.status(500).send(err));
};

update = (req, res) => {
    const { id, edits } = req.body;
    Note.where({ _id: id }).update({...edits})
        .then(() => res.json({_id, ...edits}))
        .catch(err => res.status(500).send(err));
};

deleteNote = (req, res) => {
    const { id } = req.params;

    Note.findOneAndRemove({ _id: id })
        .then(note => res.json(note))
        .catch(err => res.status(500).send(err));
}

module.exports = {
    get,
    getSingle,
    create,
    update,
    deleteNote
};