import logoSingle from "../../assets/images/logoSingle.png";
import { FiUser } from "react-icons/fi";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { RiGroupLine } from "react-icons/ri";
import { RiContactsLine } from "react-icons/ri";
import { LuSettings } from "react-icons/lu";
import profilePic from "../../assets/images/profile.jpg";
import { RiUserAddLine } from "react-icons/ri";
import { GoSearch } from "react-icons/go";
import MessageSection from "./MessageSection";
import { useEffect, useState } from "react";
import AddNewChatUser from "../../components/AddNewChatUser";
import axios from "axios";
import { getUserContactsRoute, getChatMessagesRoute } from "../../utils/APIRoutes";
import { useSelector, useDispatch } from "react-redux";
import { isAuthenticated, setOnlineUsers, onlineUserList } from "../../features/auth/authSlice";
import { setSocket } from "../../features/socket/socketSlice";
import { PiUserCircle } from "react-icons/pi";
import chatBackground from "../../assets/images/chatBackground.png";
import io from "socket.io-client";

function ChatDashboard() {
    const [showToggle, setShowToggle] = useState(false);
    const [isOpenUserModel, setIsOpenUserModel ] = useState(false);
    const loginUser = useSelector(isAuthenticated);
    const [ chatUsers, setChatUsers ] = useState([]);
    const [ selectedUserChat, setSelectedUserChat ] = useState({});
    const onlineUserArr = useSelector(onlineUserList);
    const dispatch = useDispatch();

    const handleNewUserModel = () => {
        setIsOpenUserModel(!isOpenUserModel);
    }  
    
    /***socket connection */
    useEffect(()=>{
        const socketConnection = io(process.env.REACT_APP_BACKEND_URL,{
            auth : {
                userId : loginUser.id
            }
        })
        dispatch(setSocket(socketConnection));

        socketConnection?.on("getOnlineUsers",(onlineUsers)=>{
            console.log("onlineUsers..",onlineUsers);
            dispatch(setOnlineUsers(onlineUsers));
        })

        return ()=>{
            socketConnection.disconnect();
        }
    },[loginUser])

    // Get User listing in chat User
    const getUserAllChat = async () => {
        axios.get(getUserContactsRoute(loginUser.id)).then((result)=>{
            console.log("resultresultresult",result);
            if(result.data && result.data.status == true){
                setChatUsers(result.data.data);
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    // Display First Two letter of name if profile photo is not exist
    const InitialImageName = ({name}) => {
        const nameParts = name.split(" ");
        // Get the first letter of the first and last names
        const initials = nameParts.length >= 2 
            ? nameParts[0][0] + nameParts[nameParts.length - 1][0] 
            : nameParts[0][0] + nameParts[0][1]; // If there's only one name part, return its first letter

        return <div>{initials.toUpperCase()}</div>;
    }
    // Create random background
    const randomBackgroung = [
        'bg-teal-200',
        'bg-slate-200',
        'bg-orange-200',
        'bg-blue-200',
        'bg-yellow-200',
        'bg-green-200',
        'bg-indigo-200',
        'bg-emerald-200',
        'bg-rose-200',
        'bg-cyan-200',
        'bg-fuchsia-200',
        'bg-pink-200',
    ];

    const randomNumber = Math.floor(Math.random() * 11);

    // Get Selected user's chat messages
    const getUserChatMessage = (item) => {
        console.log("ITEmm", item);
        setSelectedUserChat(item);
        // axios.post(getChatMessagesRoute(loginUser.id),item._id).then((res)=>{
        //     console.log("resssss",res);
        // })
        // .catch((error)=>{
        //     console.log(error);
        // })
    }

    useEffect(()=>{
        getUserAllChat();
    },[])
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
                    <div className="relative">
                        <img className="rounded-full" src={profilePic} alt="profilePic" onClick={() => setShowToggle((val)=> !val)}/>
                        <div className="absolute bottom-full mb-2 -right-[12px] mt-2 rounded-md w-16" style={{ boxShadow: '4px 4px 4px #0f223a1f' }}>
                            { showToggle && 
                                <div>
                                    <ul>
                                        <li>Profile</li>
                                        <li>Log out</li>
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="w-2/6">
                    <div>
                        <div className="">
                            <div className="flex justify-between items-center px-4 pt-4">
                                <div><h4 className="font-semibold text-xl">Chats</h4></div>
                                <div className="w-[38px] h-[56px] rounded-md my-auto text-2xl flex justify-center items-center" onClick={handleNewUserModel}><RiUserAddLine /></div>
                            </div>
                            <div className="flex items-center border border-gray-300 rounded-md p-2 mt-2 mb-4 max-w-md mx-2">
                                <GoSearch/>
                                <input type="text" name="search" placeholder="Search users" className="flex-1 pl-2 border-none outline-none text-base bg-transparent"/>
                            </div>
                        </div>
                        <div className="px-4 pt-4">
                            <h5 className="font-medium text-base">Recent</h5>
                            <ul>
                                { chatUsers.map((item,index)=>{
                                    return <li className="" key={index} onClick={() => getUserChatMessage(item)}>
                                        <div className={`flex my-3 ${selectedUserChat._id === item._id  ? 'bg-[#e6ebf5] rounded-md' : ''}`}>
                                            <div className={`flex justify-center items-center p-3 font-bold rounded-full shadow relative ${randomBackgroung[index % randomBackgroung.length]}`}>
                                                { 
                                                    item.profilePhoto ? (<img className="max-h-10 max-w-10 rounded-full" src={item.profilePhoto} alt="profileImage"/> )
                                                    : 
                                                    (item.userName ? <div className="overflow-hidden rounded-full "><InitialImageName name={item.userName}/></div> : <PiUserCircle/>)
                                                }
                                                { 
                                                    ( onlineUserArr.includes(item._id) && <div className='bg-green-600 p-1 absolute bottom-2 right-0 z-10 rounded-full'></div> )
                                                }
                                            </div>
                                            <div className="lg:w-4/5 md:w-3/5 sm:w-1/5 my-auto ml-3">
                                                <h5 className="text-base font-semibold">{item.userName}</h5>
                                                <p className="text-sm truncate">Hey there! I'm available.</p>
                                            </div>
                                            <div className="flex justify-center my-auto lg:whitespace-nowrap lg:p-2">
                                                05 min
                                            </div>
                                        </div>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="w-4/5 bg-white">
                    {selectedUserChat && Object.keys(selectedUserChat).length > 0 ? 
                        <MessageSection selectedUserChat={selectedUserChat} />
                    : 
                    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${chatBackground})`}}>
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="relative">
                                <img
                                    src="https://via.placeholder.com/400x250"
                                    alt="Chat App Preview"
                                    className="w-96 h-56 rounded-lg"
                                />
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 bg-green-500 rounded-full p-3">
                                    <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                                    alt="Chat App Icon"
                                    className="w-10 h-10"
                                    />
                                </div>
                                </div>
                            </div>
                            <h1 className="text-3xl text-white font-semibold mb-4">Send Messages With Your Friends</h1>
                            <p className="text-gray-300 mb-6">
                                Make calls and get a faster experience when you download the Mac app.
                            </p>
                            <a
                                href="#"
                                className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600"
                            >
                                Get from App Store
                            </a>
                        </div>
                    </div>
                    }
                </div>
                {isOpenUserModel && 
                    <div>
                        <AddNewChatUser closeUserModal={handleNewUserModel}/>
                    </div>
                }
            </div>
        </div></>
    );
}

export default ChatDashboard;