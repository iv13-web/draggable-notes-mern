require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose =require('mongoose')
const notesRoutes = require('./routes/notes-routes')

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	)
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE')
	next()
})

app.use('/', notesRoutes)

mongoose
	.connect(`mongodb+srv://igor:${process.env.DB_PASSWORD}@cluster0.gqgi8.mongodb.net/draggableNotes?retryWrites=true&w=majority`)
	.then(() => app.listen(5001))
	.catch(e => console.log(e))
