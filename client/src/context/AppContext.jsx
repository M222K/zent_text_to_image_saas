import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [showLogin, setshowLogin] = useState(false);
    //to store token in local storage
    const [token, setToken] = useState(localStorage.getItem('token'));

    const [credit, setCredit] = useState(false);

    const backendurl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

    const loadCreditsData = async () => {
        if (!token || !backendurl) return;

        try {
            const { data } = await axios.get(backendurl + '/api/user/credits', { headers: { token } })

            if (data.success) {
                setCredit(data.credits)
                setUser(data.user)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);

        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken('')
        setUser(null);
    }

    const generateImage = async (prompt) => {
        if (!token) {
            toast.error("Please login first");
            return null;
        }
        
        try {
            const { data } = await axios.post(
                backendurl + '/api/image/generate-image', 
                { prompt }, 
                { headers: { token } }
            )

            if (data.success) {
                loadCreditsData()
                return data.resultImage
            } else {
                toast.error(data.message)
                loadCreditsData()
                if (data.creditBalance === 0) {
                    //navigate to buy credits page
                    navigate('/buy');
                }
                return null;
            }

        } catch (error) {
            console.error("Generate image error:", error);
            toast.error(error.response?.data?.message || error.message);
            return null;
        }
    }

    useEffect(() => {
        if (token) {
            loadCreditsData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]) //whenever the token changes

    //pass the values in a object to use thier context in other components
    const value = {
        user, setUser, showLogin, setshowLogin, backendurl, token, setToken, credit, setCredit, loadCreditsData, logout,generateImage
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
