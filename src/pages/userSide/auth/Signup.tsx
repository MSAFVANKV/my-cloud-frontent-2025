import FormGenerator from "@/components/global/form-generator";
import Loader from "@/components/global/loader";
import AyButton from "@/components/myUi/AyButton";
import { useCreateUser } from "@/hooks/useCreateUser";
import { motion } from "framer-motion";

const Signup = () => {
  const { errors, isPending, onFormSubmit, register } = useCreateUser();

  return (
    <form onSubmit={onFormSubmit} className="space-y-3 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <FormGenerator
          register={register}
          name="userName"
          placeholder="User Name"
          label="Name"
          errors={errors}
          inputType="input"
          type="text"
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
          name="email"
          placeholder="Email"
          label="Email"
          errors={errors}
          inputType="input"
          type="email"
        />
      </motion.div>
      {/* 3 */}

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
        <Loader state={isPending}>Sign Up</Loader>
      </AyButton>
    </form>
  );
};

export default Signup;
