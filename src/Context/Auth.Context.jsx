import axios from 'axios';
import { createContext, useState, useEffect, use } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    
    const [isLoading ,setIsLoading] = useState(false)
    const [userToken , setUserToken] = useState(localStorage.getItem('userToken') || null)
    const [authError , setAuthError] = useState(null)
    const [username ,setUserName] = useState(localStorage.getItem('username') || null)
    const [loginData , setLoginData] =useState(null)
    const [isRegistered, setIsRegistered] = useState(false);


    async function login(values) {
        setIsLoading(true)
        try {
            let {data} = await axios.post(`https://fakestoreapi.com/auth/login`,{
                username : 'johnd',
                password : 'm38rmF$'
            },{
                headers:{
                    "Content-Type": 'application/json'
                }
            })

            
            console.log(data);
            setUserToken(data.token)
            localStorage.setItem('userToken',data.token)
            
        } catch (error) {
            console.log(error);
            setAuthError(error.message == "Request failed with status code 404" ? 'serve is down try again later' : error.message)
        }finally{
            setIsLoading(false)
        }
        
    }

    async function register(values) {
        setIsLoading(true)

        try {
            let response = await axios.post(`https://fakestoreapi.com/users`,{
                id : 12,
                username : values.username,
                email : values.email , 
                password : values.password
            })
            toast.success('done register')
            setIsRegistered(true)
        } catch (error) {
            console.log(error);
            setAuthError(error.message == "Request failed with status code 404" ? 'serve is down try again later' : error.message)
            
        }finally{
            setIsLoading(false)
        }
    }

    function logout (){
        setUserToken(null)
        setUserName(null)
        localStorage.removeItem('userToken')
        localStorage.removeItem('username')
        toast.success('Done logout')
    }


    return (
        <AuthContext.Provider
            value={{
                userToken,
                username,
                authError,
                isLoading,
                isAuthenticated: !!userToken,
                login,
                logout,
                loginData,
                register,
                setAuthError,
                isRegistered,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}