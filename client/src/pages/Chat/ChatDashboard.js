import logoSingle from "../../assets/images/logoSingle.png";
import { FiUser } from "react-icons/fi";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { RiGroupLine } from "react-icons/ri";
import { RiContactsLine } from "react-icons/ri";
import { LuSettings } from "react-icons/lu";
import profilePic from "../../assets/images/profile.jpg";
import { RiUserAddLine } from "react-icons/ri";
import { GoSearch } from "react-icons/go";

function ChatDashboard() {
    return ( 
        <>
        <div>
            <div className="flex h-[100vh]">
                <div className="min-w-[5%] max-w-[5%] bg-white lg:p-4 md:p-2 flex flex-col justify-between items-center md:overflow-y-auto" style={{ boxShadow: '0 2px 4px #0f223a1f' }}>
                    <div>
                        <img src={logoSingle} alt="logoSingle"/>
                    </div>
                    <div>
                        <ul>
                            <li className="w-[38px] h-[56px] rounded-md my-auto text-2xl flex justify-center items-center"><FiUser /></li>
                            <li className="w-[38px] h-[56px] rounded-md my-auto text-2xl flex justify-center items-center"><IoChatboxEllipsesOutline /></li>
                            <li className="w-[38px] h-[56px] rounded-md my-auto text-2xl flex justify-center items-center"><RiGroupLine /></li>
                            <li className="w-[38px] h-[56px] rounded-md my-auto text-2xl flex justify-center items-center"><RiContactsLine /></li>
                            <li className="w-[38px] h-[56px] rounded-md my-auto text-2xl flex justify-center items-center"><LuSettings /></li>
                        </ul>
                    </div>
                    <div>
                        <img className="rounded-full" src={profilePic} alt="profilePic"/>
                    </div>
                </div>
                <div className="w-2/6">
                    <div>
                        <div className="">
                            <div className="flex justify-between items-center px-4 pt-4">
                                <div><h4 className="font-semibold text-xl">Chats</h4></div>
                                <div className="w-[38px] h-[56px] rounded-md my-auto text-2xl flex justify-center items-center"><RiUserAddLine /></div>
                            </div>
                            <div className="flex items-center border border-gray-300 rounded-md p-2 mt-2 mb-4 max-w-md mx-2">
                                <GoSearch/>
                                <input type="text" name="search" placeholder="Search users" className="flex-1 pl-2 border-none outline-none text-base bg-transparent"/>
                            </div>
                        </div>
                        <div className="px-4 pt-4">
                            <h5 className="font-medium text-base">Recent</h5>
                            <ul>
                                <li className="">
                                    <div className="flex bg-[#e6ebf5] rounded-md">
                                        <div className="flex justify-center items-center p-3">
                                            <img className="h-10 w-10 rounded-full" src={profilePic} alt="profileImage"/>
                                        </div>
                                        <div className="w-4/5 my-auto">
                                            <h5 className="text-base font-semibold">Urja Test</h5>
                                            <p className="text-sm">Hey there! I'm available.</p>
                                        </div>
                                        <div className="flex justify-center my-auto whitespace-nowrap p-2">
                                            05 min
                                        </div>
                                    </div>
                                </li>
                                <li className="">
                                    <div className="flex">
                                        <div className="flex justify-center items-center p-3">
                                            <img className="h-10 w-10 rounded-full" src={profilePic} alt="profileImage"/>
                                        </div>
                                        <div className="w-4/5 my-auto">
                                            <h5 className="text-base font-semibold">Urja Test</h5>
                                            <p className="text-sm">Hey there! I'm available.</p>
                                        </div>
                                        <div className="flex justify-center my-auto whitespace-nowrap p-2">
                                            05 min
                                        </div>
                                    </div>
                                </li>
                                <li className="">
                                    <div className="flex">
                                        <div className="flex justify-center items-center p-3">
                                            <img className="h-10 w-10 rounded-full" src={profilePic} alt="profileImage"/>
                                        </div>
                                        <div className="w-4/5 my-auto">
                                            <h5 className="text-base font-semibold">Urja Test</h5>
                                            <p className="text-sm">Hey there! I'm available.</p>
                                        </div>
                                        <div className="flex justify-center my-auto whitespace-nowrap p-2">
                                            05 min
                                        </div>
                                    </div>
                                </li>
                                <li className="">
                                    <div className="flex">
                                        <div className="flex justify-center items-center p-3">
                                            <img className="h-10 w-10 rounded-full" src={profilePic} alt="profileImage"/>
                                        </div>
                                        <div className="w-4/5 my-auto">
                                            <h5 className="text-base font-semibold">Urja Test</h5>
                                            <p className="text-sm">Hey there! I'm available.</p>
                                        </div>
                                        <div className="flex justify-center my-auto whitespace-nowrap p-2">
                                            05 min
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="w-4/5 bg-white">
                    C
                </div>
            </div>
        </div></>
    );
}

export default ChatDashboard;