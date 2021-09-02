import React, {useEffect, useState} from 'react'
import {Container} from '@material-ui/core'
import NoteCard from '../components/NoteCard'
import Masonry from 'react-masonry-css'

const breakpoints = {
  default: 3,
  1100: 2,
  700: 1
}

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

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map(note => (
          <div key={note.id}>
            <NoteCard
              note={note}
              onDelete={deleteNoteHandler}
              onAddToFavorite={AddToFavoriteHandler}
            />
          </div>
        ))}
      </Masonry>
    </Container>

  )
}
