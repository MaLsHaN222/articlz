import React, { useRef } from 'react'
import contact from '../../assets/contact.png'
import './contact.css'
import { motion } from 'framer-motion'

export const Contact = () => {
  const ref = useRef(null)
  return (
    <div ref={ref} className='contactMain'>
      
      <motion.img 
      initial={{scale:0}}
      whileInView={{
        scale:1 ,
        transition:{duration:0.5}
      }}
      src={contact} alt="" />

    <div className="contactForm">
      <h1>Contact Us</h1>
      <p>Thank You for trying to reach us. Since this is a sample website there are no any contact details. If you need to contact the developer please send a email to <span>isharamalshandesilva@outlook.com</span></p>
    </div>
</div>
  )
}
