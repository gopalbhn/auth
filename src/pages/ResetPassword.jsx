import { useParams } from 'react-router-dom'
import { useState } from "react"
const ResetPassword = () => {
  const { token } = useParams();
 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleClick() {

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    const res = await fetch(`${import.meta.env.BACKEND_URL}/api/user/reset/` + token, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password
      }),
      credentials: "include"
    })
    const data = await res.json();
    console.log(data)
    if (res.ok) {
      alert("Password reset successfully")
      window.location.href="/"
    } else {
      alert(data.message)
    }
  }
  console.log("token", token);
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <div className='bg-white p-10 rounded shadow-lg w-96'>
        <h2 className='text-2xl font-bold mb-5 text-center text-[#FF4000]'>Reset Password</h2>
        <div className='space-y-4'>
          <div className='space-y-4'>
            <div>
              <p className='text-sm font-bold text-[#FF4000]'>New Password</p>
              <input type="password" placeholder='New Password' className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#FF4000]' onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='space-y-4'>
              <div>
                <p className='text-sm font-bold text-[#FF4000]'>Confirm Password</p>
                <input type="password" placeholder='Confirm Password' className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#FF4000]' onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
              <div className='flex items-center justify-center'>
                <button className='bg-[#FF4000] text-white px-4 py-2 rounded hover:cursor-pointer' onClick={handleClick}>
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword