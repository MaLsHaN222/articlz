import React from 'react'
import { useSelector  } from 'react-redux'
import Navbar from '../components/HomePage/Navbar'
import main from '../assets/main.jpg'
import './home.css'
import { Contact } from '../components/HomePage/Contact'
import About from '../components/HomePage/About'
import Features from '../components/HomePage/Features'
import { motion } from 'framer-motion'



const Home = () => {

  const userId = useSelector((state)=>state.userAuth.userId)

  
  return (
    <>
        <Navbar userId={userId}/>

        <div className="mainimg" style={{backgroundImage:`url(${main})`}}>
            <h2>Welcome</h2>
            <h3>To</h3>
            <motion.h1
            animate={{opacity:1 , scale:1}}
            transition={{duration:1.2}}
            initial={{opacity:0 , scale:0}}
            >ARTICLZ</motion.h1>      
            
        </div>
        <Features/>
        <Contact/>
        <About/>
        <footer>
          <h4>Created by Ishara Malshan De Silva</h4>
        </footer>

    </>
  )
}

export default Home