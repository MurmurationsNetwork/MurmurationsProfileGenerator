import { Button, Text } from '@chakra-ui/react'
import { pickBy } from 'lodash'
import { useReducer, useState } from 'react'

function SchemasList({ dispatch, schemaList, selectedSchemas }) {
  return schemaList.data.map((schema) => {
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
}

export default function ProfileSelectSchemas({ profile, setProfile, schemaList }) {
  let selectedSchemas = {}
  const [state, dispatch] = useReducer(reducer, selectedSchemas)
  const [error, setError] = useState(false)
  const { schemas } = profile

  schemaList.data.map((schema) => {
    if (schemas.find((s) => s === schema.name)) {
      selectedSchemas[schema.name] = true
    } else {
      selectedSchemas[schema.name] = false
    }
  })

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
      setError(true)
    } else {
      setProfile({ ...profile, step: 2, schemas: pickedSchemas })
    }
  }

  return (
    <div>
      <Text>Select Schemas</Text>
      <Button m={1} onClick={handleClick}>
        Next
      </Button>
      {error === true ? <Text>You need to select at least one network!</Text> : null}
      <SchemasList dispatch={dispatch} schemaList={schemaList} selectedSchemas={selectedSchemas} />
    </div>
  )
}
