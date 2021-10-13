import {
  Button,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
  useToast,
  VStack
} from '@chakra-ui/react'
import { useState } from 'react'

import { useAuth } from '@/lib/auth'

export default function SignIn({ isOpen, onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signup, setSignup] = useState(false)
  const handleEmailChange = event => setEmail(event.target.value)
  const handlePasswordChange = event => setPassword(event.target.value)
  const { signinWithGithub, signinWithGoogle, signinWithEmail, signupWithEmail } = useAuth()
  const toast = useToast()
  const [show, setShow] = useState(false)

  function handleMask() {
    setShow(!show)
  }

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
      if (error.code == 'auth/wrong-password') {
        toast({
          title: 'Wrong Password',
          description: 'The password you have entered is invalid.',
          status: 'error',
          position: 'top',
          duration: 5000,
          isClosable: true
        })
      } else if (error.code == 'auth/user-not-found') {
        toast({
          title: 'User Not Found',
          description:
            'There is no user record corresponding to this email address. The user may have been deleted.',
          status: 'error',
          position: 'top',
          duration: 5000,
          isClosable: true
        })
      } else {
        toast({
          title: 'Sign In Error',
          description: error.code,
          status: 'error',
          position: 'top',
          duration: 5000,
          isClosable: true
        })
      }
    } else {
      toast({
        title: 'Sign In Completed',
        description: 'You are now signed in.',
        status: 'success',
        position: 'top',
        duration: 5000,
        isClosable: true
      })
      setEmail('')
      setPassword('')
      onClose()
    }
  }

  async function signupEmail(email, password) {
    const error = await signupWithEmail(email, password)
    if (error.code) {
      if (error.code == 'auth/email-already-in-use') {
        toast({
          title: 'Already In Use',
          description: 'The email address is already in use by another account.',
          status: 'error',
          position: 'top',
          duration: 5000,
          isClosable: true
        })
      } else {
        toast({
          title: 'Sign Up Error',
          description: error.code,
          status: 'error',
          position: 'top',
          duration: 5000,
          isClosable: true
        })
      }
    } else {
      toast({
        title: 'Sign Up Completed',
        description: 'You are now signed in.',
        status: 'success',
        position: 'top',
        duration: 5000,
        isClosable: true
      })
      setEmail('')
      setPassword('')
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
                <InputGroup>
                  <Input
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    type={show ? 'text' : 'password'}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleMask}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
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
                <InputGroup>
                  <Input
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    type={show ? 'text' : 'password'}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleMask}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
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
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}
