import React from 'react'
import { useEffect,useState,useContext } from 'react'
import {Data} from '../../context/Context'
import { Link } from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import { Flex, Spacer,Box,Button,Heading,Stack,Text,Avatar,Badge} from '@chakra-ui/react'
import {useDisclosure} from '@chakra-ui/react'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'

import {
  Tag,
  TagLabel,
} from '@chakra-ui/react'

const Homepage = () => {
const{pts}=useContext(Data)
const { isOpen, onOpen, onClose } = useDisclosure()
const [users,setuser]=useState('')
const btnRef = React.useRef()
const history=useHistory()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    setuser(user)
    if (!user) history.push("/login");
  }, []);
console.log(users)
 const logout=()=>{
    localStorage.removeItem("userInfo");
    history.push('/login')
 }
  return (
<>
    <Flex className='top' borderWidth='1px' shadow='sm'>
    <Box  p='2' >
      <Heading size='2xl' color='teal' ml={1}>B I Z</Heading>
    </Box>
    <Spacer />
    <Box m={2}>
      <Button>
            <Avatar  
                  ref={btnRef}
                  onClick={onOpen}
                  size='sm'
                  name={users.username}
                  // ml={-1}
                  // mr={2}
                 />
                <Badge>{pts}</Badge>
      </Button>
    </Box>
  </Flex>
  <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton mt={2}/>
          <DrawerHeader>
          <Tag size='lg' pl={4} w={150}  ml={-4} colorScheme='teal' borderRadius='full'>
                <Avatar
                  size='xs'
                  name={users.username}
                  mr={2}
                 />
          <TagLabel>{`${users.username} ${pts} `}</TagLabel>
          </Tag>
          </DrawerHeader>
          <DrawerBody>
          <Stack spacing={3}>
             <Link to='/'><Text fontSize='2xl'>Home</Text></Link>
             <Link to='/nav'><Text fontSize='2xl'>Create Quiz</Text></Link>
             <Link to='/people'><Text fontSize='2xl'>Stats</Text></Link>
             <Text fontSize='2xl' onClick={logout}>logout</Text>
          </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
</>
  )
}

export default Homepage