// src/api/auth.js
export async function login(creds) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(creds)
  })

  if (!res.ok) throw new Error('Invalid credentials')
  return await res.json()
}

export async function register(creds) {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(creds)
  })

  if (!res.ok) throw new Error('Registration failed')
  return await res.json()
}
