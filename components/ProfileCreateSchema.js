import { useEffect, useState } from 'react'
import { Button, Text } from '@chakra-ui/react'
import useSWR from 'swr'
import { merge, isEqual } from 'lodash'
import { JsonForms } from '@jsonforms/react'
import { materialRenderers, materialCells } from '@jsonforms/material-renderers'
import parser from '@/utils/parser'

export default function ProfileCreateSchema({ profile, setProfile }) {
  console.log('ProfileCreateSchema/profile', profile)
  const [validationErrors, setValidationErrors] = useState([])
  const [valid, setValid] = useState(true)
  const [profileSubmitted, setProfileSubmitted] = useState(false)
  const [formData, setFormData] = useState(profile.json)
  const selectedSchemas = profile.schemas
  let schemaList = []
  let mergedSchemas = { type: 'object', properties: {} }

  useEffect(() => (validationErrors.length !== 0 ? setValid(false) : setValid(true)))

  selectedSchemas.forEach((schema) => {
    let schemaUrl = `${process.env.NEXT_PUBLIC_MURMURATIONS_CDN_URL}/schemas/${schema}.json`
    const { data, error } = useSWR(schemaUrl, parser)
    if (error) console.error('fetch schemas', error)
    mergedSchemas = merge({}, mergedSchemas, data)
    if (data) {
      schemaList.push(data.title)
      // Remove `$schema` property so JSON Forms doesn't freak out
      delete mergedSchemas['$schema']
      // Remove the required property `linked_schemas` from form so it will validate
      let filteredRequirements = mergedSchemas.required
      mergedSchemas.required = filteredRequirements.filter((req) => req !== 'linked_schemas')
      // Remove `linked_schemas` so user does not have to type them in
      delete mergedSchemas.properties.linked_schemas
    }
  })

  function handleSubmit(e) {
    e.preventDefault()
    setProfileSubmitted(true)
    if (valid) {
      setProfile({ ...profile, step: 3, json: formData })
    } else {
      return
    }
  }

  return (
    <div>
      <Text>Create Schema</Text>
      <Button m={1} onClick={() => setProfile({ ...profile, step: 1, json: formData })}>
        Back
      </Button>
      <Button m={1} onClick={handleSubmit}>
        Next
      </Button>
      <Button m={1} onClick={() => setFormData({ ...formData, geolocation: { lat: 12, lon: 13 } })}>
        Geolocation
      </Button>
      <Text>
        Using the following schema{schemaList.length > 1 ? <span>s</span> : null}:{' '}
        {schemaList.map((schema) => (
          <strong key={schema}> &nbsp;&nbsp;&nbsp; {schema}</strong>
        ))}
      </Text>
      {!valid && profileSubmitted ? (
        <Text>You have not filled in all of the required fields.</Text>
      ) : null}
      <JsonForms
        schema={mergedSchemas}
        renderers={materialRenderers}
        cells={materialCells}
        data={formData}
        onChange={({ errors, data }) => {
          if (!isEqual(data, formData)) {
            setProfileSubmitted(false)
          }
          if (!isEqual(errors, validationErrors)) {
            setValidationErrors(errors)
          }
          setFormData(data)
        }}
      />
    </div>
  )
}
