import { ReactNode } from "react";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
 

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);
  // console.log(token);
  if (!token) {
   return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
