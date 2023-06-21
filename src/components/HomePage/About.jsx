import React from 'react'
import about from '../../assets/about2.png';
import './about.css';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="aboutMain">
        <div className="content">
            <h1>About</h1>
            <p>This is a sample website project. please do not use this website for real-life purposes. 
                The contents inside This website do not belong to me and 
                they have been taken from websites like medium.com . <br /> <br />
                HTML , CSS  , React js and Firebase are the technologies used to create this website.
                <br /> <br />
                If you want to contact the developer please use the details in the Contact Us page. <br /> <br />
                Thank you! 
                </p>
        </div>
        <motion.img
        initial={{scale:0}}
        whileInView={{
          scale:1 ,
          transition:{duration:0.5}
        }}
         src={about} alt="" />
    </div>
  )
}

export default About