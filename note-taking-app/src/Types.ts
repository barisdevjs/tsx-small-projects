export type Note = {
    id : string
} & NoteData

export type SimplifiedNote = Omit<Note, "markdown">

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
} & Partial<NoteData>

export type NoteListP =  Pick<NoteFormP,"availableTags"> & {
    notes : SimplifiedNote[]
}

export type NoteLayoutP = {
    notes : Note[]
}

export type NoteEditP = Omit<NoteFormP, "onSubmit"> & {
    onSubmit:(id: string,data: NoteData) => void
}

export type NoteDeleteP = {
    onDelete:(id: string) => void
}