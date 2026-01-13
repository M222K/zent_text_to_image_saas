import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify'
import axios from 'axios';

export const AppContext = createContext();

const AppContextProvider = (props) => {
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

    useEffect(() => {
        if (token) {
            loadCreditsData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]) //whenever the token changes

    //pass the values in a object to use thier context in other components
    const value = {
        user, setUser, showLogin, setshowLogin, backendurl, token, setToken, credit, setCredit, loadCreditsData, logout
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
