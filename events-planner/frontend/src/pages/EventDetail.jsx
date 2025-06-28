// src/pages/EventDetail.jsx
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute'
import {
  fetchEvents,
  deleteEvent,
} from '../api/events'
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask
} from '../api/tasks'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

export default function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ev, setEv] = useState(null)
  const [tasks, setTasks] = useState([])

  const loadTasks = () => {
    fetchTasks({ per: 100 })
      .then(data => setTasks(data.items || []))
  }

  useEffect(() => {
    fetchEvents({ per: 100 })
      .then(data => {
        const found = data.items?.find(e => e.id === parseInt(id, 10))
        setEv(found || null)
      })
    loadTasks()
  }, [id])

  if (ev === null) return <p>Event not found</p>
  if (!ev) return <p>Loading…</p>

  const handleDelete = async () => {
    await deleteEvent(ev.id)
    navigate('/')
  }

  return (
    <PrivateRoute>
      <h2>{ev.title}</h2>
      <p>{ev.description}</p>
      <h3>Tasks</h3>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            <input
              type="checkbox"
              checked={t.done}
              onChange={async () => {
                await updateTask(t.id, { done: !t.done })
                loadTasks()
              }}
            />
            {t.name}
            <button onClick={async () => {
              await deleteTask(t.id)
              loadTasks()
            }}>×</button>
          </li>
        ))}
      </ul>
      <Formik
        initialValues={{ name: '', done: false, event_id: ev.id }}
        validationSchema={Yup.object({ name: Yup.string().required() })}
        onSubmit={async (vals, { resetForm }) => {
          await createTask(vals)
          resetForm()
          loadTasks()
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="name" placeholder="New task" />
            {errors.name && touched.name && <div>{errors.name}</div>}
            <button type="submit">Add</button>
          </Form>
        )}
      </Formik>
      <button onClick={handleDelete}>Delete Event</button>
      <button onClick={() => navigate(`/events/${ev.id}/edit`)}>Edit Event</button>
    </PrivateRoute>
  )
}
