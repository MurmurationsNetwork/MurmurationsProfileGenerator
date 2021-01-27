import { Flex, Image, useBreakpointValue } from '@chakra-ui/react'

export default function Test() {
  const image = useBreakpointValue({
    base: 'https://via.placeholder.com/360',
    sm: 'https://via.placeholder.com/480',
    md: 'https://via.placeholder.com/768',
    lg: 'https://via.placeholder.com/992',
    xl: 'https://via.placeholder.com/1280'
  })

  return (
    <Flex>
      <Image src={image} />
    </Flex>
  )
}
