// import './App.css';
import Home from './components/pages/Home'
import {Route,BrowserRouter} from 'react-router-dom'
import All from './components/pages/All'
import Main2 from "./components/quizPage/Main2"
import Navbar from './components/pages/Navbar'
import People from './components/pages/People'
import End from './components/quizPage/End'
function App() {
  return (
  <>
     {/* <Homepage/> */}
    <BrowserRouter>
      <Route path='/main2/:id' component={Main2} exact />
      <Route path='/people' component={People} exact />
      <Route path='/' component={All} exact />
      <Route path='/end' component={End} exact />
      <Route path='/nav' component={Navbar} exact />
      <Route path='/login' component={Home}  exact/>
   </BrowserRouter>
  </>
  );
}

export default App;
