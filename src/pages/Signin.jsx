import { useState } from "react"
import { Link, Navigate } from 'react-router-dom'

const Signin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    async function handleClick() {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                email,
                password
            }),
            credentials: "include",
        })

        const data = await res.json();

        if (data.success) {
            window.location.href = "/"
        } else {
            alert("Retry")
        }
    }
    return (
        <div className='h-[91vh] w-full bg-gray-100 flex items-center justify-center'>
            <div className='bg-white p-10 rounded shadow-lg w-96'>
                <h2 className='text-2xl font-bold mb-5 text-center text-[#FF4000]'>Sign In</h2>
                <div className='space-y-4'>


                    <input type="email" placeholder='Email' className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#FF4000]' onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='Password' className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#FF4000]' onChange={(e) => setPassword(e.target.value)} />
                    <button type='submit' className='w-full bg-[#FF4000] hover:bg-white text-white  hover:text-[#FF4000] hover:border border-[#FF4000] px-4 py-2 rounded hover:cursor-pointer' onClick={handleClick}>Sign Up </button>
                </div>
                <Link to="/forget-password" className='underline text-[#FF4000]'>Forget Password</Link>
                <p>Dont't have an accout? <Link to="/signup" className='underline text-[#FF4000]'>Create here</Link></p>
            </div>
        </div>
    )
}

export default Signin