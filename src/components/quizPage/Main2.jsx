import React,{useEffect,useState,useContext} from 'react'
import '../../App.css'
import {Data} from '../../context/Context'
import { Container,Box,Center,Button,VStack,Heading,Text} from '@chakra-ui/react'
import { Progress } from '@chakra-ui/react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

const Main2 = (props) => {
  const{score,setscore,que,setlink,setque}=useContext(Data)
  const[current,setcurrent]=useState(0)
  const history=useHistory()
  const[optionChosen,setOption]=useState('')

  useEffect(()=>{
         setscore(0)
  },[])
 
  let a=props.location.state
   setlink(a)
   let {Questions}=a
   setque(Questions)
   

  const nextQuestion=(a)=>{
    if(Questions[current].answer === optionChosen){
      setscore(score + 1)
    }
    setcurrent(current+1)
 }

   const finishQuiz=()=>{
    if(Questions[current].answer === optionChosen){
      setscore(score + 1)
    }
    history.push('/end')
  }


  return (
    <div className='parent'>
      <Container maxW='2xl' h={300} bg='teal' centerContent>
        <Box w={350}>
            <Text color='teal'>heloo</Text>
            <Progress hasStripe value={(current+1)/Questions.length*100} size='xs' colorScheme='green'  />
        </Box>
        <Center>
        <Box padding='4' mt={100}  color='white' maxW='md'>
          <Heading size='lg' fontSize='30px'>{Questions[current].question}</Heading>
        </Box>
        </Center>
    </Container>
    <Container maxW='2xl' h={350}  centerContent>
        <Center>
           <VStack mt={10} spacing={5}>
             <Button p={5} w={300} onClick={()=>setOption('A')} bg='blue.400'color='white'  >{Questions[current].optionA}</Button>
             <Button p={5} w={300} onClick={()=>setOption('B')} bg='blue.400'color='white'  >{Questions[current].optionB}</Button>
             <Button p={5} w={300} onClick={()=>setOption('C')} bg='blue.400'color='white'  >{Questions[current].optionC}</Button>
             <Button p={5} w={300} onClick={()=>setOption('D')} bg='blue.400'color='white' >{Questions[current].optionD}</Button>
           </VStack>
        </Center>
        <div>
          {current===Questions.length-1?
           (<Button mt={5} w={200} bg='tomato'color='white' onClick={finishQuiz}>finish quiz</Button>):
          (<Button mt={5} w={200} bg='teal'color='white' onClick={nextQuestion}>next question</Button>)  
         }
        </div>
    </Container>
    </div>
  )
}

export default Main2