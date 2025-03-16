import FormGenerator from "@/components/global/form-generator";
import Loader from "@/components/global/loader";
import AyButton from "@/components/myUi/AyButton";
import {  useLoginUser } from "@/hooks/useCreateUser";
import { motion } from "framer-motion";

const Login = () => {
  const { errors, isPending, onFormSubmit, register } = useLoginUser();

  return (
    <form onSubmit={onFormSubmit} className="space-y-3 w-full">
    

      {/* 1 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <FormGenerator
          register={register}
          name="email"
          placeholder="Email"
          label="Email"
          errors={errors}
          inputType="input"
          type="email"
        />
      </motion.div>
      {/* 2 */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <FormGenerator
          register={register}
          name="password"
          placeholder="Password"
          label="Password"
          errors={errors}
          inputType="input"
          type="password"
        />
      </motion.div>

      <AyButton type="submit" title="" variant="contained"
      sx={{
        background: "linear-gradient(to right, #8E2DE2, #5c6bc0)" ,
        width:"100%",
        mt:"20px"
      }}
      >
        <Loader state={isPending}>Login</Loader>
      </AyButton>
    </form>
  );
};

export default Login;
