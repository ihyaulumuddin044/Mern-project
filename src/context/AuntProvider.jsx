import React, {createContext , useState} from 'react'


export const AuntContext = createContext();
const AuntProvider = ({children}) => {
    const [user, setUser] = useState("joy");

    const authinfo = {
        user
    }
  return (
    <AuntContext.Provider value={{authinfo}}>
        {children}
    </AuntContext.Provider>
  )
}

export default AuntProvider