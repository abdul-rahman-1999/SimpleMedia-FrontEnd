import { createContext, useState, useEffect } from "react";
import axios from 'axios';

const AuthContext = createContext()


export const AuthContextProvider = ({children}) => {

  let [user, setUser] = useState([])
  const [user2,setUser2] = useState(false)

  useEffect(() => {

    const getUer = async () => {
      let email = localStorage.getItem("email")
      try{
        if(email){
          const res = await axios.get("http://localhost:8800/api/auth/" + email)
          setUser(res.data)
        }
       }catch(err){
       console.log(err)
      }
     }
     getUer()

  }, [user2])

  return(
    <AuthContext.Provider value={{ user, setUser, setUser2 }}>
      {children}
    </AuthContext.Provider>
  )
  
}

export default AuthContext
