import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const notesApi = createApi({
	reducerPath: 'notesApi',
	tagTypes: ['Notes'],
	baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5001'}),
	endpoints: (build) => ({
		getNotes: build.query({
			query: (type) => `/${type}`,
			providesTags: (result) => result
				?	[
						...result.map(({id}) => ({type: 'Notes', id})),
						{type: 'Notes', id: 'List'}
					]
				: [{type: 'Notes', id: 'List'}]
		}),
		changeNotesOrder: build.mutation({
			query: (body) => ({
				url: '/',
				method: 'PUT',
				body
			})
		}),
		deleteNote: build.mutation({
			query: (noteId) => ({
				url: `/${noteId}`,
				method: 'DELETE',
			}),
			invalidatesTags: [{type: 'Notes', id: 'List'}]
		}),
		saveNote: build.mutation({
			query: (noteId) => ({
				url: `/${noteId}`,
				method: 'PATCH',
			}),
			invalidatesTags: [{type: 'Notes', id: 'List'}]
		}),
		createNote: build.mutation({
			query: (body) => ({
				url: `/create`,
				method: 'POST',
				body
			}),
			invalidatesTags: [{type: 'Notes', id: 'List'}]
		})
	})
})

export const {
	useGetNotesQuery,
	useChangeNotesOrderMutation,
	useDeleteNoteMutation,
	useSaveNoteMutation,
	useCreateNoteMutation
} = notesApi