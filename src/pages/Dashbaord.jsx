import React from "react";
import { useAuth } from "../context/userContext";
const Dashbaord = () => {
  const { auth } = useAuth();

  return (
    <div className="h-screen w-screen">
     
        {auth.userData?.email ? (
          <>
            <div className="h-20 w-full bg-gray-100 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-[#FF4000]">
                Welcome Back
              </h3>
            </div>
            <div className="bg-gray-100 p-3 flex flex-col items-center justify-center ">
              <div className="flex items-center gap-2 text-[#FF4000]">
                <p className="text-lg font-bold ">Name:</p>
                <p className="text-md font-semibold capitalize">{auth.userData.name}</p>
              </div>
              <div className="flex items-center gap-2 text-[#FF4000]">
                <p className="text-lg font-bold ">Email:</p>
                <p className="tex-md font-semibold">{auth.userData.email}</p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-2xl font-bold text-[#ff4000] text-center mt-40">
            Please login to continue
          </p>
        )}
      </div>
   
  );
};

export default Dashbaord;
