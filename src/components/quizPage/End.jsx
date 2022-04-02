import React, { useEffect, useState } from 'react'
import {Data} from '../../context/Context'
import { useContext } from 'react'
import {Link} from 'react-router-dom'
import {Container,Center,Heading,VStack,Button} from '@chakra-ui/react'
import axios from 'axios'
const End = () => {
const{score,que,link}=useContext(Data)
const[percent,setpercent]=useState(0)
const[point]=useState(1)
const[pass,setpass]=useState(0)
const[done,setdone]=useState(true)
const[id,setid]=useState('')
const[err,seterr]=useState('')




useEffect(()=>{
    const data=()=>{

        const per=parseInt(score/que.length*100)
        setpercent(per)
        const num=parseInt(0.60*100)
        setpass(num)
        setid(link._id)
       }
       data()
},[])

const claim=async()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
          await axios.post('https://bizob.herokuapp.com/api/handlers/contributions',{point,id},config).then((res)=>{
            console.log(res.data)
            if(res.data.msg===undefined){
              seterr('You have earned a point')
            }else{
              seterr(res.data.msg)
            }
           setdone(false)
          }).catch((error)=>{
              console.log(error)
          })
}
  return (
    <>
      <Center >
          <Container p={10} w={750} className='center'>
              <VStack>
              <Heading ml={5} fontSize={30}>{`You Scored ${percent}%`}</Heading>
              <Center>
              {percent>pass?
              (done?<Button mt={10} color='white' bg='teal' onClick={claim}>claim reward</Button>:(<Button>{err}</Button>))
              :(<Link to={{pathname:`/main2/${link._id}`,state:link}}><Button mt={10} color='white' bg='tomato'>retake Quiz</Button></Link>)}
              </Center>
               <Link to='/'><Button>Go Home</Button></Link>
              </VStack>
          </Container>
      </Center>
    </>
  )
}

export default End