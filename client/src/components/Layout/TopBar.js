import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'
import {Button, makeStyles} from '@material-ui/core'
import {DRAWER_WIDTH} from './Layout'
import {useHistory} from 'react-router-dom/cjs/react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {login, logout} from '../../store/authSlice'

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
		color: theme.palette.primary.dark,
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
}))

export default function TopBar(props) {
	const s = useStyles()
	const history = useHistory()
	const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
	const dispatch = useDispatch()

	const loginHandler = () => history.push('/login')
	const logoutHandler = () => {
		dispatch(logout())
		history.push('/login')
	}


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

					{!isLoggedIn ?
						(<Button
								color="default"
								onClick={loginHandler}
							>Login</Button>
						) : (
							<Button
								color="default"
								onClick={logoutHandler}
							>Logout</Button>
						)
					}

				</Toolbar>
			</AppBar>
	)
}