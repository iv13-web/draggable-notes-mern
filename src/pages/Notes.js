import React, {useCallback, useEffect, useState} from 'react'
import update from 'immutability-helper'
import { Grid} from '@material-ui/core'
import NoteCard from '../components/NoteCard'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'


export default function Notes() {
  const [notes, setNotes] = useState([])

  const deleteNoteHandler = noteId => {
    const newNotes = notes.filter(note => note.id !== noteId)
    fetch('http://localhost:8000/notes/' + noteId, {
      method: 'DELETE'
    }).then(() => setNotes(newNotes))
  }

  const AddToFavoriteHandler = (e, noteId) => {
    e.stopPropagation()
    const newNotes = [...notes]
    const index = newNotes.findIndex(note => note.id === noteId)
    newNotes[index].favorite = !newNotes[index].favorite
    setNotes(newNotes)
  }

  useEffect(() => {
    fetch('http://localhost:8000/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
  },[])


  const findCard = useCallback((id) => {
    const note = notes.filter((c) => `${c.id}` === id)[0]
    return {note, index: notes.indexOf(note)}
  }, [notes])

  const moveCard = useCallback((id, atIndex) => {
    const { note, index } = findCard(id);
    setNotes(update(notes, {
      $splice: [
        [index, 1],
        [atIndex, 0, note],
      ],
    }));
  }, [findCard, notes, setNotes])


  return (
    <DndProvider backend={HTML5Backend}>
      <Grid container spacing={3} >
        {notes.map(note => (
          <NoteCard
            key={note.id}
            dndId={`${note.id}`}

            notes={notes}

            note={note}
            onDelete={deleteNoteHandler}
            onSave={AddToFavoriteHandler}
            moveCard={moveCard}
            findCard={findCard}
          />
        ))}
      </Grid>
    </DndProvider>
  )
}
