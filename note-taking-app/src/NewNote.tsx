import NoteForm from './NoteForm'
import { NoteFormP } from './Types'

function NewNote({onSubmit, onAddTag, availableTags} : NoteFormP) {
  return (
    <>
    <h1 className='mb-4'>NewNote</h1>
    <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}/>
    </>
  )
}

export default NewNote