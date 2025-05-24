import fetch from 'node-fetch'

export const sendPost = async <T>(url: string, body: T) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
    return response
  } catch (e) {
    console.log({ e })
    throw new Error(`sendPost failed: ${body}`)
  }
}

export const sendGet = async (url: string) => {
  try {
    const res = fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    return res
  } catch (e) {
    console.log({ e })
    throw new Error('sendGET failed')
  }
}
