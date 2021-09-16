const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
	title: { type: String, required: true },
	details: { type: String, required: false },
	category: { type: String, required: true },
	favorite: Boolean
})

module.exports = mongoose.model('Note', noteSchema)