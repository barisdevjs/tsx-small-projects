import { useMemo, useState } from 'react'
import { Badge, Button, Card, Col, Form, Modal, Row, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';
import { EditModalP, NoteListP, SimplifiedNote, Tag } from './Types';
import styles from "./NoteList.module.css";

function NoteList({ availableTags, notes, onDeleteTag, onUpdateTag }: NoteListP) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (
        (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
      )
    })
  }, [title, selectedTags, notes])


  return (
    <>
      <Row className='align-items-center mb-4'>
        <Col><h1>Notes</h1></Col>
        <Col xs="auto">
          <Stack gap={2} direction='horizontal'>
            <Link to="/new">
              <Button>Create</Button>
            </Link>
            <Button variant='outline-secondary' onClick={() => setIsOpen(true)}>Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='tags'>
              <Form.Label>Tags</Form.Label>
              <ReactSelect isMulti
                value={selectedTags.map(t => {
                  return { label: t.label, value: t.id }
                })}
                onChange={tags => {
                  setSelectedTags(
                    tags.map(t => {
                      return { label: t.label, id: t.value }
                    })
                  )
                }}
                options={availableTags.map(t => {
                  return { label: t.label, value: t.id }
                })}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map(note => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
      <EditTagsModal show={isOpen} handleClose={() => setIsOpen(false)} availableTags={availableTags} onDeleteTag={onDeleteTag} onUpdateTag={onUpdateTag} />
    </>
  )
}

export default NoteList


function NoteCard({ id, title, tags }: SimplifiedNote) {
  return (
    <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}  >
      <Card.Body>
        <Stack gap={2} className="align-items-center justify-content-center h-100">
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="justify-content-center flex-wrap">
              {tags.map(tag => (
                <Badge className='text-truncate' key={tag.id}>{tag.label}</Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  )
}

function EditTagsModal({ show, handleClose, availableTags, onUpdateTag, onDeleteTag }: EditModalP) {

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag: Tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control type='text' value={tag.label}
                    onChange={e => onUpdateTag(tag.id, e.target.value)} />
                </Col>
                <Col xs="auto">
                  <Button variant='outline-danger' onClick={() => onDeleteTag(tag.id)}>&times;</Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  )
}