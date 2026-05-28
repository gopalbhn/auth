import React from 'react'
import { useAuth } from '../context/userContext'
const Dashbaord = () => {
    const { auth } = useAuth();
    return (
        <div className='h-screen w-screen'>
            <div className='h-20 bg-gray-100 flex justify-center'>
                <h3 className='text-2xl font-bold text-[#FF4000]'>Welcome Back</h3>

            </div>
            <div className='h-[70vh] w-full flex items-center justify-center'>
                {auth.userData?.email ? (
                    <div className='h-20 w-30 bg-gray-100'>
                        <div className='flex items-center gap-2 text-[#FF4000]'>
                            <p>Name:</p>
                            <p>{auth.userData.name}</p>
                        </div>
                        <div className='flex items-center gap-2 text-[#FF4000]'>
                            <p>Email:</p>
                            <p>{auth.userData.email}</p>
                        </div>
                    </div>
                ) : (
                    <p>Please login to continue</p>
                )}
            </div>

        </div>
    )
}

export default Dashbaord