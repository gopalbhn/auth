import React from 'react'
import { useState } from 'react'
const ForgetPassword = () => {
    const [email, setEmail] = useState("")

    async function handleClick() {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/forget-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
            }),
            credentials: "include"
        })
        const data = await res.json();
        console.log(data)
        if (res.ok) {
            alert("Password reset link sent to your email")
        } else {
            alert(data.message)
        }
    }
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div>
                <div className='bg-white p-10 rounded shadow-lg w-96'>
                    <h2 className='text-2xl font-bold mb-5 text-center text-[#FF4000]'>Forget Password</h2>
                    <div className='space-y-4'>
                        <div className='space-y-4'>
                            <div>
                                <p className='text-sm font-bold text-[#FF4000]'>Email</p>
                                <input type="email" placeholder='Email' className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#FF4000]' onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='flex items-center justify-center'>
                                <button className='bg-[#FF4000] text-white px-4 py-2 rounded hover:cursor-pointer' onClick={handleClick}>
                                    Send Reset Link
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>


    )
}

export default ForgetPassword