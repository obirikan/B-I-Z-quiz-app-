import React,{useState,useEffect} from 'react'
import { Button } from '@chakra-ui/react'
import '../App.css'
import { Stack,Heading} from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'
import { useHistory } from "react-router-dom";
import axios from 'axios'

const Login = () => {
    const [username,setname]=useState('')
    const [password,setpassword]=useState('')
    const history = useHistory();

        const submit= async ()=>{
        if(username===' '&&password===' '){
         alert('fill in all')
        }else{
            const config = {
                headers: {
                  "Content-type": "application/json",
                },
              };
             await axios.post('https://bizob.herokuapp.com/api/user/login',{username,password},config).then((res)=>{
             console.log(res.data)
             if(res.data){
              localStorage.setItem("userInfo",JSON.stringify(res.data))
              history.push("/");
             }
            ;
             setname('')
             setpassword('')
           }).catch((error)=>{
             alert('wrong username or password')
           })
        }
 }
  return (
     <>
<Center>
     <Stack spacing={3}>
      <Center><Heading className='box'  bg='#3182ce'><Center mt={2.5} color='white'> B I Z</Center></Heading></Center>
        <h3>name</h3>
        <Input variant='filled' type='text' placeholder='username' value={username} onChange={(e)=>setname(e.target.value)} />
        <h3>password</h3>
        <Input variant='filled' type='password' placeholder='password' value={password} onChange={(e)=>setpassword(e.target.value)} />
         <br/>
        <Button colorScheme='blue' onClick={submit}>login</Button>
    </Stack>
   
</Center>
     </>
  )
}

export default Login