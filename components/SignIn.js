import {
  Button,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack
} from '@chakra-ui/react'

export default function SignIn({ isOpen, onClose, signinGithub, signinGoogle }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>Sign in to manage your profiles</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody my={8}>
          <VStack spacing={8}>
            <HStack spacing={8}>
              <Image height={8} src="github-yellow.svg" alt="GitHub" />
              <Button
                colorScheme="yellow"
                color="white"
                borderRadius="2xl"
                onClick={() => signinGithub()}
              >
                Sign in with GitHub
              </Button>
            </HStack>
            <HStack spacing={8}>
              <Image height={8} src="google-yellow.svg" alt="Google" />
              <Button
                colorScheme="yellow"
                color="white"
                borderRadius="2xl"
                onClick={() => signinGoogle()}
              >
                Sign in with Google
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}
