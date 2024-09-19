import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import logoImage from "../assets/images/logo.png";
import { IoHeartSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { verifyEmailUserRoute } from '../utils/APIRoutes';
import axios from 'axios';
import Lottie from "react-lottie";
import Thankyou_animation from "../../src/assets/lotties/Thankyou_animation.json";

function MailVerification() {
    const { register, handleSubmit,setValue, formState: { errors } } = useForm();
    console.log("ERR",errors);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Thankyou_animation,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
    };
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const decodedToken = jwtDecode(token);
    setValue("email",decodedToken.email ? decodedToken.email : '');
    const [ userAdded, setUserAdded ] = useState(false);

    const handleCreateNewUser = async (data) => {
        axios.post(verifyEmailUserRoute,{data:data, userId:decodedToken.userId}).then((res)=>{
            if(res.data && res.data.status == true){
                setUserAdded(true);
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    return ( 
        <>
        <div className="max-w-[500px] px-5 pt-16 mx-auto">
            <div className="flex flex-col justify-center items-center">
                <div className="w-36">
                    <img src={logoImage} alt="image"/>
                </div>
                { !userAdded ?
                    <div className="pt-16 w-full">
                        <form noValidate onSubmit={handleSubmit(handleCreateNewUser)}>
                        <h4 className="md:text-3xl text-3xl text-gray-900 font-bold text-center">Join Team on Chatvia</h4>
                            <h4 className="pt-4 text-base text-center">You're accepting an invitation sent to </h4>
                            <h4 className='text-center font-semibold pt-2'>{decodedToken.email}</h4>
                            <div className="bg-white p-10 mt-8">
                                <div>
                                    <span>Email</span>
                                    <div className="flex items-center border border-gray-300 rounded-md p-2 mt-2 mb-4 max-w-md">
                                        <MdEmail/>
                                        <input type="email" name="email" placeholder="Enter Email" disabled className="flex-1 pl-2 border-none outline-none text-base"
                                            {...register("email",{required : "The email is required.",pattern : {value : /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,message : "Email not valid"}})}/>
                                    </div>
                                    <span className="text-red-500">
                                        {errors.email && <span>{errors.email.message}</span>}
                                    </span>
                                </div>
                                <div>
                                    <span>User Name</span>
                                    <div className="flex items-center border border-gray-300 rounded-md p-2 mt-2 mb-4 max-w-md">
                                        <FaUser/>
                                        <input type="text" name="userName" placeholder="Enter Username" className="flex-1 pl-2 border-none outline-none text-base"
                                            {...register("userName",{required : "The user name is required."})}/>
                                    </div>
                                    <span className="text-red-500">
                                        {errors.userName && <span>{errors.userName.message}</span>}
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
                                    <button className="bg-[#7169ef] text-white py-2 px-4 rounded-md font-semibold text-md">Continue</button>
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
                :
                    <div>
                        <div className='pt-32'>
                            <Lottie options={defaultOptions} height={150} width={150} />
                            <h4 className="md:text-3xl text-3xl text-gray-900 font-bold text-center">Thank you for joining us!</h4>
                            <h4 className='md:text-lg text-base text-gray-900 text-center pt-8'>Now, You are able to use <span className="font-bold">Chatvia</span> </h4>
                            <span className='md:text-base pt-3'>For more informaition, Kindly contact to administration.</span>
                        </div>
                        <div className="flex justify-center pt-10">
                            <p>© 2024 Chatvia. Created with </p>
                                <IoHeartSharp className="my-auto mx-1"/> <p> by Dipsha Mali</p>
                        </div>
                    </div>
                }
            </div>
        </div>
        </>
    );
}

export default MailVerification;