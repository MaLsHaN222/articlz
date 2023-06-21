import React from 'react'
import {  useSelector } from 'react-redux'


const ReadArticle = () => {
  const article = useSelector((state)=>state.allPosts.readPost)
  

  
  return (
    <div className='articleArea'>
      <div className="article">
        <h1>{article.title}</h1>
        <img src={article.imgUrl}  />
        <p dangerouslySetInnerHTML={{__html:article.description}} />
        <h3>By <br /> {article.username}</h3>
      </div>
    </div>
  )
}

export default ReadArticle