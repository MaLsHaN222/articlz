
import User from './pages/user'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import { Articles, Home, Login, Register, ResetPwd } from './pages/index.jsx'
import { useEffect} from 'react'
import { getuser } from './functions/getuser'
import { getPosts } from './functions/getPosts'
import { Add } from './components/user/Add'
import Edit from './components/user/Edit'
import Categorize from './components/Read/Categorize'
import ReadArticle from './components/Read/ReadArticle'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {


  getuser()

  const func = getPosts()

  useEffect(()=>{
    func
  },[])
  
  return (
    <BrowserRouter>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Home />}>
      </Route>
      
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/dashboard/:id' element={<User/>}>
      <Route index element={<Add/>} />
      <Route path='/dashboard/:id/add'  element={<Add/>} />
      <Route path='/dashboard/:id/edit' element={<Edit/>} />
      </Route>
      <Route path='/articles' element={<Articles/>} >
        <Route index element={<Categorize/>}/>
        <Route path='/articles/category' element={<Categorize/>}/>
        <Route path='/articles/read/:id' element={<ReadArticle/>}/>
      </Route>
      <Route path='/resetpassword' element={<ResetPwd/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
