import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {AiOutlineGithub, AiOutlineGooglePlus} from "react-icons/ai";
import {FiFacebook} from "react-icons/fi";
import {CiTwitter} from "react-icons/ci";
import {useForm} from "react-hook-form";
import {PropagateLoader} from "react-spinners";
import {overrideStyle} from "../../utils/utils.js";
import {useDispatch, useSelector} from "react-redux";
import {seller_login ,messageClear} from "../../store/Reducers/authReducer.js";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch()
  const {loader,errorMessage,successMessage } = useSelector((state)=> state.auth)
  
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {register, handleSubmit} = form;

  const submit = (data) => {
    dispatch(seller_login(data))
  };
  
  useEffect(() => {
         if(successMessage){
           toast.success(successMessage)
              dispatch(messageClear())
         }
         if (errorMessage){
            toast.error(errorMessage)
            dispatch(messageClear())
         }
  }, [successMessage,errorMessage]);

  return (
    <div className='w-full min-h-screen bg-[#161d31] flex justify-center items-center'>
      <div className='w-[400px] text-[#d0d2d6] p-2'>
        <div className='bg-[#283046] p-4 rounded-md'>
          <h2 className='mb-3 text-xl'>Welcome to e-commerce</h2>
          <p className='mb-3 text-sm'>Please sign in to your account and start your business</p>
          <form action='' onSubmit={handleSubmit(submit)}>
            <div className='flex flex-col w-full gap-3 mb-3'>
              <label htmlFor='email'>Email</label>
              <input {...register("email")} type='email' id='email' placeholder='Email' className='px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden' />
            </div>

            <div className='flex flex-col w-full gap-3 mb-8'>
              <label htmlFor='password'>Password</label>
              <input {...register("password")} type='text' id='password' placeholder='Password' className='px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden' />
            </div>
            
            <div>
              <button disabled={loader ? true : false} type="submit" className="w-full py-2 mb-3 text-lg bg-blue-500 rounded-md hover:shadow-blue-500/20 hover:shadow-lg px-7 py7">
                {loader ? <PropagateLoader color="#fff" cssOverride={overrideStyle}/> : "Log In"}
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-3 mb-3">
              <p>
                Don't have an account ?{" "}
                <Link to={"/register"} className="underline">
                  Sign up here
                </Link>
              </p>
            </div>
            
            <div className='flex items-center justify-center w-full mb-3'>
              <div className='w-[45%] bg-slate-700 h-[1px]'></div>
              <div className='w-[10%] justify-center items-center flex'>
                <span className='pb-1'>Or</span>
              </div>
              <div className='w-[45%] bg-slate-700 h-[1px]'></div>
            </div>

            <div className='flex items-center justify-center gap-6'>
              <div className='w-[35px] h-[35px] flex rounded-md bg-orange-500 items-center justify-center shadow-lg hover:shadow-orange-700/50  cursor-pointer overflow-hidden'>
                <span>
                  <AiOutlineGooglePlus size={24} />{" "}
                </span>
              </div>

              <div className='w-[35px] h-[35px] flex rounded-md bg-indigo-500 items-center justify-center shadow-lg hover:shadow-indigo-700/50  cursor-pointer overflow-hidden'>
                <span>
                  <FiFacebook size={24} />{" "}
                </span>
              </div>

              <div className='w-[35px] h-[35px] flex rounded-md bg-cyan-500 items-center justify-center shadow-lg hover:shadow-cyan-700/50  cursor-pointer overflow-hidden'>
                <span>
                  <CiTwitter size={24} />{" "}
                </span>
              </div>

              <div className='w-[35px] h-[35px] flex rounded-md bg-purple-500 items-center justify-center shadow-lg hover:shadow-purple-700/50  cursor-pointer overflow-hidden'>
                <span>
                  <AiOutlineGithub size={24} />{" "}
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
