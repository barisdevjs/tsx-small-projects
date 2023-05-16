import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Routes,Route,Navigate } from 'react-router-dom';
import NewNote from './NewNote';
import { NoteData, RawNote, Tag } from './Types';
import { useLocalStorage } from './useLocalStorage';
import { useMemo } from 'react';
import { v4 as uuidV4 } from 'uuid';
import NoteList from './NoteList';



function App() { 

  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(() => {
    return notes.map((note: RawNote) => {
      return {...note, tags: tags.filter((tag : Tag) => note.tagIds.includes(tag.id))}
    })
  }, [])

  function onCreateNote({tags,...data} : NoteData) {
    setNotes(prevNotes => {
      return [...prevNotes, {...data, id:uuidV4(), tagIds:tags.map(t => t.id)}]
    })
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  return (
    <Container className="my-4">
    <Routes>
      <Route path="/" element={<NoteList notes={notesWithTags} availableTags={tags} />} />
      <Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />} />
      <Route path="/:id">
        <Route index element={<h1>Show</h1>} />
        <Route path="edit" element={<h1>Edit</h1>} />
      </Route>
      <Route path="*" element={<Navigate to="/"/>} />
    </Routes>
    </Container>
  )
}

export default App
