import {
  Button,
  Flex,
  Grid,
  GridItem,
  Link,
  Text,
  useBreakpointValue,
  useToast
} from '@chakra-ui/react'
import Form from '@rjsf/material-ui'
import { merge, union } from 'lodash'
import { useEffect, useState } from 'react'

import Geolocation from '@/components/Geolocation'
import parser from '@/utils/parser'

export default function ProfileCreateProfile({ profile, setProfile }) {
  const [formData, setFormData] = useState(profile.json)
  const [allSchemas, setAllSchemas] = useState(mergedSchemas)
  const [schemaList, setSchemaList] = useState([])
  const [formHasGeolocation, setFormHasGeolocation] = useState(false)
  const [clickedGeolocation, setClickedGeolocation] = useState(false)

  const selectedSchemas = profile.schemas
  let mergedSchemas = { type: 'object', properties: {} }
  let requiredProperties = []

  const toast = useToast()
  const geoBoxMargin = useBreakpointValue({
    base: 'auto',
    lg: 'none'
  })
  // Set grid column span and form right margin based on need for geolocation box
  let lg, mr
  formHasGeolocation ? ((lg = 2), (mr = 4)) : ((lg = 3), (mr = 16))

  useEffect(() => {
    selectedSchemas.forEach(schema => {
      let schemaUrl = `${process.env.NEXT_PUBLIC_MURMURATIONS_CDN_URL}/schemas/${schema}.json`
      parser(schemaUrl)
        .then(data => {
          mergedSchemas = merge({}, mergedSchemas, data)
          setSchemaList(oldList => {
            if (oldList?.some(item => item === data.title)) return oldList
            else return [...oldList, data.title]
          })
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
          delete mergedSchemas.title
          delete mergedSchemas.description
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

  function resetForm(e) {
    e.preventDefault()
    setFormData({})
  }

  function handleError() {
    toast({
      title: 'Error completing form',
      description:
        'Please check any error messages at the top of the form to ensure you have completed all fields and that they meet all of their requirements.',
      status: 'error',
      position: 'top',
      duration: 7500,
      isClosable: true
    })
  }

  function handleSubmit({ formData }) {
    if (formData) {
      formData.linked_schemas = profile.schemas
      setProfile({ ...profile, step: 3, json: formData, schemaNames: schemaList })
    } else {
      return
    }
  }

  return (
    <Flex flexDirection="column">
      <Text px={{ base: 4, md: 16 }} pb={8}>
        For the following schema{schemaList?.length > 1 ? <span>s</span> : null}:{' '}
        {schemaList?.map(schema => (
          <strong key={schema}> &nbsp;&nbsp;&nbsp; {schema}</strong>
        ))}
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" templateRows="repeat(1, 1fr)">
        {formHasGeolocation ? (
          <GridItem
            colSpan={{ base: 3, lg: 1 }}
            colStart={{ base: 1, lg: 3 }}
            px={{ base: 4, md: 8 }}
            pb={8}
          >
            <Flex
              border="1px"
              borderColor="gray.300"
              borderRadius="5px"
              width={{ base: '100%', md: '80%' }}
              p={2}
              mx={geoBoxMargin}
              justifyContent="center"
              flexDirection="column"
            >
              {clickedGeolocation ? (
                <Geolocation formData={formData} setFormData={setFormData} />
              ) : (
                <>
                  <Text>
                    The profile form asks for your geolocation coordinates. To get your current
                    location, click the button above and then allow your browser to let this website
                    know your location.
                  </Text>
                  <Button
                    variant="solid"
                    fontSize={{ base: 'md', md: 'lg' }}
                    colorScheme="red"
                    borderRadius="25px"
                    height={[6, 7, 8, 10]}
                    my={4}
                    mx="auto"
                    _active={{
                      transform: 'scale(0.95)'
                    }}
                    onClick={handleClickGeo}
                  >
                    Geolocate Me
                  </Button>
                  <Text>
                    If you prefer to give less specific location information,{' '}
                    <Link href="https://www.latlong.net/" color="orange.500" isExternal>
                      use this website
                    </Link>{' '}
                    to determine your latitude and longitude.
                  </Text>
                </>
              )}
            </Flex>
          </GridItem>
        ) : null}
        <GridItem
          colSpan={{ base: 3, lg: lg }}
          colStart={{ base: 1, lg: 1 }}
          rowStart={{ base: 2, lg: 1 }}
          border="1px"
          borderColor="gray.300"
          borderRadius="5px"
          ml={{ base: 4, md: 8, lg: 16 }}
          mr={{ base: 4, md: 8, lg: mr }}
          mb={{ base: 4, md: 8, lg: 16 }}
          p={4}
        >
          {allSchemas ? (
            <Form
              schema={allSchemas}
              formData={formData}
              onChange={({ formData }) => {
                setFormData(formData)
              }}
              onSubmit={handleSubmit}
              onError={handleError}
            >
              <Flex
                width="100%"
                mx="auto"
                // my={{ base: 8, md: 16 }}
                // px={{ base: 4, md: 8, lg: 16 }}
                flexDirection={{ base: 'column', md: 'row' }}
                justifyContent="space-between"
                alignItems="center"
              >
                <Button
                  as="button"
                  variant="outline"
                  size="md"
                  fontSize={{ base: 'md', md: 'lg' }}
                  colorScheme="red"
                  borderRadius="25px"
                  height={[6, 7, 8, 10]}
                  my={{ base: 2, md: 0 }}
                  minWidth="12rem"
                  _active={{
                    transform: 'scale(0.95)'
                  }}
                  onClick={() => setProfile({ ...profile, step: 1, json: formData })}
                >
                  Back to Step 1
                </Button>
                <Button
                  as="button"
                  variant="outline"
                  size="md"
                  fontSize={{ base: 'md', md: 'lg' }}
                  colorScheme="yellow"
                  borderRadius="25px"
                  height={[6, 7, 8, 10]}
                  my={{ base: 2, md: 0 }}
                  minWidth="12rem"
                  _active={{
                    transform: 'scale(0.95)'
                  }}
                  onClick={resetForm}
                >
                  Clear Form
                </Button>
                <Button
                  as="button"
                  variant="solid"
                  size="md"
                  fontSize={{ base: 'md', md: 'lg' }}
                  colorScheme="red"
                  borderRadius="25px"
                  height={[6, 7, 8, 10]}
                  my={{ base: 2, md: 0 }}
                  minWidth="12rem"
                  _active={{
                    transform: 'scale(0.95)'
                  }}
                  onClick={handleSubmit}
                >
                  Continue to Step 3
                </Button>
              </Flex>
            </Form>
          ) : null}
        </GridItem>
      </Grid>
    </Flex>
  )
}
