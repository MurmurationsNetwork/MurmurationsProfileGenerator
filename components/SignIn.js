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
  Switch,
  Text,
  VStack
} from '@chakra-ui/react'
import { useState } from 'react'

import { useAuth } from '@/lib/auth'

export default function SignIn({ isOpen, onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signup, setSignup] = useState(false)
  const [errorCode, setErrorCode] = useState('')
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

  async function signinEmail(email, password) {
    const error = await signinWithEmail(email, password)
    if (error.code) {
      setErrorCode(error.code)
      console.error('There was an error: ', error.code)
    } else {
      setErrorCode('')
      onClose()
    }
  }

  async function signupEmail(email, password) {
    const error = await signupWithEmail(email, password)
    if (error.code) {
      setErrorCode(error.code)
      console.error('There was an error: ', error.code)
    } else {
      setErrorCode('')
      onClose()
    }
  }

  function handleToggle() {
    setSignup(!signup)
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
            <HStack spacing={4}>
              <Text>Or Sign in/Sign up with Email</Text>
            </HStack>
          </VStack>
          <VStack spacing={4} margin={4}>
            <HStack spacing={4} isInline justifyContent="flex-start" alignItems="flex-start">
              <Text fontWeight="600">Sign In</Text>
              <Switch size="lg" colorScheme="yellow" onChange={handleToggle} />
              <Text fontWeight="600">Sign up</Text>
            </HStack>
            {signup ? (
              <>
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
              </>
            ) : (
              <>
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
              </>
            )}
          </VStack>
          <VStack spacing={4} margin={4}>
            {errorCode ? <Text>There was an error: {errorCode}</Text> : null}
          </VStack>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}
