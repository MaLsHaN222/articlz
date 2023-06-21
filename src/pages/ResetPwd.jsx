import React, { useState } from 'react'
import './resetPwd.css'
import { toast } from 'react-toastify'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase/firebase'

const ResetPwd = () => {

    const [email, setEmail] = useState('')

    const reset = () => {
        if (email.length > 0) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    toast.success('Password Reset Link sent.. Check your emails')
                })
                .catch((error) => {
                    toast.error(error.message)
                });

        } else {
            toast.error('Please enter your Email')
        }
    }
    return (
        <div className="resetMain">
            <div className="resetSec1">
                <form>
                    <h1>Reset Password</h1>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder='Enter Email' />
                </form>
                <button onClick={() => reset()}> Reset</button>
            </div>
        </div>
    )
}

export default ResetPwd