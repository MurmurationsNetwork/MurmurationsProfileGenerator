function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

// TODO - handle errors and pass them back to callers so it can render appropriate messages

export async function postNode(url) {
  return fetch(process.env.NEXT_PUBLIC_MURMURATIONS_INDEX_API_URL + '/nodes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: `{"profile_url": "${url}"}`
  })
    .then(handleErrors)
    .then(data => data.json())
    .catch(err => console.log('postNode error: ', err))
}

export async function getNodeStatus(node_id) {
  return fetch(`${process.env.NEXT_PUBLIC_MURMURATIONS_INDEX_API_URL}/nodes/${node_id}`)
    .then(res => res.json())
    .then(body => body)
}

export async function deleteNode(node_id) {
  return fetch(`${process.env.NEXT_PUBLIC_MURMURATIONS_INDEX_API_URL}/nodes/${node_id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  }).then(data => {
    if (data.status === 200) return data
    return data.json()
  })
}
