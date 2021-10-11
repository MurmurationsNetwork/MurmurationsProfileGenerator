import Router from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'

import { createUser } from '@/lib/db'
import firebase from '@/lib/firebase'

const authContext = createContext()

export function AuthProvider({ children }) {
  const auth = useAuthProvider()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export function useAuth() {
  return useContext(authContext)
}

function useAuthProvider() {
  const [user, setUser] = useState(null)

  const handleUser = rawUser => {
    if (rawUser?.providerData) {
      const user = formatUser(rawUser)
      // Remove token to prevent it from being posted to DB
      // eslint-disable-next-line
      const { token, ...userWithoutToken } = user

      createUser(user.uid, userWithoutToken)
      setUser(user)
      return user
    } else {
      setUser(false)
      return false
    }
  }

  const signinWithGithub = redirect => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then(response => {
        handleUser(response)
        if (redirect) {
          Router.push(redirect)
        }
      })
      .catch(error => console.error(error))
  }

  const signinWithGoogle = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(response => handleUser(response.user))
      .catch(error => console.error(error))
  }

  const signupWithEmail = (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => handleUser(response.user))
      .catch(error => console.error(error))
  }

  const signinWithEmail = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => handleUser(response.user))
      .catch(error => console.error(error))
  }

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false)
        Router.push('/')
      })
      .catch(error => console.error(error))
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(handleUser)

    return () => unsubscribe()
  }, [])

  return {
    user,
    signinWithEmail,
    signupWithEmail,
    signinWithGithub,
    signinWithGoogle,
    signout
  }
}

function formatUser(user) {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    token: user.ya
  }
}
