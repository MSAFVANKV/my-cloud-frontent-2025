// import FormGenerator from "@/components/global/form-generator";
// import Loader from "@/components/global/loader";
// import AyButton from "@/components/myUi/AyButton";
// import {  useLoginUser } from "@/hooks/useCreateUser";
// import { motion } from "framer-motion";

// const Login = () => {
//   const { errors, isPending, onFormSubmit, register } = useLoginUser();

//   return (
//     <form onSubmit={onFormSubmit} className="space-y-3 w-full">
    

//       {/* 1 */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5, duration: 0.5 }}
//       >
//         <FormGenerator
//           register={register}
//           name="email"
//           placeholder="Email"
//           label="Email"
//           errors={errors}
//           inputType="input"
//           type="email"
//         />
//       </motion.div>
//       {/* 2 */}

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5, duration: 0.5 }}
//       >
//         <FormGenerator
//           register={register}
//           name="password"
//           placeholder="Password"
//           label="Password"
//           errors={errors}
//           inputType="input"
//           type="password"
//         />
//       </motion.div>

//       <AyButton type="submit" title="" variant="contained"
//       sx={{
//         background: "linear-gradient(to right, #8E2DE2, #5c6bc0)" ,
//         width:"100%",
//         mt:"20px"
//       }}
//       >
//         <Loader state={isPending}>Login</Loader>
//       </AyButton>
//     </form>
//   );
// };

// export default Login;
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loader from "@/components/global/loader";
import AyButton from "@/components/myUi/AyButton";
import { useLoginUser } from "@/hooks/useCreateUser";
import { motion } from "framer-motion";

const Login = () => {
  const { loginUser, isPending } = useLoginUser();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().min(4, "Password must be at least 4 characters").required("Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        loginUser(values);
        setSubmitting(false);
      }}
    >
      {() => (
        <Form className="space-y-3 w-full">
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <Field
              name="email"
              type="email"
              className="rounded-md bg-gray-100 focus:outline-none border border-gray-300 text-gray-700 p-2 w-full"
              placeholder="Email"
            />
            <ErrorMessage name="email" component="p" className="text-xs text-red-500 mt-1" />
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <Field
              name="password"
              type="password"
              className="rounded-md bg-gray-100 focus:outline-none border border-gray-300 text-gray-700 p-2 w-full"
              placeholder="Password"
            />
            <ErrorMessage name="password" component="p" className="text-xs text-red-500 mt-1" />
          </motion.div>

          <AyButton
          title=""
            type="submit"
            variant="contained"
            sx={{
              background: "linear-gradient(to right, #8E2DE2, #5c6bc0)",
              width: "100%",
              mt: "20px",
            }}
          >
            <Loader state={isPending}>Login</Loader>
          </AyButton>
        </Form>
      )}
    </Formik>
  );
};

export default Login;

