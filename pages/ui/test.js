import { AspectRatio, Box, Container, Image, Text } from '@chakra-ui/react'

export default function App() {
  return (
    <Box>
      <Text>Boxes</Text>
      <Box
        bg={['gray.300', 'green.300', 'yellow.300', 'blue.300', 'red.300']}
        fontSize={['xs', null, 'md', null, 'xl']}
        w="100%"
        p={{ base: 2, sm: 4, lg: 8 }}
      >
        This is a responsive Box
      </Box>
      {/* <AspectRatio ratio={4 / 3}>
        <Image
          src="https://bit.ly/naruto-sage"
          alt="naruto"
          objectFit="cover"
          h={'3xl'}
          // w={'xl'}
          opacity={'.5'}
        />
      </AspectRatio>
      <Box w={'lg'} h={'lg'} bg="tomato" borderRadius={'full'} />
      <Box as="button" borderRadius="md" bg="tomato" color="white" px={4} h={5}>
        Button
      </Box> */}
      <Container maxW="xl" centerContent>
        <Box padding="4" bg="gray.100" maxW="3xl">
          There are many benefits to a joint design and development system. Not only does it bring
          benefits to the design team.
        </Box>
      </Container>
    </Box>
  )
}
