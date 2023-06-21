import React, { useState } from 'react'
import './login.css';
import register from '../assets/register.jpg'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmP, setConfirmP] = useState('')
  const [btnTxt , setBtnTxt] = useState('Register')

  const navigate = useNavigate()

  const registing = async (e) => {
    e.preventDefault()
    setBtnTxt('Please Wait..')
    if(name.length>0 && email.length>0){
      if (password.length>0 && password === confirmP) {
        await createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
            updateProfile(auth.currentUser, {
              displayName: name
            }).then(() => {
              toast.success('Account Created Successfully..')
              navigate('/login')
              
            }).catch((error) => {
              // An error occurred
              setBtnTxt('Register')
              toast.error(error.message)
              // ...
            });
  
          })
          .catch((error) => {
            setBtnTxt('Register')
            toast.error(error.message)
  
          });
      } else {
        setBtnTxt('Register')
        toast.error('Check Passwords Again')
      }
    }
    else{
      setBtnTxt('Register')
      toast.error("Please don't leave Name & Email empty")
    }
  }
  return (
    <div className="logSec">
      <img src={register} alt="" />
      <form className='form' style={{ backgroundColor: '#e7e7e7' }}>
        <h1>Register</h1>

        <label>Name</label>
        <input type="text"
          style={{ backgroundColor: 'whitesmoke' }}
          placeholder='Enter Name'
          onChange={(e) => setName(e.target.value)} />

        <label>E-mail</label>
        <input type="email"
          style={{ backgroundColor: 'whitesmoke' }}
          placeholder='Enter E-mail'
          onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password"
          style={{ backgroundColor: 'whitesmoke' }}
          placeholder='Enter Password'
          onChange={(e) => setPassword(e.target.value)} />

        <label>Password Confirm</label>
        <input type="password"
          style={{ backgroundColor: 'whitesmoke' }}
          placeholder='Enter Password Again'
          onChange={(e) => setConfirmP(e.target.value)} />

        <button onClick={(e) => registing(e)}>{btnTxt}</button>

        <p>Already Have An Account? <span onClick={()=>navigate('/login')}>Log In</span></p>

      </form>
    </div>
  )
}

export default Register