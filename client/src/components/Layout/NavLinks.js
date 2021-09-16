import {List,
	ListItem,
	ListItemIcon,
	ListItemText,
	makeStyles,
	Typography
} from '@material-ui/core'
import {AddCircleOutlineOutlined, SubjectOutlined} from '@material-ui/icons'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import {NavLink} from 'react-router-dom'
import {useLocation} from 'react-router-dom/cjs/react-router-dom'
import Divider from '@material-ui/core/Divider'
import React from 'react'

const drawItems = [
	{
		text: 'My notes',
		icon: <SubjectOutlined color='secondary'/>,
		path: '/'
	},
	{
		text: 'Create note',
		icon: <AddCircleOutlineOutlined color='secondary'/>,
		path: '/create'
	},
	{
		text: 'Favorite',
		icon: <FavoriteBorderOutlinedIcon color='secondary'/>,
		path: '/favorite'
	},
]

const useStyles = makeStyles((theme) => {
	return {
		activeNav: {
			backgroundColor: '#f4f4f4'
		},
		list: {
			paddingTop: 0
		},
		listItem: {
			minWidth: 40
		},
		title: {
			padding: theme.spacing(2)
		},
		toolbar: theme.mixins.toolbar,
	}
})

export default function NavLinks() {
	const s = useStyles()
	const {pathname} = useLocation()

	return (
		<>
			<Typography align='center' className={s.title} variant='h6'>
				Notes-app
			</Typography>
			<Divider/>
			<List className={s.list}>
				{drawItems.map(item => (
					<NavLink to={item.path} key={item.text}>
						<ListItem
							button
							className={pathname === item.path ? s.activeNav : null}
						>
							<ListItemIcon className={s.listItem}>
								{item.icon}
							</ListItemIcon>
							<ListItemText primary={item.text}/>
						</ListItem>
					</NavLink>
				))}
			</List>
		</>
	)
}