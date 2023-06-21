import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './usrPosts.css';
import edit from '../../assets/edit.png';
import del from '../../assets/delete.png';
import { deleteDoc, doc} from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { getEditPost } from '../../redux/slices/postslice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { thumbs } from '../../animations/readPage';
import { toast } from 'react-toastify';

const UserPosts = () => {
    const userId = useSelector((state) => state.userAuth.userId)
    const data = useSelector((state) => state.allPosts.posts)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    


    const getUserposts = () => {
        data.map((item) => {
            const check = posts.includes(item)
            if (check === false && item.userId === userId) {
                setPosts([...posts, item])
            } else {

            }
        })
    }


    const Delete = async (id) => {
        toast.loading('Deleting')
        const postId = id
        await deleteDoc(doc(db, "articles", postId)).then(()=>{
            toast.success('deleted successfully')
            window.location.reload(true)
        })
    }


    useEffect(() => {
        getUserposts()
    })

    
    const editPost = (post)=>{
        dispatch(getEditPost(post))
        navigate('/dashboard/:id/edit')
        
    }


    return (
        <div className="posts">
            {
                posts.length > 0 ?
                    posts.map((post , index) => {
                        
                        return (
                            <>
                                <motion.div 
                                variants={thumbs}
                                custom={index}
                                initial= 'hidden'
                                animate='visible'
                                className="thumb">
                                    <img className='thumbnail' src={post.imgUrl} />
                                    <h4>{post.title}</h4>
                                    <div className="postfunc">
                                        <img src={edit} onClick={()=>editPost(post)} />
                                        <img src={del} onClick={()=>Delete(post.postId)} />
                                    </div>
                                </motion.div>
                            </>
                        )
                    }) :
                    <div className="load">
                        <h2>No Articles</h2>
                    </div>
            }
        </div>
    )
}

export default UserPosts