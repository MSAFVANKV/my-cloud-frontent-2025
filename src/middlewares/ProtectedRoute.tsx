import React, { useEffect } from "react";
import { isAuthenticated } from "./IsAuthenticated";
import { useAppDispatch } from "@/providers/redux/hook";
import { setCurrentUserData } from "@/providers/redux/reducers/userSlice";
import { useQueryData } from "@/hooks/useQueryData";
import { getCurrentUser } from "@/actions/auth/authAction";
import { IUser } from "@/types/userTpes";
import { useToast } from "@/hooks/use-toast";
// import AnimatedLoginRegister from "@/pages/userSide/auth/Registeration-page";
import { GetCurrentUserResponse } from "@/types/globalType";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { toast } = useToast();
  const haveToken = isAuthenticated();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const {
    data: userData,
    isFetching,
    isFetched,
  } = useQueryData<GetCurrentUserResponse>(["user-details"], getCurrentUser, {
    enabled: haveToken,
  });

  const user = userData?.data as IUser | null;
  // console.log(user, "userData");
  useEffect(() => {
    if (haveToken) {
      if (pathname === "login") {
        navigate(-1);
      }
      if (user) {
        dispatch(setCurrentUserData(user));
      }
      if (!user && isFetched) {
        toast({
          title: "User not found",
          description: "Please login again",
          variant: "destructive",
          duration: 1000,
        });
      }
    }
  }, [haveToken, user, dispatch]);

  // If user is not authenticated, redirect to login
  // if (!haveToken || (!user && !isFetching)) {
  //   return <AnimatedLoginRegister />;
  // }
  if (!haveToken || (!user && !isFetching)) {
    return <Navigate to={"/login"} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
