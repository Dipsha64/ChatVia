import { IoClose } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import { sendEmailRoute } from "../utils/APIRoutes";
import axios from "axios";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../features/auth/authSlice";
import { useState } from "react";

function AddNewChatUser({closeUserModal}) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const loginUser = useSelector(isAuthenticated);
    const [ errorMessage, setErrorMessage ] = useState("");

    const handleNewUser = async (data) => {
        axios.post(await sendEmailRoute,{email:data.email,id:loginUser.id}).then((res)=>{
            console.log("EMAIL RESSSS", res);
        })
        .catch((error)=>{
            console.log(error);
            setErrorMessage(error.response.data.message);
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        })
    }

    return ( 
        <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-[28rem] h-72 p-6 relative">
                <h2 className="text-xl font-semibold">Invite New Member</h2>
                <button onClick={closeUserModal} className="absolute top-4 right-4 text-white bg-red-500 px-4 py-2 rounded">
                    <IoClose />
                </button>
                <div className="my-4">
                    <hr className="border-t border-gray-300" />
                </div>
                <div>
                    <form noValidate onSubmit={handleSubmit(handleNewUser)}>
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
                            <span className="text-red-500">
                                { errorMessage && <span>{errorMessage}</span>}
                            </span>
                            <div className="flex flex-row-reverse gap-6 mt-9">
                                <button className="p-3 bg-violet-600 text-white rounded-md">Save</button>
                                <button onClick={closeUserModal}>Close</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

export default AddNewChatUser;