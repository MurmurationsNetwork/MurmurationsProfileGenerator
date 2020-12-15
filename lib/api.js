export async function postProfileUrl(url) {
  return fetch(process.env.NEXT_PUBLIC_MURMURATIONS_INDEX_API_URL + '/nodes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: `{"profile_url": "${url}"}`
  }).then(data => data.json())
}

export async function getProfileStatus(node_id) {
  return fetch(`${process.env.NEXT_PUBLIC_MURMURATIONS_INDEX_API_URL}/nodes/${node_id}`)
    .then(res => res.json())
    .then(body => body)
}
