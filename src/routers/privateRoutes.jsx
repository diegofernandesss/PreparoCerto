import { useContext } from "react"
import { AuthContext } from '../Context/Auth'
import { Navigate } from "react-router-dom";
import { SideBar } from "../components";

export const PrivateRoute = () => {

    const { signed } = useContext(AuthContext);

    return signed ? <SideBar /> : <Navigate to="/login" />
}