import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin,setshowLogin]=useState(false);

    //pass the values in a object to use thier context in other components
    const value={
        user,setUser,showLogin,setshowLogin
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
