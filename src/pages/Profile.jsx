import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/userContext'
const Profile = () => {
        const { auth } = useAuth();
        const navigate = useNavigate()
        return (
                <div className='h-[91vh] w-full bg-gray-100 flex items-center justify-center'>
                        <div className='bg-white p-10 rounded shadow-lg w-96'>
                                <h2 className='text-2xl font-bold mb-5 text-center text-[#FF4000]'>Profile</h2>
                                <div className='space-y-4'>
                                        <p>Name: {auth.userData.name}</p>
                                        <p>Email: {auth.userData.email}</p>

                                        <div className='flex items-center justify-center'>
                                                <button className='bg-[#FF4000] text-white px-4 py-2 rounded hover:cursor-pointer' onClick={() => navigate("/change-password")}>
                                                        Change Password
                                                </button>
                                        </div>
                                </div>

                        </div>

                </div>
        );
};

export default Profile;