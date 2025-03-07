import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

type UserStateType = {
    isAuth: boolean,
    name: string,
    email: string,
    picture: string,
}

const UserContext = createContext<UserStateType | null>(null)

const UserContextProvider = ({ children } : { children: React.ReactNode }) => {
    const { user, isAuthenticated } = useAuth0()

    useEffect(() => {
        setName(user?.nickname ?? "")
        setEmail(user?.email ?? "")
        setPicture(user?.picture ?? "")
        setIsAuth(isAuthenticated)
    }, [user, isAuthenticated])

    /*
        - user?.nickname safely accesses nickname if user is defined, otherwise returns undefined
        - ?? "" (nullish coalescing) ensures that name falls back to an empty string if
            user?.nickname is undefined or null
    */
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [picture, setPicture] = useState<string>("")
    const [isAuth, setIsAuth] = useState<boolean>(false)

    const userState: UserStateType = {
        isAuth: isAuth,
        name: name,
        email: email,
        picture: picture
    }

    return (
        <UserContext.Provider value={userState}>
            {children}
        </UserContext.Provider>
    )
}

function useUserContext() {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useUserContext must be used within a UserContextProvider")
    }
    return context
}

export { UserContextProvider, useUserContext }