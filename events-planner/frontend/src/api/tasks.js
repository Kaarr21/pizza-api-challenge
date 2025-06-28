export async function fetchTasks(options={}){
  const { page, per, q } = options
  const token = localStorage.token
  const res = await fetch(`/api/tasks?page=${page}&per_page=${per}&q=${q}`, {
    headers:{ Authorization:'Bearer '+token }
  })
  return await res.json()
}

export async function createTask(data){
  const token = localStorage.token
  const res = await fetch('/api/tasks',{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      Authorization:'Bearer '+token
    },
    body:JSON.stringify(data)
  })
  return await res.json()
}

export async function updateTask(id,data){
  const token = localStorage.token
  const res = await fetch(`/api/tasks/${id}`,{
    method:'PUT',
    headers:{
      'Content-Type':'application/json',
      Authorization:'Bearer '+token
    },
    body:JSON.stringify(data)
  })
  return await res.json()
}

export async function deleteTask(id){
  const token = localStorage.token
  await fetch(`/api/tasks/${id}`,{
    method:'DELETE',
    headers:{ Authorization:'Bearer '+token }
  })
}
