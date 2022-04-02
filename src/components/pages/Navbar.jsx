import React from 'react'
import { Input,Stack,Box,Button,HStack} from '@chakra-ui/react'
import { useState,useEffect } from 'react'
import '../../App.css'
import {useHistory} from 'react-router-dom'
import Homepage from './Homepage'
import axios from 'axios'

const Navbar = () => {
const history=useHistory()
const [quizname,setname]=useState()

useEffect(() => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  if (!user) history.push("/login");
}, []);




  const[Questions,setQ]=useState([{
    question:'',
    optionA:'',
    optionB:'',
    optionC:'',
    optionD:'',
    answer:'',
  }])

  const handle=(index,event)=>{
   const values=[...Questions]
   values[index][event.target.name]=event.target.value.toUpperCase()
   setQ(values)
  }

  const nxt= async()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    await axios.post('https://bizob.herokuapp.com/api/handlers/publish',{quizname,Questions},config).then(()=>(
    setQ([{
        question:'',
        optionA:'',
        optionB:'',
        optionC:'',
        optionD:'',
        answer:'',
      }
    ])
    )
    ).catch((error)=>
     console.log(error)
    )
  }

  const submit=()=>{
    setQ([...Questions,
      {
        question:'',
        optionA:'',
        optionB:'',
        optionC:'',
        optionD:'',
        answer:'',
      }
    ])
    console.log(Questions)
  }
  return (
  <>
  <Homepage/>
  <Box m={5}>
   <h1 className='text'><b>Create  Quiz</b></h1>
   <br />
   <Input placeholder='Quiz name' size='md' type='text' value={quizname} onChange={(e)=>setname(e.target.value)} />
  {
        Questions.map((questions,index)=>(
          <Stack spacing={6} key={index}>
  <br />
  <h3><b  className='text'>{`Question ${index+1}`}</b></h3>
  <Input placeholder='Question' size='md' type='text' name="question" value={questions.question} onChange={(event)=>handle(index,event)} />
  <Input placeholder='OptionA' size='md' type='text' name="optionA"  value={questions.optionA} onChange={(event)=>handle(index,event)}/>
  <Input placeholder='OptionB' size='md' type='text' name="optionB"  value={questions.optionB} onChange={(event)=>handle(index,event)}/>
  <Input placeholder='OptionC' size='md' type='text' name="optionC"  value={questions.optionC} onChange={(event)=>handle(index,event)}/>
  <Input placeholder='OptionD' size='md' type='text' name="optionD"  value={questions.optionD} onChange={(event)=>handle(index,event)} />
  <Input placeholder='Answer( A / B / C / D )' size='md'  type='text'  name="answer"  value={questions.answer} onChange={(event)=>handle(index,event)} />
        </Stack>
        ))
  }
  <HStack spacing={20} mt={5}>
    <Button bg='teal' color='white' onClick={nxt}>Submit Quiz</Button>
    <Button bg='teal' color='white' onClick={submit}>add question</Button>
  </HStack>
  </Box>
</>
  )
}

export default Navbar