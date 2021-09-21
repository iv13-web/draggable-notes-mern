import {useHistory} from 'react-router-dom'
import {KeyboardArrowRight} from '@material-ui/icons'
import {
	makeStyles,
	Typography,
	Button,
	Container,
	TextField,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormLabel,
	FormControl,
} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux'
import {createNote, initialState} from '../store/notesSlice'
import {useCreateNoteMutation} from '../store/notesApi'

const useStyles = makeStyles({
	field: {
		margin: '20px 0',
		display: 'block'
	},
	title: {
		marginBottom: 20
	},
})

export default function Create() {
	const s = useStyles()
	const history = useHistory()
	const dispatch = useDispatch()
	const createdNote = useSelector(state => state.notes.createdNote)
	const {title, details, category} = createdNote
	const [sendRequest] = useCreateNoteMutation()

	const dispatchTitleHandler = e => {
		dispatch(createNote({...createdNote, title: e.target.value}))
	}
	const dispatchDetailsHandler = e => {
		dispatch(createNote({...createdNote, details: e.target.value}))
	}
	const dispatchCategoryHandler = e => {
		dispatch(createNote({...createdNote, category: e.target.value}))
	}


	const submitHandler = e => {
		e.preventDefault()
		sendRequest(createdNote)
		dispatch(createNote(initialState.createdNote))
		history.push('/')
	}

	return (
		<Container>
			<Typography
				className={s.title}
				variant='h5'
				component='h2'
				color='textSecondary'
			>
				Create a new note
			</Typography>
			<form
				onSubmit={submitHandler}
				noValidate
				autoComplete='off'
			>
				<TextField
					value={title}
					onChange={dispatchTitleHandler}
					className={s.field}
					label='Note title'
					variant='outlined'
					fullWidth
					required
					// error={titleError}
					autoFocus
				/>
				<TextField
					onChange={dispatchDetailsHandler}
					value={details}
					className={s.field}
					label='Details'
					variant='outlined'
					fullWidth
					multiline
					rows={4}
					required
					// error={detailsError}
				/>

				<FormControl className={s.field}>
					<FormLabel color='primary'>Note Category</FormLabel>
					<RadioGroup value={category} onChange={dispatchCategoryHandler}>
						<FormControlLabel value='reminders' control={<Radio/>} label='Reminders'/>
						<FormControlLabel value='shopping' control={<Radio/>} label='Shopping'/>
						<FormControlLabel value='todos' control={<Radio/>} label='Todos'/>
						<FormControlLabel value='work' control={<Radio/>} label='Work'/>
					</RadioGroup>
				</FormControl>

				<Button
					type='submit'
					color='primary'
					variant='contained'
					disableElevation
					endIcon={<KeyboardArrowRight/>}
				>
					submit
				</Button>
			</form>

		</Container>
	)
}
