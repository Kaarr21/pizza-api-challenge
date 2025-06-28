import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute'
import { fetchEvents } from '../api/events'

export default function Events(){
  const [data, setData] = useState({ items:[], page:1, total:0 })
  const [q, setQ] = useState('')

  useEffect(()=>{
    load(1, q)
  }, [q])

  function load(page, q){
    fetchEvents({ page, per:5, q }).then(setData)
  }

  return (
    <PrivateRoute>
      <div>
        <input
          placeholder="Search events"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        {data.items.map(e=>(
          <div key={e.id}>
            <Link to={`/events/${e.id}`}>{e.title}</Link>
          </div>
        ))}
        <div>
          <button
            disabled={data.page<=1}
            onClick={()=>load(data.page-1, q)}
          >Prev</button>
          <span> Page {data.page} </span>
          <button
            disabled={data.items.length<5}
            onClick={()=>load(data.page+1, q)}
          >Next</button>
        </div>
      </div>
    </PrivateRoute>
  )
}
