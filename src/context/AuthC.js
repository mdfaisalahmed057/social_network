import React, { Children, useContext } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { createContext,useEffect,useState } from 'react'
 import { auth } from '../../firebase'

export const AuthContext=useContext()
function AuthC({Children}) {
  const[currentUser,setCurrentUser]=useState({})
  useEffect(()=>{
    const unsub=onAuthStateChanged(auth,(user)=>{
      setCurrentUser(user)
    })
    return()=>{
      unsub()
    }
  },[])
  return (
    <AuthContext.Provider value={{currentUser}}>
   {Children}
    </AuthContext.Provider>
  )
}

export default AuthC
