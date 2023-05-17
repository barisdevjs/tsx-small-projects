import React from 'react'
import NoteForm from './NoteForm'
import { NoteEditP, NoteFormP } from './Types'
import { useNote } from './NoteLayout'

function EditNote({ onSubmit, onAddTag, availableTags }: NoteEditP) {

    const note = useNote()
    return (
        <>
            <h1 className='mb-4'>EditNote</h1>
            <NoteForm
            title={note.title}
            markdown={note.markdown}
            tags={note.tags} 
            onSubmit={data => onSubmit(note.id, data)} 
            onAddTag={onAddTag} 
            availableTags={availableTags}
            />
        </>
    )
}

export default EditNote