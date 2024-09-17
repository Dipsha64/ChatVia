import logoImage from "../assets/images/logo.png";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { IoHeartSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { loginAsyncSlice } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    console.log("ERR",errors);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toastOption = {
        position : "top-right",
        autoClose : 8000,
        pauseOnHover : true,
        theme : "dark",
        draggable : true
    }

    const handleLogin = (data) => {
        dispatch(loginAsyncSlice(data)).then((res)=>{
            console.log("LOGIN RESSSS", res);
            if(res.payload && res.payload.status === true){
                toast(res.payload.message,toastOption);
                navigate("/chat");
            }
            else{
                toast(res.payload.message,toastOption);
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    const handleGoogleLogin = () => {
        window.open("http://localhost:4009/auth/google/callback","_self");
    }

    return ( 
        <>
        <div className="max-w-[500px] px-5 pt-16 mx-auto">
            <div className="flex flex-col justify-center items-center">
                <div className="w-36">
                    <img src={logoImage} alt="image"/>
                </div>
                <div className="pt-20 w-full">
                    <form noValidate onSubmit={handleSubmit(handleLogin)}>
                        <h4 className="md:text-xl text-base text-gray-900 font-semibold text-center">Sign Up</h4>
                        <h4 className="pt-4 text-base text-center">Get Your ChatVia Account Now</h4>
                        <div className="bg-white p-10 mt-8">
                            <div>
                                <span>Email</span>
                                <div className="flex items-center border border-gray-300 rounded-md p-2 mt-2 mb-4 max-w-md">
                                    <MdEmail/>
                                    <input type="email" name="email" placeholder="Enter Email" className="flex-1 pl-2 border-none outline-none text-base"
                                        {...register("email",{required : "The email is required.",pattern : {value : /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,message : "Email not valid"}})}/>
                                </div>
                                <span className="text-red-500">
                                    {errors.email && <span>{errors.email.message}</span>}
                                </span>
                            </div>
                            <div>
                                <span>Password</span>
                                <div className="flex items-center border border-gray-300 rounded-md p-2 mt-2 mb-4 max-w-md">
                                    <RiLockPasswordFill/>
                                    <input type="password" name="password" placeholder="Enter Password" className="flex-1 pl-2 border-none outline-none text-base"
                                        {...register("password",{required : "Password is required.",pattern: {value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,message: `at least 8 characters\n
                                        - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                                        - Can contain special characters`}})}/>
                                </div>
                                <span className="text-red-500">
                                    {errors.password && <span>{errors.password.message}</span>}
                                </span>
                            </div>
                            <div className="flex justify-center pt-8">
                                <button className="bg-[#7169ef] text-white py-2 px-4 rounded-md font-semibold text-md">Sign In</button>
                            </div>

                            <div className="flex justify-center items-center">
                                <hr className="w-48 h-1 mx-auto my-4 bg-slate-600 rounded md:my-10"></hr>
                                <span className="m-2.5">OR</span>
                                <hr className="w-48 h-1 mx-auto my-4 bg-slate-600 rounded md:my-10"></hr>
                            </div>
                            <div className="flex justify-center border border-slate-800 rounded-md cursor-pointer" onClick={handleGoogleLogin}>
                                <FcGoogle className="my-auto"/>
                                <button className="py-2 px-4 rounded-md font-semibold text-md">Signin with Google</button>
                            </div>
                        </div>
                    </form>
                    <div className="flex justify-center pt-20">
                        <p className="another-view">Don't have an account ? <Link to="/signup" className="text-[#7169ef] font-semibold">SignUp Now</Link></p>
                    </div>
                    <div className="flex justify-center pt-3">
                        <p>© 2024 Chatvia. Created with </p>
                            <IoHeartSharp className="my-auto mx-1"/> <p>  by Dipsha Mali</p>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer/>
        </>
    );
}

export default Login;