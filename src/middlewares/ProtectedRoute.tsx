import React, { useEffect } from "react";
import { isAuthenticated } from "./IsAuthenticated";
import { useAppDispatch } from "@/redux/hook";
import { setUserData } from "@/redux/reducers/userSlice";
import { useQueryData } from "@/hooks/useQueryData";
import { getCurrentUser } from "@/actions/auth/authAction";
import { IUser } from "@/types/userTpes";
import { useToast } from "@/hooks/use-toast";
import AnimatedLoginRegister from "@/pages/userSide/auth/Registeration-page";
import { GetCurrentUserResponse } from "@/types/globalType";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { toast } = useToast();
  const haveToken = isAuthenticated();
  const dispatch = useAppDispatch();

  const {
    data: userData,
    isFetching,
    isFetched,
  } = useQueryData<GetCurrentUserResponse>(
    ["user-details"],
    getCurrentUser,
    haveToken
  );

  const user = userData?.data as IUser | null;
  console.log(user, "userData");
  useEffect(() => {
    if (haveToken) {
      if (user) {
        dispatch(setUserData(user));
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
  if (!haveToken || (!user && !isFetching)) {
    return <AnimatedLoginRegister />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
