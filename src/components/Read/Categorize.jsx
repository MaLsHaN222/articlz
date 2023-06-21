import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './categorize.css'
import {  useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { getReadPost } from '../../redux/slices/postslice'
import { motion } from 'framer-motion'
import { thumbs } from '../../animations/readPage'
import loading from '../../assets/loading.gif'

const Categorize = () => {

    const type = useOutletContext()
    const params = useParams()
    const navigate = useNavigate()

    const data = useSelector((state) => state.allPosts.posts)
    const dispatch = useDispatch()

    const [posts, setPosts] = useState([])

    const getAllposts = (type) => {
        data.map((post) => {
            const check = posts.includes(post)
            if (type == 'All') {
                if (check === false) {
                    setPosts([...posts, post])
                    
                } else {

                }
            } else {
                if (check === false && post.category === type) {
                    setPosts([...posts, post])
                } else {

                }
            }
        })
    }

    useEffect(()=>{
        getAllposts(type)
        
      })
      useEffect(()=>{
        setPosts([])
        
      },[type])

      const goToRead = (post)=>{
        
        params.id = post.postId
      //  console.log(post.postId)
        dispatch(getReadPost(post))
        navigate('/articles/read/:id')
      }


    return (
        <div className="categoryArea">
            <h1>{type}</h1> 
            <div className="thumbfield">
            {
                posts.length > 0 ?
                    posts.map((post , index) => {
                        //console.log(index)
                        return (
                            <>
                                <motion.div
                                variants={thumbs}
                                custom={index}
                                initial= 'hidden'
                                animate='visible'
                                id="thumb">
                                    <div id='thumbnail'>
                                    <img  src={post.imgUrl} />
                                    <h4>{post.title}</h4>
                                    </div>
                                    <div id="postfunc">
                                        <button onClick={()=>goToRead(post)}>Read</button>
                                    </div>
                                </motion.div>
                            </>
                        )
                    }) :
                    <div className="loadArea">
                        <img className='loadingHome' src={loading} alt="" />
                    </div>
            }
            </div>
        </div>
    )
}

export default Categorize