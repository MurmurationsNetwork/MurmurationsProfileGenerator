import { Button, Text, useColorMode } from '@chakra-ui/react'

export default function AppShell({ children }) {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Text align="center" color="tomato">
        Please note that this is a TEST/DEMO only. Any data posted here to Murmurations will
        eventually be wiped (probably in early February 2021 if not before).
      </Text>
      <Text align="center" color="tomato">
        Don't post any information you would not be comfortable revealing on a public website
        accessible to the world.
      </Text>
      <Button onClick={toggleColorMode}>{colorMode === 'light' ? '🌙' : '☀️'}</Button>
      {children}
    </>
  )
}
