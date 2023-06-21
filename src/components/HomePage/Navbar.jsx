import './navbar.css'
import React, { useState } from 'react'
import menu from '../../assets/menu-burger.png'
import { Link, useNavigate } from 'react-router-dom'
import {  signOut } from 'firebase/auth'
import { auth } from '../../firebase/firebase'
import { useSelector } from 'react-redux'
import { getuser } from '../../functions/getuser'

const Navbar = () => {
  const navigate = useNavigate()
  const size = window.innerWidth
  const [check, setCheck] = useState(false)
  getuser()

  const userId = useSelector((state)=>state.userAuth.userId)
  
 

  const navItems = [
    {name:'Home' , url:'/'},
    {name:'Read' , url:'/articles'},
  ]

  const notLog = [
    {name:'Log In' , url:'/login'},
    {name:'Register', url:'/register'}
  ]
  


  const logOut = ()=>{
    signOut(auth).then(()=>{
      navigate('/login')
    })
  }

 


  return (
    <>
      <nav>
        <h1>ARTICLZ</h1>
        {size > 700 ? (
          <>
            <div className="spans">
              {
                navItems.map((item)=>{
                  return(
                    <span>
                      <Link className='remove' 
                      to={item.url}>{item.name}
                      </Link>
                      </span>
                  )
                })
              }
            </div>
            <div className="userItems">
            {
            userId? 
            <>
            <Link className='remove' to={'/dashboard/:id'}><span>DashBoard</span></Link>
            <span onClick={()=>logOut()}>Log Out</span>
            </>
            :
            notLog.map((item)=>{
              return(
                <span><Link className='remove' to={item.url}>{item.name}</Link></span>
              )
            }) 
          }
            </div>
          </>
        ) :
          <img onClick={() => setCheck(!check)} src={menu} />
        }
      </nav>
      {check === true ? (
        <div className="menuBar">
          <div className="close" onClick={() => setCheck(false)}>
          </div>
          <div className="linkSec">
          {
                navItems.map((item)=>{
                  return(
                    <span><Link className='remove' to={item.url}>{item.name}</Link></span>
                  )
                })  
              }
          {
             userId? 
             <>
             <Link className='remove' to={'/dashboard/:id'}><span>DashBoard</span></Link>
             <span onClick={()=>logOut()}>Log Out</span>
             </>
             :
             notLog.map((item)=>{
               return(
                <span><Link className='remove' to={item.url}>{item.name}</Link></span>
               )
             }) 
          }
          </div>
        </div>
      ) : ''}
    </>
  )
}

export default Navbar