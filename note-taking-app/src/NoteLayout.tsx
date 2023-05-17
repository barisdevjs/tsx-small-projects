import React from 'react'
import { Note, NoteLayoutP } from './Types'
import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom'



function NoteLayout({notes} : NoteLayoutP) {
    const { id }= useParams();
    const note = notes.find(n => n.id === id);
    
    if ( note == null) return <Navigate to="/" replace />
    
  return <Outlet context={note} />
}

export default NoteLayout

export function useNote() {
    return useOutletContext<Note>()
}