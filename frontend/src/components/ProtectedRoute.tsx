import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

const ProtectedRoute = () => {
  const {isAuthenticated} = useAuth();
 
  if(!isAuthenticated){
    return<Navigate to="/login" replace={true}/>
  }
console.log("User is authenticated, rendering protected route.");
  return <Outlet />;
};

export default ProtectedRoute;
