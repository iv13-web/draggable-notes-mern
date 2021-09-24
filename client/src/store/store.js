import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import {notesApi} from './notesApi'
import notesSlice from './notesSlice'

// const localStorageMiddleware = store => next => action => {
// 	const result = next(action)
// 	// condition for linksSlice.actions
// 	// if (setLinks.match(action)) {
// 	// 	const links = store.getState().links
// 	// 	localStorage.setItem('pages', JSON.stringify(links))
// 	// }
// 	return result
// }

export const store = configureStore({
	reducer: {
		auth: authSlice,
		notes: notesSlice,
		[notesApi.reducerPath]: notesApi.reducer
	},
	// middleware: (getDefaultMiddleware) => {
	// 	return getDefaultMiddleware().concat(localStorageMiddleware)
	// }
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(notesApi.middleware)
	}
})

