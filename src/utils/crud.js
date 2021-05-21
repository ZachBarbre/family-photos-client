import { error } from '../pages/_stores'

export async function getApi(url, maxResponseTime = 2000) {
  try {
    const controller = new AbortController()
    const config = { signal: controller.signal }
    const timeout = setTimeout(() => {
      controller.abort()
    }, maxResponseTime)
    const response = await fetch(url, { 'x-routify-valid-for': 3600})
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`)
    }
    const data = await response.json()
    return data
  } catch (err) {
    if (err.name === 'AbortError') {
      console.error('Response timed out')
    } else {
      console.error('Request failed:', err.message)
    }
    error.set(true);
  }
}

export async function postApi(url, formData, maxResponseTime = 10000) {
  try {
    const controller = new AbortController()
    const config = { signal: controller.signal }
    const timeout = setTimeout(() => {
      controller.abort()
    }, maxResponseTime)
    const response = await fetch(url, {
      method: 'POST',
      body: formData
    })
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`)
    }
    const data = await response.json()
    return data
  } catch (err) {
    if (err.name === 'AbortError') {
      console.error('Response timed out')
    } else {
      console.error('Request failed:', err.message)
    }
    error.set(true);
  }
}

export async function putApi(url, formData, maxResponseTime = 2000) {
  try {
    const controller = new AbortController()
    const config = { signal: controller.signal }
    const timeout = setTimeout(() => {
      controller.abort()
    }, maxResponseTime)
    const response = await fetch(url, {
      method: 'PUT',
      body: formData
    })
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`)
    }
    const data = await response.json()
    return data
  } catch (err) {
    if (err.name === 'AbortError') {
      console.error('Response timed out')
    } else {
      console.error('Request failed:', err.message)
    }
    error.set(true);
  }
}

export async function deleteApi(url, maxResponseTime = 2000) {
  try {
    const controller = new AbortController()
    const config = { signal: controller.signal }
    const timeout = setTimeout(() => {
      controller.abort()
    }, maxResponseTime)
    const response = await fetch(url, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`)
    }
    const data = await response.json()
    return data
  } catch (err) {
    if (err.name === 'AbortError') {
      console.error('Response timed out')
    } else {
      console.error('Request failed:', err.message)
    }
    error.set(true);
  }
}