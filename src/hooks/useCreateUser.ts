import {
  userAuthSchema,
  userLoginAuthSchema,
} from "@/pages/userSide/auth/schema";
import { useMutationData } from "./useMutationData";
import useZodForm from "./useZodForm";
import {
  createNewUserAction,
  loginUserAction,
} from "@/actions/auth/authAction";

export const useCreateUser = () => {
  // const [haveError, setHaveError] = useState(false)

  const { mutate, isPending } = useMutationData(
    ["create-user"],
    (data: { email: string; userName: string; password: string }) =>
      createNewUserAction(data),
    "new-user",
    (data) => {
      if (data.status === 200 || data.status === 201) {
        reset();
      }
      //
    }
  );

  const { errors, onFormSubmit, register, reset, setValue } = useZodForm(
    userAuthSchema,
    mutate
  );

  return { errors, onFormSubmit, register, isPending, reset, setValue };
};

//  login
export const useLoginUser = () => {
  // const [haveError, setHaveError] = useState(false)

  const { mutate, isPending } = useMutationData(
    ["login-user"],
    (data: { email: string; password: string }) => loginUserAction(data),
    "user-data",
    (data) => {
      if (data.status === 200 || data.status === 201) {
        reset();
      }
      //
    }
  );

  const { errors, onFormSubmit, register, reset, setValue } = useZodForm(
    userLoginAuthSchema,
    mutate
  );

  return { errors, onFormSubmit, register, isPending, reset, setValue };
};
