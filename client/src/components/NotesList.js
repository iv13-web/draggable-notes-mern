import React, {useCallback, useEffect, useState} from 'react'
import update from 'immutability-helper'
import {Grid, makeStyles} from '@material-ui/core'
import NoteCard from './NoteCard'
import useFetch from '../hooks/useFetch'
import SkeletonNote from './SkeletonNote'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
})

export default function NotesList(props) {
  const [notes, setNotes] = useState([])
  const s = useStyles()
  const {response, isLoading} = useFetch(props.favorite
    ? `http://localhost:5001/favorite`
    : `http://localhost:5001`
  )
  const {sendRequest} = useFetch('http://localhost:5001', {autoExecute: false})

  useEffect(() => setNotes(response),[response])

  const deleteNoteHandler = noteId => {
    const newNotes = notes.filter(note => note._id !== noteId)
    sendRequest({url: 'http://localhost:5001/' + noteId, method: 'DELETE'})
    setNotes(newNotes)
  }

  const AddToFavoriteHandler = (e, noteId) => {
    e.stopPropagation()
    const newNotes = [...notes]
    const index = newNotes.findIndex(note => note._id === noteId)
    newNotes[index].favorite = !newNotes[index].favorite
    sendRequest({url: 'http://localhost:5001/' + noteId, method: 'PATCH'})
  }

  const findCard = useCallback((id) => {
    const note = notes.filter((c) => `${c._id}` === id)[0]
    return {note, index: notes.indexOf(note)}
  }, [notes])

  const moveCard = useCallback((id, atIndex) => {
    const {note, index} = findCard(id);
    setNotes(update(notes, {
      $splice: [
        [index, 1],
        [atIndex, 0, note],
      ],
    }))
  }, [findCard, notes, setNotes])

  return (
    <div className={s.root}>
      <Grid container spacing={3} >
        {isLoading && <SkeletonNote count={12}/>}
        {notes && notes.map(note => (
          <NoteCard
            key={note._id}
            id={note._id}
            note={note}
            notes={notes}
            onDelete={deleteNoteHandler}
            onSave={AddToFavoriteHandler}
            moveCard={moveCard}
            findCard={findCard}
          />
        ))}
      </Grid>
    </div>
  )
}
