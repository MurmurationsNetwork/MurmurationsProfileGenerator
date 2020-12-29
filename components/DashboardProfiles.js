import { Button, HStack, Text } from '@chakra-ui/react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import Router from 'next/router'
import { useState } from 'react'
import { mutate } from 'swr'

import { deleteNode } from '@/lib/api'
import { useAuth } from '@/lib/auth'
import { deleteProfile } from '@/lib/db'

export default function DashboardProfiles({ profiles, setProfile }) {
  const [selectedNodeId, setSelectedNodeId] = useState('')
  const [selectedHostId, setSelectedHostId] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const auth = useAuth()
  const toast = useToast()

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
              duration: 5000,
              isClosable: true
            })
          } else {
            toast({
              title: 'Error deleting profile',
              description: 'There was an error when deleting the profile from the index.',
              status: 'error',
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
            duration: 5000,
            isClosable: true
          })
        } else if (response.status === 400) {
          toast({
            title: 'Profile still exists',
            description:
              'The profile must first be deleted from your node before it can be removed from the index.',
            status: 'error',
            duration: 5000,
            isClosable: true
          })
        } else if (response.status === 404) {
          toast({
            title: 'Could not find profile',
            description: 'The profile you submitted for deletion does not exist in the index.',
            status: 'error',
            duration: 5000,
            isClosable: true
          })
        } else {
          toast({
            title: 'Error deleting profile',
            description: 'There was an error when deleting the profile from the index.',
            status: 'error',
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
    <div>
      {profiles.map(profile => (
        <HStack key={profile.node_id}>
          <Button onClick={() => handleUpdate(profile.node_id)}>Update</Button>
          <Button onClick={() => handleDelete(profile.node_id, profile.hostId)}>Delete</Button>
          <Text>
            <strong>{profile.status}</strong> -- {profile.url} - {profile.schemas}
          </Text>
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
    </div>
  )
}
