export async function getSchemas() {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_MURMURATIONS_LIBRARY_API_URL + '/schemas')
    const schemas = await res.json()

    return schemas
  } catch (error) {
    console.error('getSchemas', error)
    return {}
  }
}
