import  { useState } from 'react';
import { motion } from 'framer-motion';
import Signup from './Signup';
import Login from './Login';

const AnimatedLoginRegister = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);

  const toggleForm = () => {
    setIsLoginActive(!isLoginActive);
  };

  // Animation variants
  const formVariants = {
    login: {
      left: 0,
      right: "auto"
    },
    signup: {
      left: "auto",
      right: 0
    }
  };

  const colorPanelVariants = {
    login: {
      left: "auto",
      right: 0,
      // backgroundColor: "#9333ea" // purple-600
      background: "linear-gradient(to right, #8E2DE2, #5c6bc0)" 
    },
    signup: {
      left: 0,
      right: "auto",
      // backgroundColor: "#4f46e5" // indigo-600
      background: "linear-gradient(to right, #5c6bc0, #832da8)" 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-purple-200">
      <div className="relative w-full max-w-3xl h-[510px] max-h-[550px] p-10 rounded-4xl shadow-xl overflow-hidden bg-white">
     
        {/* Form section */}
        <motion.div 
          className="absolute top-0 w-1/2 h-full bg-white"
          initial="login"
          animate={isLoginActive ? "login" : "signup"}
          variants={formVariants}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.6 }}
        >
          <div className="flex flex-col items-center justify-center h-full p-8">
            <motion.h2 
              className="text-3xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              key={isLoginActive ? "signin-title" : "create-title"} // Force re-render animation
            >
              {isLoginActive ? 'Sign In' : 'Create Account'}
            </motion.h2>

            {/* Social login buttons */}
            <motion.div 
              className="flex space-x-2 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <motion.button 
                className="w-10 h-10 rounded-md flex items-center justify-center border"
                whileHover={{ scale: 1.1, boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
              </motion.button>
              <motion.button 
                className="w-10 h-10 rounded-md flex items-center justify-center border bg-blue-600"
                whileHover={{ scale: 1.1, boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </motion.button>
              <motion.button 
                className="w-10 h-10 rounded-md flex items-center justify-center border"
                whileHover={{ scale: 1.1, boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#333" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </motion.button>
              <motion.button 
                className="w-10 h-10 rounded-md flex items-center justify-center border bg-blue-700"
                whileHover={{ scale: 1.1, boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </motion.button>
            </motion.div>

            <motion.p 
              className="text-gray-600 text-sm mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              key={isLoginActive ? "login-text" : "signup-text"} // Force re-render animation
            >
              {isLoginActive ? 'or use your email password' : 'or use your email for registration'}
            </motion.p>

            {/* Input fields */}
            {
              !isLoginActive &&  <Signup />
            }
            {isLoginActive && <Login />}
           
         

            {isLoginActive && (
              <motion.a 
                href="#" 
                className="text-sm text-gray-600 self-start mt-2 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                Forgot Your Password?
              </motion.a>
            )}

            {/* <motion.button 
              className="w-full bg-purple-600 text-white py-3 rounded-md font-medium mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={{ scale: 1.03, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.97 }}
            >
              {isLoginActive ? 'SIGN IN' : 'SIGN UP'}
            </motion.button> */}
          </div>
        </motion.div>
     
        {/* Animated colored section */}
        <motion.div 
          className="absolute top-0 w-1/2 h-full text-white p-10 rounded-4xl"
          initial="login"
          animate={isLoginActive ? "login" : "signup"}
          variants={colorPanelVariants}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.6 }}
        >
          <div className="flex flex-col items-center justify-center h-full text-white ">
            <motion.h2 
              className="text-3xl font-bold mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              key={isLoginActive ? "login-title" : "signup-title"} // Force re-render animation
            >
              {isLoginActive ? 'Welcome Back!' : 'Create Your Account!'}
            </motion.h2>
            <motion.p 
              className="text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              key={isLoginActive ? "login-desc" : "signup-desc"} // Force re-render animation
            >
              {isLoginActive 
                ? 'Sign in to access your account and continue where you left off.' 
                : 'Join us today and explore all the features we have to offer.'}
            </motion.p>
            <motion.button 
              onClick={toggleForm}
              className="border-2 border-white text-white py-2 px-6 rounded-md font-medium hover:bg-white hover:text-purple-600 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoginActive ? 'SIGN UP' : 'SIGN IN'}
            </motion.button>
          </div>
        </motion.div>

     
      </div>
    </div>
  );
};

export default AnimatedLoginRegister;