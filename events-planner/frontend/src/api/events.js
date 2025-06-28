export async function fetchEvents({page=1, per=10, q=''}){
  const token = localStorage.token
  const res = await fetch(`/api/events?page=${page}&per_page=${per}&q=${q}`, {
    headers:{ Authorization:'Bearer '+token }
  })
  return await res.json()
}

export async function createEvent(data){
  const token = localStorage.token
  const res = await fetch('/api/events',{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      Authorization:'Bearer '+token
    },
    body:JSON.stringify(data)
  })
  return await res.json()
}

export async function updateEvent(id, data){
  const token = localStorage.token
  const res = await fetch(`/api/events/${id}`,{
    method:'PUT',
    headers:{
      'Content-Type':'application/json',
      Authorization:'Bearer '+token
    },
    body:JSON.stringify(data)
  })
  return await res.json()
}

export async function deleteEvent(id){
  const token = localStorage.token
  await fetch(`/api/events/${id}`,{
    method:'DELETE',
    headers:{ Authorization:'Bearer '+token }
  })
}

export async function fetchSharedEvent(uuid){
  const res = await fetch(`/api/events/share/${uuid}`)
  return await res.json()
}
