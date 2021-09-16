import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import NavLinks from './NavLinks'
import TopBar from './TopBar'

export const DRAWER_WIDTH = 168

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: DRAWER_WIDTH,
			flexShrink: 0,
		},
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${DRAWER_WIDTH}px)`,
			marginLeft: DRAWER_WIDTH,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: DRAWER_WIDTH,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}))

export default function Layout({children}) {
	const s = useStyles()
	const theme = useTheme()
	const [mobileOpen, setMobileOpen] = React.useState(false)
	const handleDrawerToggle = () => setMobileOpen(prev => !prev)


	return (
		<div className={s.root}>
			<TopBar onToggleDrawer={handleDrawerToggle}/>

			<nav className={s.drawer} aria-label="mailbox folders">
				<Hidden smUp implementation="css">
					<Drawer
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{paper: s.drawerPaper}}
						ModalProps={{keepMounted: true}}
					>
						<NavLinks/>
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{paper: s.drawerPaper}}
						variant="permanent"
						open
					>
						<NavLinks/>
					</Drawer>
				</Hidden>
			</nav>

			<main className={s.content}>
				<div className={s.toolbar} />
				{children}
			</main>
		</div>
	)
}
