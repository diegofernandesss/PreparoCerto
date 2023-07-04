import { createContext, useEffect, useState } from 'react'
import { api } from '../service/api'
import { Navigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadingStorageData = async () => {
            const storageToken = localStorage.getItem("@Auth:token");
            if(storageToken) {
                setUser(storageToken);
            }
        }
        loadingStorageData();
    }, [])
    
    const signIn = async ({ email, senha }) => {
        const response = await api.post('/login', {
            email, 
            senha
        });

        if(response.data.descricao){
            alert(response.data.descricao);
        } else {
            setUser(response.data.token);
            localStorage.setItem("@Auth:token", response.data.token);
        }
    };

    const signOut = async () => {
        const response = await api.post('/logout');
        if(response){
            localStorage.clear()
            setUser(null);
            return <Navigate to="/login" />
        }
    }

    return <AuthContext.Provider value={{user, signed: !!user, signIn, signOut}}>{children}</AuthContext.Provider>
}