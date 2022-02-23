import { Button, Checkbox, Flex, Heading, Link, Stack, Text, useToast } from '@chakra-ui/react'
import { pickBy } from 'lodash'
import { useReducer, useState } from 'react'
import semver from 'semver'
import useSWR from 'swr'

import fetcher from '@/utils/fetcher'

function ListSchemas({ dispatch, schemaList, state }) {
  return schemaList.map(schema => (
    <Stack spacing={2} isInline alignItems="flex-start" key={schema.name} mt={{ base: 4, md: 8 }}>
      <Checkbox
        mt={2}
        colorScheme="yellow"
        isChecked={state[schema.name]}
        onChange={() => dispatch({ type: 'toggle', name: schema.name })}
      />
      <Flex flexDirection="column">
        <Heading textStyle="h3">
          <Link href={schema.url} isExternal textDecoration="underline">
            {schema.title}
          </Link>{' '}
          (v{schema.name.slice(schema.name.lastIndexOf('-v') + 2)})
        </Heading>
        <Text>{schema.description}</Text>
      </Flex>
    </Stack>
  ))
}

export default function ProfileSelectSchemas({ profile, setProfile }) {
  let selectedSchemas = {}
  let schemaList = []
  const [state, dispatch] = useReducer(reducer, selectedSchemas)
  const [schemasSet, setSchemasSet] = useState(false)
  const { schemas } = profile
  const { data, error } = useSWR(
    process.env.NEXT_PUBLIC_MURMURATIONS_LIBRARY_API_URL + '/schemas',
    fetcher
  )
  const toast = useToast()

  if (error) console.error('fetch schemaList', error)

  if (data) {
    // Remove the default schema which is only used by the index for initial validation
    const initialList = data.data.filter(schema => !schema.name.includes('default-v'))
    const removeOldVersions = (acc, cv) => {
      const found = acc.find(({ title }) => title === cv.title)
      let currentVer = cv.name.slice(cv.name.lastIndexOf('-v') + 2)
      let foundVer = found?.name.slice(found.name.lastIndexOf('-v') + 2)
      if (foundVer != undefined && currentVer != undefined) {
        if (
          semver.lt(semver.valid(semver.coerce(foundVer)), semver.valid(semver.coerce(currentVer)))
        )
          acc = acc.filter(obj => obj.name !== found.name)
      }
      acc.push(cv)
      return acc
    }

    schemaList = initialList.reduce(removeOldVersions, [])

    if (!schemasSet) {
      schemaList.map(schema => {
        if (schemas.find(s => s === schema.name)) {
          selectedSchemas[schema.name] = true
          if (!state[schema.name]) {
            dispatch({ type: 'toggle', name: schema.name })
          }
        } else {
          selectedSchemas[schema.name] = false
        }
      })
      setSchemasSet(true)
    }
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
      toast({
        title: 'Error selecting schema',
        description: 'You need to select at least one schema to continue.',
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true
      })
    } else {
      setProfile({ ...profile, step: 2, schemas: pickedSchemas })
    }
  }

  return (
    <Flex flexDirection="column">
      <Flex
        width="100%"
        ml="auto"
        mr="auto"
        px={{ base: 2, md: 8, lg: 16 }}
        py={{ base: 8, md: 12, lg: 16 }}
        flexDirection="column"
        maxWidth="65rem"
        bg="gray.50"
        borderRadius="5px"
      >
        {data ? (
          <>
            <Text>
              You can use the same profile to add your data to multiple schemas at the same time.
            </Text>
            <Flex flexDirection="column">
              <ListSchemas dispatch={dispatch} schemaList={schemaList} state={state} />
            </Flex>
          </>
        ) : error ? (
          <Text>There was an error loading the schema list.</Text>
        ) : (
          <Text>Loading...</Text>
        )}
      </Flex>
      <Flex
        width="100%"
        ml="auto"
        mr="auto"
        my={{ base: 8, md: 16 }}
        px="2"
        flexDirection="column"
        alignItems="flex-end"
        maxWidth="65rem"
      >
        <Button
          variant="solid"
          size="md"
          fontSize={{ base: 'md', md: 'lg' }}
          colorScheme="red"
          borderRadius="25px"
          height={[6, 7, 8, 10]}
          _active={{
            transform: 'scale(0.95)'
          }}
          onClick={handleClick}
        >
          Continue to Step 2
        </Button>
      </Flex>
    </Flex>
  )
}
