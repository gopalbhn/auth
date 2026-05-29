import { useState } from "react"

const ChangePassword = () => {
    const [oldpassword, setOldPassword] = useState("")
    const [newpassword, setNewPassword] = useState("")

    async function handleClick() {
        console.log(oldpassword,newpassword)
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/update-password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                oldpassword,
                newpassword,
            }),
            credentials: "include"
        })
        const data = await res.json();
        console.log(data)
        if (res.ok) {
            alert("Password changed successfully")
        }else{
            alert(data.message)
        }
    }

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className='bg-white p-10 rounded shadow-lg w-96'>
                <h2 className='text-2xl font-bold mb-5 text-center text-[#FF4000]'>Profile</h2>
                <div>
                    <div className="space-y-1">
                        <p className="text-sm font-bold text-[#FF4000]">Old Password</p>

                        <input type="email" placeholder='Old Password' className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#FF4000]' onChange={(e) => setOldPassword(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-bold text-[#FF4000]">New Password</p>

                        <input type="email" placeholder='New Passsword' className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#FF4000]' onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    <div className="flex items-center justify-center mt-3">
                        <button className='bg-[#FF4000] text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#FF4000]' onClick={handleClick}>Change Password</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword