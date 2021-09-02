import React, {useState} from 'react'
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
	const [title, setTitle] = useState('')
	const [details, setDetails] = useState('')
	const [titleError, setTitleError] = useState(false)
	const [detailsError, setDetailsError] = useState(false)
	const [category, setCategory] = useState('reminders')

	const submitHandler = e => {
		e.preventDefault()
		title.trim() ? setTitleError(false) : setTitleError(true)
		details.trim() ? setDetailsError(false) : setDetailsError(true)
		if (title.trim() && details.trim()) {
			fetch('http://localhost:8000/notes', {
				method: 'POST',
				headers: {'Content-type': 'application/json'},
				body: JSON.stringify({title, details, category})
			}).then(() => history.push('/'))
		}
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
					onChange={e => {
						setTitle(e.target.value)
						e.target.value.trim() && setTitleError(false)
					}}
					className={s.field}
					label='Note title'
					variant='outlined'
					fullWidth
					required
					error={titleError}
				/>
				<TextField
					onChange={e => {
						setDetails(e.target.value)
						e.target.value.trim() && setDetailsError(false)
					}}
					value={details}
					className={s.field}
					label='Details'
					variant='outlined'
					fullWidth
					multiline
					rows={4}
					required
					error={detailsError}
				/>

				<FormControl className={s.field}>
					<FormLabel color='primary'>Note Category</FormLabel>
					<RadioGroup value={category} onChange={e => setCategory(e.target.value)}>
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
