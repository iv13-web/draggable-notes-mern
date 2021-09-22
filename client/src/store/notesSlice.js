import {createSlice} from '@reduxjs/toolkit'

export const initialState = {
	notes: [],
	createdNote: {
		title: '',
		details: '',
		category: 'reminders',
	},
	isMoving: false
}

const notesSlice = createSlice({
	name: 'notes',
	initialState,
	reducers: {
		storeNotes: (state, action) => {
			state.notes = [...action.payload]
		},
		addNotesToFavorite: (state, action) => {
			const noteId = action.payload
			const index = state.notes.findIndex(note => note._id === noteId)
			state.notes[index].favorite = !state.notes[index].favorite
		},
		deleteNote: (state, action) => {
			const noteId = action.payload
			state.notes = [...state.notes.filter(note => note._id !== noteId)]
		},
		createNote: (state, action) => {
			const {title, details, category} = action.payload
			state.createdNote = {title, details, category}
		},
		isMoving: (state, action) => {
			state.isMoving = action.payload
		},
	}
})

export default notesSlice.reducer
export const {
	storeNotes,
	moveNotes,
	addNotesToFavorite,
	deleteNote,
	createNote,
	isMoving,
} = notesSlice.actions