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
import {DeleteOutlined, Edit} from '@material-ui/icons'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'
import {useDrag, useDrop} from 'react-dnd'

const useStyles = makeStyles((theme) => {
	return {
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
		dragBnt: {
			cursor: 'move'
		},
		cardHeader: {
			cursor: 'pointer',
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
	}
})

const LEFT_BTN_TEXT = 'delete'
const RIGHT_BTN_TEXT = 'open'

export default function NoteCard({note, onDelete, onSave, findCard, moveCard, dndId}) {
	const s = useStyles(note)

	const originalIndex = findCard(dndId).index

	const [{isDragging}, drag] = useDrag(() => ({
		type: 'note',
		item: { dndId, originalIndex },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
		end() {
		// 	fetch('http://localhost:8000/notes/', {
		// 		method: 'PUT',
		// 		headers: {'Content-type': 'application/json'},
		// 		body: JSON.stringify(notes)
		// 	}).then(response => response.json())
		// 		.then(json => console.log(json))
		}
	}), [dndId, originalIndex, moveCard])

	const [, drop] = useDrop(() => ({
		accept: 'note',
		canDrop: () => false,
		hover({ dndId: draggedId }) {
			if (draggedId !== dndId) {
				const { index: overIndex } = findCard(dndId)
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
				draggable={true}
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
						<>
							<IconButton
								onClick={e => onSave(e, note.id)}
								size='small'
							>
								{note.favorite === false
									? <FavoriteBorderOutlinedIcon/>
									: <FavoriteOutlinedIcon color='secondary'/>
								}
							</IconButton>
							<IconButton
								size='small'
								className={s.dragBnt}
								ref={(node) => drag(node)}
								disableRipple
							>
								<DragIndicatorIcon/>
							</IconButton>
						</>
					}
				/>
				<Divider/>
				<CardActions disableSpacing>
					<ButtonGroup>
						<Button
							startIcon={<DeleteOutlined color='secondary'/>}
							type='submit'
							variant='text'
							disableElevation
							size='small'
							onClick={() => onDelete(note.id)}
						>
							<Typography
								variant='button'
								className={s.btn}
							>
								{LEFT_BTN_TEXT}
							</Typography>
						</Button>
						<Button
							startIcon={<Edit color='primary'/>}
							type='submit'
							variant='text'
							disableElevation
							size='small'
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