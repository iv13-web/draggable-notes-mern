import {createSlice} from '@reduxjs/toolkit'

export const initialState = {
	notes: [],
	createdNote: {
		title: '',
		details: '',
		category: 'reminders'
	}
}

const notesSlice = createSlice({
	name: 'notes',
	initialState,
	reducers: {
		storeNotes: (state, action) => {
			state.notes = [...action.payload]
		},
		moveNotes: (state, action) => {
			state.notes = [...action.payload]
		},
		addNotesToFavorite: (state, action) => {
			const noteId = action.payload
			const index = state.notes.findIndex(note => note._id === noteId)
			state.notes[index].favorite = !state.notes[index].favorite
		},
		deleteNote: (state, action) => {
			const noteId = action.payload
			state.notes.filter(note => note._id !== noteId)
		},
		createNote: (state, action) => {
			const {title, details, category} = action.payload
			state.createdNote = {title, details, category}
		}
	}
})

export default notesSlice.reducer
export const {
	storeNotes,
	moveNotes,
	addNotesToFavorite,
	deleteNote,
	createNote
} = notesSlice.actions