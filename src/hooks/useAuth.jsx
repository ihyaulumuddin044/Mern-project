import React, { useContext } from 'react'
import { AuntContext } from '../context/AuntProvider'

const useAuth = () => {
    const auth = useContext(AuntContext)
  return auth
}

export default useAuth