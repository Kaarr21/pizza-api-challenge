// src/pages/SharedEvent.jsx
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchSharedEvent } from '../api/events'

export default function SharedEvent() {
  const { shareId } = useParams()
  const [ev, setEv] = useState(undefined)

  useEffect(() => {
    fetchSharedEvent(shareId)
      .then(setEv)
      .catch(() => setEv(null))
  }, [shareId])

  if (ev === undefined) return <p>Loading…</p>
  if (!ev) return <p>Event not found</p>

  return (
    <div>
      <h2>{ev.title}</h2>
      <p>{ev.description}</p>
      <h3>Tasks</h3>
      <ul>
        {ev.tasks.map(t => (
          <li key={t.id}>
            {t.name} {t.done ? '✔︎' : '✘'}
          </li>
        ))}
      </ul>
    </div>
  )
}
