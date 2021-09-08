import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NotesList from './pages/NotesList'
import Create from './pages/Create'
import Favorite from './pages/Favorite'
import {createTheme, ThemeProvider} from '@material-ui/core'
import Layout from './components/Layout'
import {HTML5Backend} from 'react-dnd-html5-backend';
import {DndProvider} from 'react-dnd';

const theme = createTheme({
  palette: {
  }
})

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/" component={NotesList}/>
              <Route path="/create" component={Create}/>
              <Route path="/favorite" component={Favorite}/>
              <Route path="/note/:id" component={Favorite}/>
            </Switch>
          </Layout>
        </Router>
      </ThemeProvider>
    </DndProvider>
  )
}
