import React,{useState,useEffect} from 'react'
import Homepage from './Homepage'
import axios from 'axios'

import '../../App.css'
import {
    Stat,
    StatLabel,
    StatNumber,
    Heading,
  } from '@chakra-ui/react'
  import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,Button
  } from '@chakra-ui/react'
  


const People = () => {
const[username,setusername]=useState('')
const[points,setpoints]=useState(0)
const[posts,setpost]=useState(0)
const[passed,setpassed]=useState(0)
const[all,setall]=useState([])

    useEffect(()=>{
        const data=async()=>{
            const user = JSON.parse(localStorage.getItem("userInfo"));
            const   config = {
                   headers:{
                     Authorization: `Bearer ${user.token}`,
                        },
                 };
            await axios.get('https://bizob.herokuapp.com/api/handlers/users',config).then((res)=>{
                const {user,post}=res.data

                setusername(user.username)
                setpoints(user.points)
                setpost(user.posts)
                setpassed(post.length)
                setall(user.posts)
                console.log(res.data)
            }).catch((error)=>{
               alert(error)
            })
        }
        data()
      },[posts])

     let handle=async(id)=>{
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
     await axios.delete(`https://bizob.herokuapp.com/api/handlers/delete/${id}`,config).then((res)=>{
        const it=all.filter((ids)=>(ids._id !== id))
        setall(it)
      }).catch((error)=>{
          console.log(error)
      })
    }
  return (
      <>
        <Homepage/>
        <Stat m={5} >
            <StatLabel><Heading color='teal' className='txt'>{username}</Heading></StatLabel>
            <br />
            <StatNumber>{`Points: ${points}`}</StatNumber>
            <br />
            <StatNumber>{`PassedQuiz: ${passed}`}</StatNumber>
            <br />
            <StatNumber>{`Posts: ${posts.length}`}</StatNumber>
        </Stat>
        <TableContainer>
  <Table variant='simple'>
    <Thead>
      <Tr>
        <Th>QuizName</Th>
        <Th>passed your quiz</Th>
        <Th isNumeric>_____</Th>
      </Tr>
    </Thead>
    <Tbody>
        {all.map((each)=>(
            <Tr key={each._id}>
               <Td>{each.quizname}</Td>
                <Td>{each.passed.length}</Td>
                <Td><Button color='white' bg='tomato' onClick={()=>handle(each._id)}>delete</Button></Td>
            </Tr>
        ))}
    </Tbody>
  </Table>
</TableContainer>
      </>
  )
}

export default People