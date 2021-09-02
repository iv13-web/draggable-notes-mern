import {
	Card,
	CardHeader,
	CardContent,
	IconButton,
	Typography,
	makeStyles,
	Avatar,
	CardActions,
	Collapse,
	Divider,
	Button,
	ButtonGroup
} from '@material-ui/core'
import {DeleteOutlined, Edit} from '@material-ui/icons'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from 'clsx'
import {useState} from 'react'

const useStyles = makeStyles((theme) => {
	return {
		card: {
			border: (note) => {
				return note.category === 'work'
					? '1px solid red'
					: '1px solid transparent'
			},
			minWidth: 350
		},
		btn:{
			fontSize: 12,
		},
		cardHeader: {
			cursor: 'pointer',
			'&:hover': {
				backgroundColor: 'rgba(0,0,0,0.03)'
			}
		},
		expand: {
			transform: 'rotate(0deg)',
			marginLeft: 'auto',
			transition: theme.transitions.create('transform', {
				duration: theme.transitions.duration.shortest,
			}),
		},
		expandOpen: {
			transform: 'rotate(180deg)',
		},
	}
})

const LEFT_BTN_TEXT = 'delete'
const RIGHT_BTN_TEXT = 'edit'

export default function NoteCard({note, onDelete, onAddToFavorite}) {
	const s = useStyles(note)
	const [expanded, setExpanded] = useState(false)
	const ExpandClickHandler = () => setExpanded(!expanded)

	return (
		<Card elevation={3} className={s.card}>
			<CardHeader
				className={s.cardHeader}
				avatar={
					<Avatar>
						{note.category[0].toUpperCase()}
					</Avatar>
				}
				action={
					<IconButton
						onClick={e => onAddToFavorite(e, note.id)}
					>
						{note.favorite === false
							? <FavoriteBorderOutlinedIcon/>
							: <FavoriteOutlinedIcon color='secondary'/>
						}
					</IconButton>
				}
				title={note.title}
				subheader={note.category}
				onClick={() => console.log('open')}
			/>
			<Divider/>
			<CardActions disableSpacing>

				<ButtonGroup>
					<Button
						startIcon={<DeleteOutlined color='action'/>}
						type='submit'
						variant='outlined'
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
						startIcon={<Edit color='action'/>}
						type='submit'
						variant='outlined'
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
				<IconButton
					className={clsx(s.expand, {
						[s.expandOpen]: expanded,
					})}
					onClick={ExpandClickHandler}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</IconButton>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
			<Divider/>
				<CardContent>
					<Typography
						variant='body2'
						color='textSecondary'
					>
						{note.details}
					</Typography>
				</CardContent>
			</Collapse>
		</Card>
	)
}