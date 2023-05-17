import React, { FormEvent, useRef, useState } from 'react';
import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";
import { Link, useNavigate } from "react-router-dom";
import { NoteFormP, Tag } from './Types';
import { v4 as uuidV4 } from 'uuid';


function NoteForm({ onSubmit, onAddTag, availableTags,title="", markdown="",tags=[] } : NoteFormP) {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags : selectedTags
    })

    navigate("..")
  }


  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId='title' >
              <Form.Label >Title</Form.Label>
              <Form.Control ref={titleRef} placeholder="Enter title" required defaultValue={title} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='tags'>
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect isMulti 
              value={selectedTags.map(t => {
                return { label : t.label, value : t.id}
              })}
               onChange={tags => {
                setSelectedTags(
                  tags.map(t => {
                    return {label : t.label, id : t.value}
                  })
                )
               }}
               onCreateOption={label => {
                const newTag = {id: uuidV4(), label}
                onAddTag(newTag)
                setSelectedTags(prev => [...prev, newTag])
               }}
               options={availableTags.map(t => {
                return {label : t.label, value: t.id}
               })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId='markdown'>
          <Form.Label >Markdown</Form.Label>
          <Form.Control ref={markdownRef} placeholder="Enter Description" required as="textarea" rows={15} defaultValue={markdown} />
        </Form.Group>
        <Stack direction={"horizontal"} gap={2} className="justify-content-end">
          <Button type="submit" variant="outline-primary">Save</Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">Cancel</Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  )
}

export default NoteForm