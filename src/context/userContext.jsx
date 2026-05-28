import { createContext, useContext, useEffect, useState } from "react"


const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [auth,setAuth] = useState({status:false,userData:undefined})

   useEffect(() => {
    const fetchUser = async () => {
        try {
            const res = await fetch(`${import.meta.env.BACKEND_URL}/api/user/me`, {
                method: "GET",
                credentials: "include"
            });
            console.log("res",res)
            const data = await res.json();
            console.log("data",data)

            if(data.success){

                setAuth({ status: true, userData: data.user });
            }else{
            setAuth({ status: false, userData: undefined });

            }

        } catch (err) {
            setAuth({ status: false, userData: undefined });
        }
    };

    fetchUser();
}, []);
    console.log(auth)
    return(
        <AuthContext.Provider value={{auth}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    const context = useContext(AuthContext);
    if(!context) throw new Error("useAuth must be used within an auth provider")
        return context;
}