import { Button, Link, Text } from '@chakra-ui/react'
import { materialCells, materialRenderers } from '@jsonforms/material-renderers'
import { JsonForms } from '@jsonforms/react'
import { isEqual, merge, union } from 'lodash'
import { useEffect, useState } from 'react'

import parser from '@/utils/parser'
import Geolocation from '@/components/Geolocation'

export default function ProfileCreateProfile({ profile, setProfile }) {
  const [validationErrors, setValidationErrors] = useState([])
  const [valid, setValid] = useState(true)
  const [profileSubmitted, setProfileSubmitted] = useState(false)
  const [formData, setFormData] = useState(profile.json)
  const [allSchemas, setAllSchemas] = useState(mergedSchemas)
  const [schemaList, setSchemaList] = useState([])
  const [formHasGeolocation, setFormHasGeolocation] = useState(false)
  const [clickedGeolocation, setClickedGeolocation] = useState(false)

  const selectedSchemas = profile.schemas
  let mergedSchemas = { type: 'object', properties: {} }
  let requiredProperties = []

  useEffect(() => (validationErrors.length !== 0 ? setValid(false) : setValid(true)))
  useEffect(() => {
    selectedSchemas.forEach(schema => {
      let schemaUrl = `${process.env.NEXT_PUBLIC_MURMURATIONS_CDN_URL}/schemas/${schema}.json`
      parser(schemaUrl)
        .then(data => {
          mergedSchemas = merge({}, mergedSchemas, data)
          setSchemaList(oldList => [...oldList, data.title])
          // Remove `$schema` property so JSON Forms doesn't freak out
          delete mergedSchemas['$schema']
          // Remove the required property `linked_schemas` from form so it will validate
          let schemaRequiredProperties = mergedSchemas.required.filter(
            req => req !== 'linked_schemas'
          )
          // Then merge together all other required properties from the selected schemas
          requiredProperties = union(requiredProperties, schemaRequiredProperties)
          mergedSchemas.required = requiredProperties
          // Remove `linked_schemas` so user does not have to type them in
          delete mergedSchemas.properties.linked_schemas
          mergedSchemas.properties.geolocation ? setFormHasGeolocation(true) : null
          setAllSchemas(mergedSchemas)
        })
        .catch(error => console.error('parse schema', error))
    })
  }, [])

  function handleClickGeo(e) {
    e.preventDefault()
    setClickedGeolocation(true)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setProfileSubmitted(true)
    if (valid) {
      formData.linked_schemas = profile.schemas
      setProfile({ ...profile, step: 3, json: formData, schemaNames: schemaList })
    } else {
      return
    }
  }

  return (
    <div>
      <Text>Create Schema</Text>
      <Button onClick={() => setProfile({ ...profile, step: 1, json: formData })}>Back</Button>
      <Button onClick={handleSubmit}>Next</Button>
      {formHasGeolocation ? (
        <>
          <Button onClick={handleClickGeo}>Geolocation</Button>
          {clickedGeolocation ? (
            <Geolocation formData={formData} setFormData={setFormData} />
          ) : (
            <>
              <Text>
                The profile form asks for your geolocation coordinates. To get your current
                location, click the Geolocation button above and then allow your browser to let this
                website know your location.
              </Text>
              <Text>
                If you prefer to give less specific location information,{' '}
                <Link href="https://www.latlong.net/" color="orange.500" isExternal>
                  use this website
                </Link>{' '}
                to determine your latitude and longitude.
              </Text>
            </>
          )}
        </>
      ) : null}
      <Text>
        Using the following schema{schemaList.length > 1 ? <span>s</span> : null}:{' '}
        {schemaList.map(schema => (
          <strong key={schema}> &nbsp;&nbsp;&nbsp; {schema}</strong>
        ))}
      </Text>
      {!valid && profileSubmitted ? (
        <Text color="tomato">
          Please check any error messages in the form to ensure you have completed all fields and
          that they meet all of their requirements.
        </Text>
      ) : null}
      <JsonForms
        schema={allSchemas}
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
