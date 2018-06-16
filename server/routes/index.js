const express = require('express');
const router = express.Router();

const noteController = require('../controllers/note-controller');

// Get all
router.get('/notes', (req, res, next) => {
    noteController.get(req, res);
});
// Get single by ID
router.get('/note/:id', (req, res, next) => {
    noteController.getSingle(req, res);
});
// Create 
router.post('/note', (req, res, next) => {
    noteController.create(req, res);
});
// Update
router.put('/note', (req, res, next) => {
    noteController.update(req, res);
});
// Delete
router.delete('/note/:id', (req, res, next) => {
    noteController.deleteNote(req, res);
});

module.exports = router;