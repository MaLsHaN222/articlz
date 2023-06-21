import React, { useState } from 'react'
import './login.css'
import login from '../assets/login.jpg'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { toast } from 'react-toastify'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [btnTxt , setBtnTxt] = useState('LOG IN')
    
    const navigate = useNavigate()

    const log = async (e) => {
        e.preventDefault()
        setBtnTxt('Please Wait...')
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                toast.success('Successfully Logged In..')
                const user = userCredential.user;
                navigate('/')
                // ...
            })
            .catch((error) => {
                toast.error(error.message)
                setBtnTxt('LOG IN')
            });

    }

    const reset = ()=>{
        navigate('/resetpassword')
    }



    return (
        <div className="logSec">
            <img src={login} alt="" />
            <form className='form'>
                <h4>ARTICLZ</h4>
                <h1>Welcome Back !</h1>

                <label>E-mail</label>
                <input type="email"
                    placeholder='Enter E-mail'
                    onChange={(e) => setEmail(e.target.value)} />

                <label>Password</label>
                <input type="password"
                    placeholder='Enter Password'
                    onChange={(e) => setPassword(e.target.value)} />

                <button onClick={(e) => log(e)}>{btnTxt}</button>

                <h3 onClick={()=>reset()}>Forgot password</h3>
                <p>Don't Have An Account? <span onClick={()=>navigate('/register')}>Register</span></p>

            </form>
        </div>
    )
}

export default Login