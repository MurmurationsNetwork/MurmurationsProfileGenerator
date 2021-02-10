import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useBreakpointValue,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import Router from 'next/router'
import { useState } from 'react'
import { mutate } from 'swr'

import { deleteNode } from '@/lib/api'
import { useAuth } from '@/lib/auth'
import { deleteProfile } from '@/lib/db'
import { useProfile } from '@/lib/profile'

export default function DashboardProfiles({ profiles, setProfile }) {
  const [selectedNodeId, setSelectedNodeId] = useState('')
  const [selectedHostId, setSelectedHostId] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const auth = useAuth()
  const toast = useToast()
  const { resetProfile } = useProfile()
  const screenSize = useBreakpointValue({
    base: 'mobile',
    sm: 'tablet',
    lg: 'desktop'
  })

  function handleNewProfile() {
    resetProfile()
    Router.push('/profile')
  }

  function handleUpdate(node_id) {
    fetch(`/api/${node_id}`)
      .then(response => response.json())
      .then(data => {
        setProfile({ step: 1, ...data })
        Router.push('/profile')
      })
  }

  function handleDelete(node_id, hostId) {
    onOpen()
    setSelectedNodeId(node_id)
    setSelectedHostId(hostId)
  }

  function deleteNodeProfile() {
    if (selectedHostId) {
      mutate(
        ['/api/profiles', auth.user.token],
        async data => data.filter(profile => profile.node_id !== selectedNodeId),
        false
      )
        .then(mutate('/api/profiles', deleteProfile(selectedNodeId)))
        .then(() => {
          return deleteNode(selectedNodeId)
        })
        .then(response => {
          if (response.status === 200) {
            toast({
              title: 'Profile deleted',
              description: 'The profile has been removed from the index.',
              status: 'success',
              position: 'top',
              duration: 5000,
              isClosable: true
            })
          } else {
            toast({
              title: 'Error deleting profile',
              description: 'There was an error when deleting the profile from the index.',
              status: 'error',
              position: 'top',
              duration: 5000,
              isClosable: true
            })
          }
        })
    }
    if (!selectedHostId) {
      deleteNode(selectedNodeId).then(response => {
        if (response.status === 200) {
          toast({
            title: 'Profile deleted',
            description: 'The profile has been removed from the index.',
            status: 'success',
            position: 'top',
            duration: 5000,
            isClosable: true
          })
        } else if (response.status === 400) {
          toast({
            title: 'Profile still exists',
            description:
              'The profile must first be deleted from your node before it can be removed from the index.',
            status: 'error',
            position: 'top',
            duration: 5000,
            isClosable: true
          })
        } else if (response.status === 404) {
          toast({
            title: 'Could not find profile',
            description: 'The profile you submitted for deletion does not exist in the index.',
            status: 'error',
            position: 'top',
            duration: 5000,
            isClosable: true
          })
        } else {
          toast({
            title: 'Error deleting profile',
            description: 'There was an error when deleting the profile from the index.',
            status: 'error',
            position: 'top',
            duration: 5000,
            isClosable: true
          })
        }
      })
    }
    setSelectedNodeId('')
    setSelectedHostId('')
    onClose()
  }

  function cancelDelete() {
    setSelectedNodeId('')
    setSelectedHostId('')
    onClose()
  }

  return (
    <Flex flexDirection="column">
      {profiles[0] ? (
        screenSize === 'mobile' ? (
          <Accordion width="100%" bgColor="yellow.500" defaultIndex={[0]} allowMultiple>
            {profiles.map(profile => (
              <AccordionItem key={profile.node_id}>
                <h2>
                  <AccordionButton fontSize="80%" color="white">
                    <Box flex="1" textAlign="left" maxWidth="100%">
                      <Text isTruncated>{profile.url}</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} fontSize="80%" bgColor="gray.50">
                  <Flex flexDirection="column" alignItems="center">
                    <HStack mt={2}>
                      <Button
                        variant="solid"
                        size="md"
                        fontSize="sm"
                        colorScheme="red"
                        borderRadius="5px"
                        height={7}
                        _active={{
                          transform: 'scale(0.95)'
                        }}
                        onClick={() => handleUpdate(profile.node_id)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="solid"
                        size="md"
                        fontSize="sm"
                        colorScheme="yellow"
                        color="white"
                        borderRadius="5px"
                        height={7}
                        _active={{
                          transform: 'scale(0.95)'
                        }}
                        onClick={() => handleDelete(profile.node_id, profile.hostId)}
                      >
                        Delete
                      </Button>
                    </HStack>
                  </Flex>
                  <Text mt={4}>
                    Status:{' '}
                    <Text as="span" fontWeight={700} textTransform="capitalize" color="yellow.600">
                      {profile.status}
                    </Text>
                  </Text>
                  {/* TODO: Convert date format to something more familiar */}
                  <Text>Last Updated: {new Date(profile.updated).toISOString()}</Text>
                  <Text>
                    Schema{profile.schemaNames.length > 1 ? 's' : null}:{' '}
                    {profile.schemaNames.map((schema, index) => {
                      return (
                        <Text as="span" key={schema}>
                          {schema}
                          {index === profile.schemaNames.length - 1 ? null : ', '}
                        </Text>
                      )
                    })}
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        ) : screenSize === 'tablet' ? (
          <Accordion width="100%" bgColor="yellow.500" defaultIndex={[0]} allowMultiple>
            {profiles.map(profile => (
              <AccordionItem key={profile.node_id}>
                <h2>
                  <AccordionButton fontSize="80%" color="white">
                    <Box flex="1" textAlign="left" maxWidth="100%">
                      <Text isTruncated>{profile.url}</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} fontSize="80%" bgColor="gray.50">
                  <Flex justifyContent="space-between">
                    <Flex flexDirection="column">
                      <Text mt={4}>
                        Status:{' '}
                        <Text
                          as="span"
                          fontWeight={700}
                          textTransform="capitalize"
                          color="yellow.600"
                        >
                          {profile.status}
                        </Text>
                      </Text>
                      {/* TODO: Convert date format to something more familiar */}
                      <Text>Last Updated: {new Date(profile.updated).toISOString()}</Text>
                      <Text>
                        Schema{profile.schemaNames.length > 1 ? 's' : null}:{' '}
                        {profile.schemaNames.map((schema, index) => {
                          return (
                            <Text as="span" key={schema}>
                              {schema}
                              {index === profile.schemaNames.length - 1 ? null : ', '}
                            </Text>
                          )
                        })}
                      </Text>
                    </Flex>
                    <HStack spacing={4}>
                      <Button
                        variant="solid"
                        size="md"
                        fontSize="sm"
                        colorScheme="red"
                        borderRadius="5px"
                        height={7}
                        _active={{
                          transform: 'scale(0.95)'
                        }}
                        onClick={() => handleUpdate(profile.node_id)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="solid"
                        size="md"
                        fontSize="sm"
                        colorScheme="yellow"
                        color="white"
                        borderRadius="5px"
                        height={7}
                        _active={{
                          transform: 'scale(0.95)'
                        }}
                        onClick={() => handleDelete(profile.node_id, profile.hostId)}
                      >
                        Delete
                      </Button>
                    </HStack>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <Flex
            bg="gray.50"
            p={{ base: 4, md: 8 }}
            my={{ base: 4, md: 8 }}
            borderRadius="15px"
            flexDirection="column"
            alignItems="center"
            width="100%"
          >
            Desktop!
          </Flex>
        )
      ) : (
        <>
          <Flex alignItems="center" flexDirection="column">
            <Text>You do not have any profiles yet.</Text>
            <Button
              variant="solid"
              size="md"
              fontSize={{ base: 'md', md: 'lg' }}
              colorScheme="red"
              borderRadius="25px"
              width="10rem"
              height={[6, 7, 8, 10]}
              my={4}
              _active={{
                transform: 'scale(0.95)'
              }}
              onClick={() => handleNewProfile()}
            >
              Create a Profile
            </Button>
          </Flex>
        </>
      )}
    </Flex>
  )
}

/* 
<Flex fontSize={{ base: '80%', md: '100%' }} flexDirection="column" maxWidth="100%">
  {profiles.map(profile => (
    <Text as="u" color="blue.500" key={profile.node_id} isTruncated>
      <a href={profile.url} target="_blank" rel="noreferrer noopener">
        {profile.url}
      </a>
    </Text>
  ))}
</Flex>
*/

/*
{profiles.map(profile => (
  <HStack key={profile.node_id}>
    <Button onClick={() => handleUpdate(profile.node_id)}>Update</Button>
    <Button onClick={() => handleDelete(profile.node_id, profile.hostId)}>Delete</Button>
    <Text>
      <strong>{profile.status}</strong> -- {new Date(profile.updated).toISOString()} --{' '}
    </Text>
    <Text as="u" color="blue.500">
      <a href={profile.url} target="_blank" rel="noreferrer noopener">
        {profile.url}
      </a>
    </Text>
    {profile.schemaNames.map(schema => {
      return <Text key={schema}>{schema}</Text>
    })}
  </HStack>
))}
<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Delete Profile</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <Text>
        {selectedHostId
          ? `Are you sure? Deleting your profile will remove your data from the
              index and any networks that are using your profile.`
          : `To remove your profile from the index, please delete the JSON file
              from your website. Then click on the Delete button below.`}
      </Text>
    </ModalBody>
    <ModalFooter>
      <Button onClick={deleteNodeProfile}>Delete</Button>
      <Button onClick={cancelDelete}>Cancel</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
*/
