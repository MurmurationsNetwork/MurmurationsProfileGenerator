import { Button, useColorMode } from '@chakra-ui/react'

export default function AppShell({ children }) {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Button onClick={toggleColorMode}>{colorMode === 'light' ? '🌙' : '☀️'}</Button>
      {children}
    </>
  )
}
