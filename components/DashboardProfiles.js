import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
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
  Table,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
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
          // TODO - handle index being down
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
      // TODO - handle index being down
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
            description: 'There was an error while deleting the profile from the index.',
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
                        colorScheme="yellow"
                        color="white"
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
                        colorScheme="red"
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
                        colorScheme="yellow"
                        color="white"
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
                        colorScheme="red"
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
            p={4}
            my={8}
            borderRadius="15px"
            flexDirection="column"
            alignItems="center"
            width="100%"
          >
            <Table variant="unstyled">
              <Thead>
                <Tr color="gray.500">
                  <Td>URL</Td>
                  <Td>Status</Td>
                  <Td>Last Updated</Td>
                  <Td>Schemas</Td>
                </Tr>
              </Thead>
              <Tbody fontSize="80%">
                {profiles.map(profile => (
                  <Tr key={profile.node_id}>
                    <Td>
                      <HStack width="25rem">
                        <Text isTruncated>{profile.url}</Text>
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
                          onClick={() => handleDelete(profile.node_id, profile.hostId)}
                        >
                          Delete
                        </Button>
                      </HStack>
                    </Td>
                    <Td>
                      <Badge colorScheme="yellow" variant="outline">
                        {profile.status}
                      </Badge>
                    </Td>
                    <Td>
                      <HStack justifyItems="flex-end" spacing={2}>
                        <Text>{new Date(profile.updated).toISOString().slice(0, 10)}</Text>
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
                          onClick={() => handleUpdate(profile.node_id)}
                        >
                          Update
                        </Button>
                      </HStack>
                    </Td>
                    <Td>
                      {profile.schemaNames.map((schema, index) => {
                        return (
                          <Text as="span" key={schema}>
                            {schema}
                            {index === profile.schemaNames.length - 1 ? null : ', '}
                          </Text>
                        )
                      })}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
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
                : `To remove your profile from the index, first delete the JSON file
              from your website, then click on the Delete button below.`}
            </Text>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button
              variant="solid"
              size="sm"
              fontSize={{ base: 'md', md: 'lg' }}
              colorScheme="red"
              borderRadius="10px"
              height={8}
              my={4}
              width="6rem"
              _active={{
                transform: 'scale(0.95)'
              }}
              onClick={deleteNodeProfile}
            >
              Delete
            </Button>
            <Button
              variant="solid"
              size="sm"
              fontSize={{ base: 'md', md: 'lg' }}
              colorScheme="yellow"
              color="white"
              borderRadius="10px"
              height={8}
              ml={16}
              my={4}
              width="6rem"
              _active={{
                transform: 'scale(0.95)'
              }}
              onClick={cancelDelete}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
