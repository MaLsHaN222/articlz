import React, {  useState } from 'react'
import './article.css';
import Navbar from '../components/HomePage/Navbar'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const Articles = () => {

  const category = useSelector((state)=>state.allPosts.category)
  const navigate = useNavigate()

  const [type ,setType] = useState('All')

  const changeArticle = (e , Type) =>{
    e.preventDefault()
    setType(Type)
    navigate('/articles')
  }
    
  return (
    <>
    <Navbar/>
    <div className="articleMain">
        <div className="typeField">
        <h2>Category</h2>
            <div className="types">
            <span onClick={(e)=>changeArticle(e , 'All')}>All</span>
            {
              category.map((type)=>{
        
               return(
                <span onClick={(e)=>changeArticle(e , type)}>{type}</span>
               )
              })
            }
            </div>
        </div>
        <Outlet context={type}/>
    </div>
    </>
  )
}

export default Articles