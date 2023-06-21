import React, { useEffect, useState } from 'react'
import './features.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cardView } from '../../animations/featureComp';
import loading from '../../assets/loading.gif'

const Features = () => {
  const data = useSelector((state) => state.allPosts.posts)
  const [filtered , setFiltered] = useState([])
  
  const navigate = useNavigate()

  const filter = ()=>{
    
    data.map((item)=>{
      if(filtered.length<4){
        const check = filtered.includes(item)
        if(check===false){
          setFiltered([...filtered,item])
        }
      } else{

      }
    })
 
  }

  useEffect(()=>{
   filter() 
  })
  
  

  return (
    <div className='featureMain'>
      <h1>Latest Articles</h1>
      <div className="newArea">
      {
      filtered.length>0 ?
      filtered.map((item , index)=>{
        return(
          <motion.div 
          variants={cardView}
          custom={index}
          initial='hidden'
          whileInView='visible'
          whileHover='hover'
          className="card">
            <img src={item.imgUrl} alt="" />
            <h1>{item.title}</h1>
            <button onClick={()=>navigate('/articles')}>Show More</button>
          </motion.div>
        )
      }) :
      <img className='loadingHome' src={loading} />
    }
      </div>
    </div>
  )
}

export default Features