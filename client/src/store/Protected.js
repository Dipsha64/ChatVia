import { isAuthenticated } from "../features/auth/authSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Protected({children}) {
    const user = useSelector(isAuthenticated);

    if(Object.keys(user).length <= 0){
        return <Navigate to={"/login"} replace={true}></Navigate>
    }
    if(Object.keys(user).length > 0){
        return children;
    }
    return ( children );
}

export default Protected;