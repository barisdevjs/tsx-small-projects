export type Note = {
    id : string
} & NoteData

export type RawNote = {
    id : string
} & RawNoteData

export type RawNoteData = {
    title : string
    markdown : string
    tagIds : string[]
}

export  type NoteData = {
    title : string
    markdown : string
    tags : Tag[]
}

export type Tag = {
    id : string
    label : string
}

export type NoteFormP = {
    onSubmit:(data: NoteData) => void
    onAddTag:(tag:Tag) => void
    availableTags : Tag[]
}