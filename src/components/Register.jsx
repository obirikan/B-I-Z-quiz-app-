import React,{useState} from 'react'
import { Button } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Center,Heading } from '@chakra-ui/react'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import '../App.css'


const Register = () => {
    const [username,setname]=useState('')
    const [password,setpassword]=useState('')
    const [email,setemail]=useState('')

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
         await axios.post('https://bizob.herokuapp.com/api/user/register',{username,email,password},config).then((res)=>{
          console.log(res.data)
          if(res.data){
           localStorage.setItem("userInfo",JSON.stringify(res.data))
           history.push("/");
          }
         setname('')
         setpassword('')
       }).catch((error)=>{
          alert('username already exist')
       })
    }

}

  return (
    <>
      <Center>
     <Stack spacing={3}>
       <Center><Heading className='box'  bg='#3182ce'><Center mt={2.5} color='white'> B I Z</Center></Heading></Center>
        <h3>name</h3>
        <Input variant='filled' placeholder='username' type="text" value={username} onChange={(e)=>setname(e.target.value)} />
        <h3>email</h3>
        <Input variant='filled' placeholder='email' type='email' value={email} onChange={(e)=>setemail(e.target.value)} />
        <h3>password</h3>)
        <Input variant='filled' placeholder='password' type="password" value={password} onChange={(e)=>setpassword(e.target.value)} />
         <br/>
        <Button colorScheme='blue' onClick={submit}>Register</Button>
    </Stack>
   
</Center>
    </>
  )
}

export default Register