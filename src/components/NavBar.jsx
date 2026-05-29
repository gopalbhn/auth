import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/userContext";
import { CircleUserRound } from "lucide-react";

const NavBar = () => {
  const navigate = useNavigate();
  const [isloggedIn, setIsLoggedIn] = useState(false);
 
  const { auth } = useAuth();
  console.log("auth", auth);
  useEffect(() => {
    if (auth.status) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [auth.status]);
  console.log("islog", isloggedIn);

  async function handleSignout() {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/logout`, {
      method: "GET",
      credentials: "include",
    });

    if (res.ok) {
      alert("loged out successfully")
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=yourdomain.com"
      window.location.href="/"
      
    }
  }

  return (
    <div className="h-10 w-full bg-gray-50 px-10 flex items-center justify-between shadow-2xl">
      <Link to="/" className="text-lg font-bold text-[#FF4000]">MyApp</Link>
      <div className="space-x-4">
        {isloggedIn ? (
          <div className="flex items-center gap-4 relative">
            <button onClick={() => navigate("/profile")}>
              <CircleUserRound color="#FF4000" />
            </button>
          
            <button
              className="text-[#FF4000] hover:text-white border border-[#FF4000] px-4 py-1 rounded hover:bg-[#FF4000]  hover:cursor-pointer"
              onClick={handleSignout}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <>
            <button
              className="text-[#FF4000] hover:text-white border border-[#FF4000] px-4 py-1 rounded hover:bg-[#FF4000]  hover:cursor-pointer"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </button>
            <button
              className="bg-[#FF4000] hover:bg-white text-white  hover:text-[#FF4000] hover:border border-[#FF4000] px-4 py-1 rounded hover:cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
