import React,{useEffect,useState,useContext} from 'react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import {Container,Box,HStack,Badge, Text,Button,Center,Avatar,AvatarGroup} from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'
import { Link } from 'react-router-dom' 
import { Data } from '../../context/Context'

import '../../App.css'
import Homepage from './Homepage'
import axios from 'axios'
import { format } from 'timeago.js';




const All = () => {
const [quiz,setquiz]=useState([])
const{setpts}=useContext(Data)


useEffect(()=>{
  const data=async()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"));
    
    const config = {
      headers:{
        Authorization: `Bearer ${user.token}`,
           },
    };
       //points for all current user
       await axios.get('https://bizob.herokuapp.com/api/handlers/points',config).then((res)=>{
        setpts(res.data)
        console.log(res.data)
     }).catch((error)=>{
        alert(error)
     })
       //posts for all publications
      await axios.get('https://bizob.herokuapp.com/api/handlers/publications',config).then((res)=>{
         setquiz(res.data)
         console.log(res.data)
      }).catch((error)=>{
         alert(error)
      })
  }
  data()
},[])


  return (
    <>
    <div className='top'>
       <Homepage/>
    </div>
    <Container>
      <br />
        <Box padding='4' bg='blue.400' p={5} color='white' maxW='md' borderRadius='md'>
         hello welcome to the B I Z quiz app ,<br />
         create quiz and lets see who earns more points <br />
          ~ <b>obrickan</b>
         </Box>
    </Container>
    {quiz.map((dta)=>(
 <Container key={dta._id}>
 <Box padding='4'  h={250} mt={5} color='white' shadow='md' borderWidth='1px' maxW='md' borderRadius='md'>
  <Center>
    {/* content */}
  <HStack direction='row' mt={2} spacing={5} >
    <Badge>
       <Text color='black' fontSize='xs'>{format(dta.createdAt)}</Text>
    </Badge>
     <Badge>
      {`${dta.Questions.length} Questions`}
    </Badge>
    <Badge variant='solid' colorScheme='teal'>
       <Text color='white' fontSize={12}>{dta.quizname}</Text>
    </Badge>
  </HStack>
  {/* AvatarS*/}
  </Center>
<Center>
  <HStack>
  <AvatarGroup mt={10} size='sm' max={3} >
    <Avatar name={dta.user[0].username}/>
 </AvatarGroup>
  </HStack>
</Center>
  <Link to={{pathname:`/main2/${dta._id}`,state:dta}}>
   <Center mt={10}>
    <Button  color='white' bg='blue.400' width={250} >Begin Quiz</Button>
  </Center>
  </Link>
  <HStack spacing={4} mt={5}>
  <Badge variant='solid' colorScheme='teal' >
    <Text color='white' >{`${dta.user[0].username}`}</Text>
  </Badge>
  <HStack>
    <Icon as={CheckCircleIcon} w={5} h={5} color='green.400' />
    <Text color='black'>{`${dta.passed.length}`}</Text>
  </HStack>
  </HStack>
 </Box>
</Container>
    ))}
  
    </>
  )
}

export default All