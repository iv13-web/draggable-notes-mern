import {
  makeStyles,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
} from '@material-ui/core'
import {AddCircleOutlineOutlined, SubjectOutlined} from '@material-ui/icons'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import {NavLink, useLocation} from 'react-router-dom'

const DRAW_WIDTH = 200
const drawerItems = [
  {
    text: 'My notes',
    icon: <SubjectOutlined color='secondary'/>,
    path: '/'
  },
  {
    text: 'Create notes',
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
    page: {
      width: '100%',
      padding: theme.spacing(3)
    },
    draw: {
      width: DRAW_WIDTH
    },
    drawPaper: {
      width: DRAW_WIDTH
    },
    activeNav: {
      backgroundColor: '#f4f4f4'
    },
    list: {
      paddingTop: 0
    },
    title: {
      padding: theme.spacing(2)
    },
    appbar: {
      width: `calc(100% - ${DRAW_WIDTH}px)`,
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
    },
    toolbar: theme.mixins.toolbar,
    root: {
      display: 'flex'
    }
  }
})

export default function Layout({children}) {
  const s = useStyles()
  const {pathname} = useLocation()

  return (
    <div className={s.root}>

      <AppBar
        className={s.appbar}
        color='inherit'
        elevation={0}
      >
        <Toolbar>

        </Toolbar>
      </AppBar>

      <Drawer
        className={s.draw}
        variant='permanent'
        classes={{ paper: s.drawPaper}}
      >
        <div>
          <Typography align='center' className={s.title} variant='h5'>
            Notes-app
          </Typography>
        </div>

        <List className={s.list}>
          {drawerItems.map(item => (
            <NavLink to={item.path} key={item.text}>
              <ListItem
                button
                className={pathname === item.path ? s.activeNav : null}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text}/>
              </ListItem>
            </NavLink>
          ))}
        </List>

      </Drawer>

      <div className={s.page}>
        <div className={s.toolbar}/>
          {children}
      </div>
    </div>
  )
}