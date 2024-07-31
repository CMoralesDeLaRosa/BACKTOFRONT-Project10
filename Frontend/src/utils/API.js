export const API = async ({ endpoint, method = 'GET', url, body, token }) => {
  const headers = {
    Authorization: `Bearer ${token}`
  }

  const urlFetch = url ? url : import.meta.env.VITE_BASE_URL + endpoint
  const options = { method, headers }

  if (body && !(method === 'DELETE')) {
    if (body instanceof FormData) {
      options.body = body
    } else {
      headers['Content-Type'] = 'application/json'
      options.body = JSON.stringify(body)
    }
  }

  const res = await fetch(urlFetch, options)

  const response = await res.json()

  return {
    status: res.status,
    response
  }
}
