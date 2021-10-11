import {
  Button,
  HStack,
  Image,
  Input,
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
import { useState } from 'react'

import { useAuth } from '@/lib/auth'

export default function SignIn({ isOpen, onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleEmailChange = event => setEmail(event.target.value)
  const handlePasswordChange = event => setPassword(event.target.value)
  const { signinWithGithub, signinWithGoogle, signinWithEmail, signupWithEmail } = useAuth()

  function signinGithub() {
    signinWithGithub()
    onClose()
  }

  function signinGoogle() {
    signinWithGoogle()
    onClose()
  }

  function signinEmail(email, password) {
    signinWithEmail(email, password)
    onClose()
  }

  function signupEmail(email, password) {
    signupWithEmail(email, password)
    onClose()
  }

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
          <Text>Signup</Text>
          <Input value={email} onChange={handleEmailChange} placeholder="Email" />
          <Input value={password} onChange={handlePasswordChange} placeholder="Password" />
          <Button
            colorScheme="yellow"
            color="white"
            borderRadius="2xl"
            onClick={() => signupEmail(email, password)}
          >
            Sign up with Email
          </Button>
          <Text>Signin</Text>
          <Input value={email} onChange={handleEmailChange} placeholder="Email" />
          <Input value={password} onChange={handlePasswordChange} placeholder="Password" />
          <Button
            colorScheme="yellow"
            color="white"
            borderRadius="2xl"
            onClick={() => signinEmail(email, password)}
          >
            Sign in with Email
          </Button>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}
