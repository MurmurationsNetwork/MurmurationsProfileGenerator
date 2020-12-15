import refParser from '@apidevtools/json-schema-ref-parser'

export default async function parser(data) {
  try {
    return await refParser.dereference(data)
  } catch (error) {
    console.error('refParser', error)
  }
}
