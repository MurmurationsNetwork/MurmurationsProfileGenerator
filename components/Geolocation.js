import { Button, Link, Text } from '@chakra-ui/react'
import { useEffect, useReducer } from 'react'

function geoPositionReducer(state, action) {
  switch (action.type) {
    case 'error': {
      return {
        ...state,
        status: 'rejected',
        error: action.error
      }
    }
    case 'success': {
      return {
        ...state,
        status: 'resolved',
        position: action.position
      }
    }
    case 'start': {
      return {
        ...state,
        status: 'pending'
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function useGeoPosition() {
  const [state, dispatch] = useReducer(geoPositionReducer, {
    status: 'idle',
    position: null,
    error: null
  })

  useEffect(() => {
    if (!navigator.geolocation) {
      dispatch({
        type: 'error',
        error: new Error('Geolocation is not supported')
      })
      return
    }
    dispatch({ type: 'start' })
    const geoWatch = navigator.geolocation.watchPosition(
      position => dispatch({ type: 'success', position }),
      error => dispatch({ type: 'error', error })
    )
    return () => navigator.geolocation.clearWatch(geoWatch)
  }, [])

  return state
}

export default function YourPosition({ formData, setFormData }) {
  const { status, position, error } = useGeoPosition()
  const lat = Number(position?.coords.latitude.toFixed(4))
  const lon = Number(position?.coords.longitude.toFixed(4))

  if (error) console.error(error)

  if (status === 'idle' || status === 'pending') {
    return (
      <>
        <Text>Loading your position...</Text>
        <Text>
          If your position does not load, please{' '}
          <Link color="orange.500" href="https://www.latlong.net/" isExternal>
            use this website
          </Link>{' '}
          to determine your latitude and longitude.
        </Text>
      </>
    )
  }

  if (status === 'resolved') {
    return (
      <>
        <Text>Your current position is:</Text>
        <Text>Lat: {Number(position.coords.latitude.toFixed(4))}</Text>
        <Text>Lon: {Number(position.coords.longitude.toFixed(4))}</Text>
        <Text>
          <Link
            color="orange.500"
            href={`https://maps.google.com/?q=${Number(
              position.coords.latitude.toFixed(4)
            )},${Number(position.coords.longitude.toFixed(4))}`}
            isExternal
          >
            View on Google Maps
          </Link>
        </Text>
        <Button onClick={() => setFormData({ ...formData, geolocation: { lat: lat, lon: lon } })}>
          Add to Form
        </Button>
      </>
    )
  }

  if (status === 'rejected') {
    return (
      <>
        <Text>Location services are not enabled on your device.</Text>
        <Text>
          Please{' '}
          <Link color="orange.500" href="https://www.latlong.net/" isExternal>
            use this website
          </Link>{' '}
          to determine your latitude and longitude.
        </Text>
      </>
    )
  }
}
