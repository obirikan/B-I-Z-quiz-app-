import { createContext, useState } from "react";

export const Data=createContext()

const Context=({children})=>{
  const[que,setque]=useState([])
  const[score,setscore]=useState(0)
  const[link,setlink]=useState([])
  const[pts,setpts]=useState()

    return(
        <Data.Provider value={{que,setque,score,setscore,link,setlink,pts,setpts}}> 
          {children}
        </Data.Provider>
    )
}

export default Context