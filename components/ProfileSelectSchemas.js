import { Button, Text } from '@chakra-ui/react'
import { pickBy } from 'lodash'
import { useReducer, useState } from 'react'
import useSWR from 'swr'

import fetcher from '@/utils/fetcher'

function ListSchemas({ dispatch, schemaList, selectedSchemas }) {
  return schemaList.map(schema => (
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
  ))
}

export default function ProfileSelectSchemas({ profile, setProfile }) {
  let selectedSchemas = {}
  let schemaList = []
  const [state, dispatch] = useReducer(reducer, selectedSchemas)
  const [selectError, setSelectError] = useState(false)
  // const { schemas } = profile
  const { data, error } = useSWR(
    process.env.NEXT_PUBLIC_MURMURATIONS_LIBRARY_API_URL + '/schemas',
    fetcher
  )

  if (error) console.error('fetch schemaList', error)

  if (data) {
    // Remove the default schema which is only used by the index for initial validation
    const initialList = data.data.filter(schema => schema.name !== 'default-v1')

    const removeOldVersions = (acc, cv) => {
      const found = acc.find(({ title }) => title === cv.title)
      if (found?.version < cv.version) acc = acc.filter(obj => obj.name !== found.name)
      acc.push(cv)
      return acc
    }

    schemaList = initialList.reduce(removeOldVersions, [])

    // TODO: Figure out how to only map over schemaList once so that going from step 2
    // back to step 1 does not cause the reducer state to get stuck to the schemas
    // listed in the profile state.

    // schemaList.map(schema => {
    //   if (schemas.find(s => s === schema.name)) {
    //     selectedSchemas[schema.name] = true
    //     if (!state[schema.name]) {
    //       dispatch({ type: 'toggle', name: schema.name })
    //     }
    //   } else {
    //     selectedSchemas[schema.name] = false
    //   }
    // })
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
      {selectError === true ? (
        <Text color="tomato">You need to select at least one network!</Text>
      ) : null}
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
