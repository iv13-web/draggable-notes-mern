const Note = require('../models/notes')
const HttpError = require('../models/http-error')

const createNote = async (req, res) => {
	const createdNote = new Note({
		title: req.body.title,
		details: req.body.details,
		category: req.body.category,
		favorite: false,
	})
	const result = await createdNote.save()
	res.json(result)
}

const getNotes = async (req, res, next) => {
	let notes
	try {
		notes = await Note.find().exec()
	} catch (e) {
		return next(new HttpError('Could not get notes', 500))
	}
	res.status(200).json(notes)
}

const updateNotesOrder = async (req, res, next) => {
	const notes = req.body
	try {
		await Note.deleteMany({})
	} catch (e) {
		return next(new HttpError('Could not remove notes', 500))
	}
	try {
		await Note.insertMany(notes)
	} catch (e) {
		return next(new HttpError('Could not insert notes', 500))
	}
	res.status(200).json(notes)
}

const deleteNoteById = async (req, res, next) => {
	const noteId = req.params.nid
	try {
		await Note.findByIdAndDelete(noteId)
	} catch (e) {
		return next(new HttpError('Could not delete resource', 500))
	}
	res.status(200).json('resource deleted successfully')
}

const addNoteToFavorite = async (req, res, next) => {
	const noteId = req.params.nid
	try {
		const note = await Note.findById(noteId)
		note.favorite = !note.favorite
		await note.save()
	} catch (e) {
		return next(new HttpError('Could not delete resource', 500))
	}
	res.status(200).json('resource updated successfully')
}

const getFavoriteNotes = async (req, res, next) => {
	let favoriteNotes
	try {
		favoriteNotes = await Note.find({favorite: true}).exec()
	} catch (e) {
		return next(new HttpError('Could not get favorite notes', 500))
	}
	res.status(200).json(favoriteNotes)
}

exports.getNotes = getNotes
exports.createNote = createNote
exports.updateNotesOrder = updateNotesOrder
exports.deleteNoteById = deleteNoteById
exports.addNoteToFavorite = addNoteToFavorite
exports.getFavoriteNotes = getFavoriteNotes

