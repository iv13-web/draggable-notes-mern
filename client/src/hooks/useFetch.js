import {useCallback, useEffect, useReducer, useRef} from 'react'

const initialState = {
	error: null,
	isLoading: false,
	response: null
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'LOADING':
			return {
				...state,
				isLoading: true,
			}
		case 'SUCCESS':
			return {
				...state,
				response: action.payload,
			}
		case 'ERROR':
			return {
				...state,
				error: action.payload,
				isLoading: false,
				response: null,
			}
		case 'ANYWAY':
			return {
				...state,
				isLoading: false
			}
		default:
			return state
	}
}

const initialConfig = {
	method : 'GET',
	autoExecute : true,
	headers : {'Content-type': 'application/json'},
	body: null,
	transformResponse: null,
	overrideResponse: false
}

export default function useFetch(url, requestConfig = initialConfig) {
	const [state, dispatch] = useReducer(reducer, initialState)
	const config = {...initialConfig, ...requestConfig}
	const {autoExecute, method, headers, body, transformResponse,} = config

	const headersRef = useRef(headers)
	const transformResponseRef = useRef(transformResponse)
	const sendRequestRef = useRef(() => {})

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal

		sendRequestRef.current = async (newOptions = {}) => {
			dispatch({type: 'LOADING'})
			try {
				if (!signal.aborted) {
					if (Array.isArray(url) && url.length) {
						const requests = await url.map(url => fetch(url))
						const response = await Promise.all(requests)
						const data = await Promise.all(response.map(r => r.json()))
						dispatch({type: 'SUCCESS', payload: data})
					} else {
						let response = await fetch(newOptions.url || url, {
							method: newOptions.method || method,
							headers: newOptions.headers || headers,
							body: newOptions.body || body
						})
						if (newOptions.overrideResponse) {
							// подумать, чтобы можно было использовать единственный вызов хука
						}
						if (!response.ok) throw new Error('Could not fetch data')
						const data = await response.json()
						if (transformResponseRef.current == null) {
							dispatch({type: 'SUCCESS', payload: data})
						} else {
							const transformedData = transformResponseRef.current(data)
							dispatch({type: 'SUCCESS', payload: transformedData})
						}
					}
				}
			} catch (error) {
				dispatch({type: 'ERROR', payload: error})
			} finally {
				dispatch({type: 'ANYWAY'})
			}
		}
		return () => controller.abort()
	}, [url, method, headersRef, body, transformResponseRef])

	useEffect((...args) => autoExecute && sendRequestRef.current(...args), [])

	const sendRequest = useCallback((...args) => sendRequestRef.current(...args), [])

	const { error, isLoading, response } = state

	return {
		isLoading,
		response,
		error,
		sendRequest,
	}
}
