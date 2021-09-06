import { useReducer, useRef} from 'react'

const initialState = {
	error: null,
	isLoading: false,
	response: null
}

function reducer(state, {type, payload}) {
	switch (type) {
		case 'loading':
			return {
				...state,
				isLoading: true,
			}
		case 'success':
			return {
				...state,
				payload,
				isLoading: false,
			}
		case 'error':
			return {
				...state,
				payload,
				isLoading: false,
				response: null,
			}
		default:
			throw new Error()
	}
}

export default function useFetch(url, requestConfig) {
	const{method, headers, body} = requestConfig
	const [state, dispatch] = useReducer(reducer, initialState)

	const methodRef = useRef(method)
	const headersRef = useRef(headers)
	const bodyRef = useRef(body)



}


