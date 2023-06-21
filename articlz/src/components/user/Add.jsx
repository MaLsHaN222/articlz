import { addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { db, storage } from '../../firebase/firebase'
import { getPosts } from '../../functions/getPosts'

import './add.css'
import { formats, modules } from './textEditor'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify'
import { getuser } from '../../functions/getuser'

export const Add = () => {
    const userId = useSelector((state) => state.userAuth.userId)
    const username = useSelector((state) => state.userAuth.username)
    const categoryVal = useSelector((state) => state.allPosts.category)

    const type = categoryVal[0]
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState(type)
    const [description, setDescript] = useState('')
    const [img, setImg] = useState('')


  

    const createDate = new Date()

    const uploadPost = async (imgUrl) => {
        const article = await addDoc(collection(db, "articles"), {
            title: title,
            category: category,
            description: description,
            imgUrl: imgUrl,
            createDate: createDate,
            userId: userId,
            username: username
        }).then(() => {
           toast.success('Article Uploaded..')

        })

    }


    const uploadImage = () => {
        const storageRef = ref(storage, 'articleImages/' + img.name);
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                toast.loading('Uploading.. Please wait' , { toastId:'uploadingId'});
                switch (snapshot.state) {
                    case 'paused':
                        toast.dismiss('Upload is paused');
                        break;
                    case 'running':
                       
                        break;
                }
            },
            (error) => {
                toast.error(error.message)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    uploadPost(downloadURL).then(() => {
                        getPosts()
                        getuser()
                        window.location.reload(true)
                    })


                });
            }
        );

    }




    const upload = (e) => {
        e.preventDefault()
        if(title.length>0 && description.length>0){
            uploadImage()
        } else{
            toast.error("Title and Description empty")
        }
    }


    const handleChange = (content, delta, source, editor) => {
        setDescript(content);
      };

    return (
        <>
            <form className='addForm'>
                <h1>Create New Article</h1>


                <div className='sec1'>
                    <label>Title</label>
                    <input className='inp'
                        type="text" placeholder='Enter Title'
                        required
                        onChange={(e) => setTitle(e.target.value)} />
                </div>


                <div className="sec2">

                    <div className="details">
                        <div>
                            <label>Cover Image</label>
                            <input type="file" accept='image/*' onChange={(e) => setImg(e.target.files[0])} />
                        </div>

                        <div>
                            <label> Category</label>
                            <select className='type' onChange={(e) => setCategory(e.target.value)}>
                                {
                                    categoryVal.map((val) => {
                                        return (
                                            <option value={val}>{val}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className='textArea'>
                    <ReactQuill
                
                value={description}
                placeholder='Enter Description'
                required
                onChange={handleChange}
                modules={modules}
                formats={formats}
                style={{height:'100%'  , display:"block" , }}
            />
                    </div>
                </div>
                <button className='handleBtn' onClick={(e) => upload(e, img)}>Create</button>
            </form>
        </>
    )

}
