const express = require('express')
const router = express.Router()
const {getNotes, createNote, updateNotesOrder, deleteNoteById, addNoteToFavorite, getFavoriteNotes} = require('../controllers/notes-controllers')


router.get('/', getNotes)
router.put('/', updateNotesOrder)
router.delete('/:nid', deleteNoteById)
router.patch('/:nid', addNoteToFavorite)
router.post('/create', createNote)
router.get('/favorite', getFavoriteNotes)

// router.get('/:nid')
// router.patch('/:nid')

module.exports = router