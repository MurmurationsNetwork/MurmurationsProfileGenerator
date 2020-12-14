export function postProfileUrl(url) {
  return fetch(process.env.NEXT_PUBLIC_MURMURATIONS_INDEX_API_URL + '/nodes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: `{"profile_url": "${url}"}`
  }).then((data) => data.json())
}
