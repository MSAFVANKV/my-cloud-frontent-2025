// import {
//   userAuthSchema,
//   // userLoginAuthSchema,
// } from "@/pages/userSide/auth/schema";
import Cookies from "js-cookie";
import { useMutationData } from "./useMutationData";
// import useZodForm from "./useZodForm";
import {
  createNewUserAction,
  loginUserAction,
} from "@/actions/auth/authAction";

// export const useCreateUser = () => {
//   // const [haveError, setHaveError] = useState(false)

//   const { mutate, isPending } = useMutationData(
//     ["create-user"],
//     (data: { email: string; userName: string; password: string }) =>
//       createNewUserAction(data),
//     "new-user",
//     (data) => {
//       if (data.status === 200 || data.status === 201) {
//         reset();
//       }
//       //
//     }
//   );

//   const { errors, onFormSubmit, register, reset, setValue } = useZodForm(
//     userAuthSchema,
//     mutate
//   );

//   return { errors, onFormSubmit, register, isPending, reset, setValue };
// };
export const useCreateUser = () => {
  const { mutate, isPending } = useMutationData(
    ["create-user"],
    (data: { email: string; userName: string; password: string }) => createNewUserAction(data),
    "new-user"
  );

  const createUser = (data: { email: string; userName: string; password: string }, options?: any) => {
    mutate(data, options);
  };

  return { createUser, isPending };
};

//  login
// export const useLoginUser = () => {
//   // const [haveError, setHaveError] = useState(false)

//   const { mutate, isPending } = useMutationData(
//     ["login-user"],
//     (data: { email: string; password: string }) => loginUserAction(data),
//     "user-data",
//     (data) => {
//       if (data.status === 200 || data.status === 201) {
//         reset();
//       }
//       //
//     }
//   );

//   const { errors, onFormSubmit, register, reset, setValue } = useZodForm(
//     userLoginAuthSchema,
//     mutate
//   );

//   return { errors, onFormSubmit, register, isPending, reset, setValue };
// };
export const useLoginUser = () => {
  const { mutate, isPending } = useMutationData(
    ["login-user"],

    // Mutation function: loginUserAction expects { email, password }
    (data: { email: string; password: string }) => loginUserAction(data),
    "user-data",
    (data) => {
      if (data.status === 200 || data.status === 201) {
        console.log("Login successful:", data);
        Cookies.set("cld_ath", data.token); // Set token in cookies
        // Optionally handle redirect or set session here
      }
    }
  );

  // Return function that receives email/password
  const loginUser = (values: { email: string; password: string }) => {
    mutate(values);
  };

  return { loginUser, isPending };
};