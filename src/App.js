import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import Favorite from './pages/Favorite'
import {createTheme, ThemeProvider} from '@material-ui/core'
import Layout from './components/Layout'

const theme = createTheme({
  palette: {
  }
})

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Notes} />
            <Route path="/create" component={Create} />
            <Route path="/favorite" component={Favorite} />
            <Route path="/note/:id" component={Favorite} />
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}
