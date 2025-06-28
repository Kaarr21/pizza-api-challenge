import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import EventForm from '../forms/EventForm'
import { createEvent, updateEvent, fetchEvents } from '../api/events'
import PrivateRoute from '../components/PrivateRoute'

export default function EventFormPage(){
  const nav = useNavigate()
  const { id } = useParams()
  const [initial, setInitial] = useState({ title:'', date:'', description:''})

  useEffect(()=>{
    if(id) {
      fetchEvents({ per:100 }).then(d=>{
        const ev = d.items.find(x=>x.id+''===id)
        if(ev) setInitial(ev)
      })
    }
  },[id])

  return (
    <PrivateRoute>
      <EventForm
        initial={initial}
        onSubmit={async vals=>{
          if (id) await updateEvent(id, vals)
          else await createEvent(vals)
          nav('/')
        }}
      />
    </PrivateRoute>
  )
}
