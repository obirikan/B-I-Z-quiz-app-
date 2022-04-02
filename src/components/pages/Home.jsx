import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../Login'
import Register from '../Register'
const Home = () => {
  return (
<>
 <Tabs isFitted variant='enclosed'>
     <TabList mb='1em'>
         <Tab>Login</Tab>
         <Tab>Register</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
         <Login/>
    </TabPanel>
    <TabPanel>
         <Register/>
    </TabPanel>
  </TabPanels>
</Tabs> 
</>
  )
}

export default Home