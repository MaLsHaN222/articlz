import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/HomePage/Navbar'
import UserPosts from '../components/user/UserPosts'
import './user.css'

const User = () => {
  const params = useParams()
  const userId = useSelector((state) => state.userAuth.userId)
  params.id = userId

  const navigate = useNavigate()
  const ref = useRef(null)

  const scroll = ()=>{
    ref.current?.scrollIntoView({behavior:'smooth'})
  }



  const create = (e)=>{
    e.preventDefault()
    scroll()
    navigate('/dashboard/:id/add')
    
  }
 

  return (
    <>
      <Navbar />
      <div className="userField">
        <div className="userPosts">
          <button onClick={(e)=>create(e)}> Create New</button>
          <div className="postArea">
            <h1>Your posts</h1>
            <UserPosts />
          </div>
        </div>
        <div ref={ref} className="editArea">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default User