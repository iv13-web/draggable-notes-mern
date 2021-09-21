import {Provider} from 'react-redux'
import {DndProvider} from 'react-dnd'
import {ThemeProvider} from '@material-ui/core'

export default function Providers({store, backend, theme, children}) {

  return (
    <Provider store={store}>
      <DndProvider backend={backend}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </DndProvider>
    </Provider>
  )
}