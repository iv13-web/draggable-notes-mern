import React, {useCallback, useEffect} from 'react'
import update from 'immutability-helper'
import {Grid, makeStyles} from '@material-ui/core'
import NoteCard from './NoteCard'
import SkeletonNote from './SkeletonNote'
import LazyLoader from './LazyLoader'
import {useGetNotesQuery} from '../store/notesApi'
import {useDispatch, useSelector} from 'react-redux'
import {storeNotes} from '../store/notesSlice'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
})

export default function NotesList(props) {
  const s = useStyles()
  const dispatch = useDispatch()
  const notes = useSelector(state => state.notes.notes)
  const pageType = props.favorite ? 'favorite' : ''
  const {data, isLoading} = useGetNotesQuery()

  useEffect(() => {
    if (!props.favorite) {
      data && dispatch(storeNotes(data))
    } else {
      dispatch(storeNotes(notes.filter(note => note.favorite)))
    }
  }, [data, props.favorite])

  const findCard = useCallback((id) => {
    const note = notes.filter((c) => `${c._id}` === id)[0]
    return {note, index: notes.indexOf(note)}
  }, [notes])

  const moveCard = useCallback((id, atIndex) => {
    const {note, index} = findCard(id);
    dispatch(storeNotes(update(notes, {
      $splice: [
        [index, 1],
        [atIndex, 0, note],
      ],
    })))
  }, [findCard, notes])

  return (
    <div className={s.root}>
      <Grid container spacing={3}>
        {isLoading &&
          <LazyLoader
            delay={700}
            component={<SkeletonNote count={12}/>}
          />
        }
        {notes.map(note => (
          <NoteCard
            key={note._id}
            note={note}
            moveCard={moveCard}
            findCard={findCard}
          />
        ))}
      </Grid>
    </div>
  )
}
