import { Button, HStack, Text } from '@chakra-ui/react'
import Router from 'next/router'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { useState } from 'react'

export default function DashboardProfiles({ profiles, setProfile }) {
  const [selectedNodeId, setSelectedNodeId] = useState('')
  const [selectedHostId, setSelectedHostId] = useState('')

  const { isOpen, onOpen, onClose } = useDisclosure()

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

  function deleteProfile() {
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
            <Button onClick={deleteProfile}>Delete</Button>
            <Button onClick={cancelDelete}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
