import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'
import {Button, makeStyles} from '@material-ui/core'
import {DRAWER_WIDTH} from './Layout'
import {useHistory} from 'react-router-dom/cjs/react-router-dom'

const useStyles = makeStyles((theme) => ({
	appBar: {
		backgroundColor: '#fff',
		boxShadow: 'none',
		borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${DRAWER_WIDTH}px)`,
			marginLeft: DRAWER_WIDTH,
		},
	},
	toolbar: {
		justifyContent: 'end',
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'space-between'
		}
	},
	menuButton: {
		color: 'teal',
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
}))

export default function TopBar(props) {
	const s = useStyles()
	const history = useHistory()
	const isAuthorized = false

	return (
			<AppBar position="fixed" className={s.appBar}>
				<Toolbar className={s.toolbar}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={props.onToggleDrawer}
						className={s.menuButton}
					>
						<MenuIcon/>
					</IconButton>

					{!isAuthorized &&
						<Button
							color="default"
							onClick={() => history.push('/login')}
						>
							Login
						</Button>
					}

				</Toolbar>
			</AppBar>
	)
}