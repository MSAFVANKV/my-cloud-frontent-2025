// import FormGenerator from "@/components/global/form-generator";
// import Loader from "@/components/global/loader";
// import AyButton from "@/components/myUi/AyButton";
// import { useCreateUser } from "@/hooks/useCreateUser";
// import { motion } from "framer-motion";

// const Signup = () => {
//   const { errors, isPending, onFormSubmit, register } = useCreateUser();

//   return (
//     <form onSubmit={onFormSubmit} className="space-y-3 w-full">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5, duration: 0.5 }}
//       >
//         <FormGenerator
//           register={register}
//           name="userName"
//           placeholder="User Name"
//           label="Name"
//           errors={errors}
//           inputType="input"
//           type="text"
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
//           name="email"
//           placeholder="Email"
//           label="Email"
//           errors={errors}
//           inputType="input"
//           type="email"
//         />
//       </motion.div>
//       {/* 3 */}

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
//         <Loader state={isPending}>Sign Up</Loader>
//       </AyButton>
//     </form>
//   );
// };

// export default Signup;
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loader from "@/components/global/loader";
import AyButton from "@/components/myUi/AyButton";
import { useCreateUser } from "@/hooks/useCreateUser";
import { motion } from "framer-motion";

const SignupSchema = Yup.object().shape({
  userName: Yup.string().required("User name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password too short").required("Password is required"),
});

const Signup = () => {
  const { createUser, isPending } = useCreateUser();

  return (
    <Formik
      initialValues={{ userName: "", email: "", password: "" }}
      validationSchema={SignupSchema}
      onSubmit={(values, { resetForm }) => {
        createUser(values, {
          onSuccess: () => {
            resetForm();
          }
        });
      }}
    >
      {() => (
        <Form className="space-y-3 w-full">
          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              userName
            </label>
            <Field
              name="userName"
              type="text"
              className="rounded-md bg-gray-100 text-xs focus:outline-none border border-gray-300 text-gray-700 p-3 w-full"
              placeholder="userName"
            />
            <ErrorMessage name="userName" component="p" className="text-xs text-red-500 mt-1" />
          </motion.div>

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
              type="text"
              className="rounded-md bg-gray-100 text-xs focus:outline-none border border-gray-300 text-gray-700 p-3 w-full"
              placeholder="Enter email"
            />
            <ErrorMessage name="email" component="p" className="text-xs text-red-500 mt-1" />
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <label className="block text-sm font-medium mb-1" htmlFor="email">
            Password
            </label>
            <Field
              name="password"
              type="text"
              className="rounded-md bg-gray-100 text-xs focus:outline-none border border-gray-300 text-gray-700 p-3 w-full"
              placeholder="Enter password"
            />
            <ErrorMessage name="password" component="p" className="text-xs text-red-500 mt-1" />
          </motion.div>

          <AyButton
            type="submit"
            variant="contained"
            sx={{
              background: "linear-gradient(to right, #8E2DE2, #5c6bc0)",
              width: "100%",
              mt: "20px",
            }}
          >
            <Loader state={isPending}>Sign Up</Loader>
          </AyButton>
        </Form>
      )}
    </Formik>
  );
};

export default Signup;
