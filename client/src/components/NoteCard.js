import {
	Card,
	CardHeader,
	IconButton,
	Typography,
	makeStyles,
	Avatar,
	CardActions,
	Divider,
	Button,
	ButtonGroup, Grid
} from '@material-ui/core'
import {purple, red, green, teal} from '@material-ui/core/colors'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined'
import {useDrag, useDrop} from 'react-dnd'
import useFetch from '../hooks/useFetch'

const useStyles = makeStyles({
	card: {
		border: (note) => {
			return note.category === 'work'
				? '1px solid red'
				: '1px solid transparent'
		},
	},
	placeholder: {
		border: '2px dashed #d3d8de',
		height: 120,
		backgroundColor: 'transparent'
	},
	btn:{
		fontSize: 12,
	},
	cardHeader: {
		cursor: 'move',
		'&:hover': {
			backgroundColor: 'rgba(0,0,0,0.03)'
		}
	},
	avatar: {
		backgroundColor: (note) => {
			if(note.category === 'work') return purple[200]
			if(note.category === 'reminders') return red[200]
			if(note.category === 'todos') return green[200]
			if(note.category === 'money') return teal[200]
		}
	},
})

const LEFT_BTN_TEXT = 'delete'
const RIGHT_BTN_TEXT = 'open'


export default function NoteCard({note, onDelete, onSave, findCard, moveCard, id, notes}) {
	const s = useStyles(note)
	const {sendRequest} = useFetch('http://localhost:5001', {
		method: 'PUT',
		body: JSON.stringify(notes),
		autoExecute: false
	})

	const originalIndex = findCard(id).index

	const [{isDragging}, drag] = useDrag(() => ({
		type: 'note',
		item: { id, originalIndex },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
		end: () => sendRequest()
	}), [])

	const [, drop] = useDrop(() => ({
		accept: 'note',
		canDrop: () => false,
		hover({ id: draggedId }) {
			if (draggedId !== id) {
				const { index: overIndex } = findCard(id)
				moveCard(draggedId, overIndex)
			}
		},
	}), [findCard, moveCard])

	if (isDragging) return (
		<Grid item xs={12} md={6} lg={4} xl={3}>
			<Card className={s.placeholder}/>
		</Grid>
	)

	return (
		<Grid item xs={12} md={6} lg={4} xl={3}>
			<Card
				elevation={3}
				className={s.card}
				ref={(node) => drag(drop(node))}
			>
				<CardHeader
					className={s.cardHeader}
					title={note.title}
					subheader={note.category}
					avatar={
						<Avatar className={s.avatar}>
							{note.category[0].toUpperCase()}
						</Avatar>
					}
					action={
						<IconButton
							onClick={e => onSave(e, id)}
							size='medium'
						>
							{note.favorite === false
								? <FavoriteBorderOutlinedIcon/>
								: <FavoriteOutlinedIcon color='secondary'/>
							}
						</IconButton>
					}
				/>
				<Divider/>
				<CardActions disableSpacing>
					<ButtonGroup>
						<Button
							type='submit'
							variant='text'
							disableElevation
							size='medium'
							onClick={() => onDelete(note._id)}
						>
							<Typography
								variant='button'
								className={s.btn}
							>
								{LEFT_BTN_TEXT}
							</Typography>
						</Button>
						<Button
							type='submit'
							variant='text'
							disableElevation
							size='medium'
						>
							<Typography
								variant='button'
								className={s.btn}
							>
								{RIGHT_BTN_TEXT}
							</Typography>
						</Button>
					</ButtonGroup>
				</CardActions>
			</Card>
		</Grid>
	)
}