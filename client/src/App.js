import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NotesList from './components/NotesList'
import Create from './pages/Create'
import Favorite from './pages/Favorite'
import {createTheme, ThemeProvider} from '@material-ui/core'
import {HTML5Backend} from 'react-dnd-html5-backend'
import Layout from './components/Layout/Layout'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import {store} from './store/store'
import Providers from './components/Providers'

const theme = createTheme({
  palette: {
  }
})

export default function App() {
  return (
    <Providers store={store} backend={HTML5Backend} theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={NotesList}/>
            <Route path="/login" component={SignIn}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/create" component={Create}/>
            <Route path="/favorite" component={Favorite}/>
          </Switch>
        </Layout>
      </Router>
    </Providers>
  )
}
