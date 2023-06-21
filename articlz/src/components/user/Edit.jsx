import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getPosts } from '../../functions/getPosts'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../../firebase/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { formats, modules } from './textEditor'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getuser } from '../../functions/getuser'


const Edit = () => {
  const data = useSelector((state) => state.allPosts.editPost)
  const categoryVal = useSelector((state) => state.allPosts.category)
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [img, setimg] = useState('')
  const [previewImg, setpreviewImg] = useState('')

  useEffect(() => {
    setTitle(data.title)
    setType(data.category)
    setDescription(data.description)
    setimg(data.imgUrl)
    setpreviewImg(data.imgUrl)
  }, [data])


  const preview = (e) => {
    const img = e.target.files[0]
    const url = URL.createObjectURL(img)
    setpreviewImg(url)
    setimg(img)
  }

  const deleteImg = async () => {
    const httpsRef = ref(storage, data.title);
    await deleteObject(httpsRef).then(() => {
    }).catch((error) => {
      toast.error(error.message)
    });
  }

  const updateArticle = async (imgUrl) => {
    const makeRef = doc(db, "articles", data.postId);
    toast.loading('updating article')
    await updateDoc(makeRef, {
      title: title,
      category: type,
      description: description,
      imgUrl: imgUrl,
      createDate: new Date(),
    });
    toast.success('Updated Successfully..')
  }

  const uploadImage = async () => {
    const storageRef = ref(storage, 'articleImages/' + img.name);
    const uploadTask = uploadBytesResumable(storageRef, img);

    if (img !== data.imgUrl) {

      await uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          toast.onChange('Update is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              toast.info('Update is paused');
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
            updateArticle(downloadURL).then(() => {
              deleteImg()
              getPosts()
              getuser()
              navigate('/dashboard/:id/add')
              window.location.reload(true)
              
            })


          });
        }
      );


    } else {
      updateArticle(img).then(() => {
        deleteImg()
        getPosts()
        getuser()
        navigate('/dashboard/:id/add')
        window.location.reload(true)
      })
    }

  }


  const handleChange = (content, delta, source, editor) => {
    setDescription(content);
  };



  const submit = (e) => {
    e.preventDefault()
    uploadImage()
  }
  return (
    <>
      <form className='addForm'>
        <h1>Edit Article</h1>


        <div className='sec1'>
          <label>Title</label>
          <input className='inp'
            type="text" value={title}
            onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="sec2">

          <div className="details">

            <div className='imagefield'>
              <label>Cover Image</label>
              <input className='file' type="file" accept='image/*' onChange={(e) => preview(e)} />
              <img className='previewImg' src={previewImg} />
            </div>

            <div >
              <label> Category</label>
              <select className='type' onChange={(e) => setType(e.target.value)} >
                {
                  categoryVal.map((val) => {
                    return (
                      <option value={val} selected={val === type && 'select'}>{val}</option>
                    )
                  })
                }
              </select>
            </div>
          </div>

          <div className='textArea'>
            <ReactQuill
            className='textarea'
              value={description}
              onChange={handleChange}
              modules={modules}
              formats={formats}
              style={{height:'100%'  , display:"block" , }}
            />
          </div>
        </div>
        <button onClick={(e) => submit(e)}>Save</button>
      </form>
    </>
  )
}

export default Edit