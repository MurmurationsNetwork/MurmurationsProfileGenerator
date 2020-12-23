import { Button, Text } from '@chakra-ui/react'
import { pickBy } from 'lodash'
import { useReducer, useState } from 'react'
import useSWR from 'swr'

import fetcher from '@/utils/fetcher'

function ListSchemas({ dispatch, schemaList, selectedSchemas }) {
  return (
    schemaList.data
      // Remove the default schema which is only used by the index
      // for initial validation
      .filter(schema => schema.name !== 'default-v1')
      .map(schema => {
        return (
          <Text key={schema.name}>
            <input
              type="checkbox"
              defaultChecked={selectedSchemas[schema.name]}
              onClick={() => dispatch({ type: 'toggle', name: schema.name })}
            />
            <a href={schema.url} rel="noreferrer" target="_blank">
              <strong>{schema.title}</strong>
            </a>{' '}
            (version {schema.version}) -- {schema.description}
          </Text>
        )
      })
  )
}

export default function ProfileSelectSchemas({ profile, setProfile }) {
  let selectedSchemas = {}
  let schemaList = []
  const [state, dispatch] = useReducer(reducer, selectedSchemas)
  const [selectError, setSelectError] = useState(false)
  const { schemas } = profile
  const { data, error } = useSWR(
    process.env.NEXT_PUBLIC_MURMURATIONS_LIBRARY_API_URL + '/schemas',
    fetcher
  )

  if (error) console.error('fetch schemaList', error)

  if (data) {
    schemaList = data
    schemaList.data.map(schema => {
      if (schemas.find(s => s === schema.name)) {
        selectedSchemas[schema.name] = true
        if (!state[schema.name]) {
          dispatch({ type: 'toggle', name: schema.name })
        }
      } else {
        selectedSchemas[schema.name] = false
      }
    })
  }

  function reducer(state, action) {
    switch (action.type) {
      case 'toggle':
        return { ...state, [action.name]: !state[action.name] }
      default:
        throw new Error()
    }
  }

  function handleClick() {
    let pickedSchemas = Object.keys(pickBy(state))
    if (pickedSchemas.length === 0) {
      setSelectError(true)
    } else {
      setProfile({ ...profile, step: 2, schemas: pickedSchemas })
    }
  }

  return (
    <div>
      <Text>Select Schemas</Text>
      <Button onClick={handleClick}>Next</Button>
      {selectError === true ? <Text>You need to select at least one network!</Text> : null}
      {data ? (
        <ListSchemas
          dispatch={dispatch}
          schemaList={schemaList}
          selectedSchemas={selectedSchemas}
        />
      ) : error ? (
        <Text>There was an error loading the schema list.</Text>
      ) : (
        <Text>Loading...</Text>
      )}
    </div>
  )
}
