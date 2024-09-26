import profilePic from "../../assets/images/profile.jpg";
import { FiUser } from "react-icons/fi";
import { RiSearchLine } from "react-icons/ri";
import EmojiPicker from 'emoji-picker-react';
import { useEffect, useState } from "react";
import { RiAttachment2 } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import ChatBox from "./ChatBox";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../../features/auth/authSlice";
import SendAttchmentFile from "../../components/SendAttchmentFiles";
import { sendMessageRoute } from "../../utils/APIRoutes";
import axios from "axios";
import { isSocketConnection } from "../../features/socket/socketSlice";

function MessageSection({selectedUserChat}) {
    const [message, setMessage] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const loginUser = useSelector(isAuthenticated);
    const socketConnection = useSelector(isSocketConnection);
    const [selectedFile, setSelectedFile] = useState([]);
    const [ sendMediaMessage, setSendMediaMessage ] = useState(false);
    const [ allMessage, setAllMessage ] = useState([]);

    const onEmojiClick = (emojiObject) => {
        setMessage(prevInput => prevInput + emojiObject.emoji);
        // setShowPicker(false);
    };

    const saveNewMessage = async () => {
        const msgObj = { msgInfo : message, loginUser : loginUser, selectedChatUser : selectedUserChat};
        axios.post(sendMessageRoute,msgObj).then((res)=>{
            console.log("RESSS",res);
            socketConnection.on("allMessages",(data)=>{
                console.log("data.." ,data);
                setAllMessage(oldMessages => [data, ...oldMessages])
                // setAllMessage(data);
                setMessage("");
            })
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const handleIconClick = () => {
        document.getElementById('fileInput').click();
    };

    useEffect(()=>{
        if(socketConnection){
            socketConnection.emit('message-page',{loginUser : loginUser.id, user : selectedUserChat._id});
        }

        socketConnection.on("allMessages",(data)=>{
            console.log("data.." ,data);
            setAllMessage(data);
        })
    },[socketConnection,selectedUserChat?._id])

    const handleFileChange = (e) => {
        console.log("EVEEEE",e.target.files);
        // const files = e.target.files;
        // setSelectedFile(e.target.files);
        setSendMediaMessage(true);
        const selectedFiles = Array.from(e.target.files);
        const updatedFiles = selectedFiles.map((file) => ({
            file,
            previewUrl: URL.createObjectURL(file),
            fileType: file.type,
        }));
        setSelectedFile(updatedFiles);
    }
    
    const handleMediaModel = () => {
        setSendMediaMessage(false);
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        if(message){
            const msgObj = { msgInfo : message, loginUser : loginUser, selectedChatUser : selectedUserChat};
            if(socketConnection){
                socketConnection.emit("newMessage",msgObj);
            }
        }
    }

    return ( 
        <>
        <div>
            <div>
                <div className="flex flex-col p-7 overflow-x-hidden justify-around">
                    <div>
                        <div>
                            <div className="flex justify-between mr-14">
                                <div className="flex my-auto">
                                    <img className="max-h-10 max-w-10 rounded-full" src={profilePic} alt="profilePic"/>
                                    <h3 className="text-base font-semibold my-auto mx-5">{selectedUserChat.userName ? selectedUserChat.userName : ''}</h3>
                                </div>
                                <div className="w-[38px] h-[56px] rounded-md my-auto text-2xl flex justify-center items-center ">
                                    <ul className="flex gap-8">
                                        <li><RiSearchLine /></li>
                                        <li><FiUser/></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="my-4">
                                <hr className="border-t border-gray-300" />
                            </div>
                        </div>
                    </div>
                    <div className="h-[calc(100vh-128px)] overflow-y-scroll scrollbar overflow-x-hidden">
                        <div className="">
                            {allMessage.map((msg) => (
                                <ChatBox key={msg._id} messageObj={msg} isSender={loginUser.id} />
                            ))}
                        </div>
                    </div>
                    <div className="h-2/6">
                        <div className="lg:w-[65%] fixed bottom-0">
                            <div className="my-4">
                                <hr className="border-t border-gray-300" />
                            </div>
                            {/* Preview the selected file */}
                                {/* {filePreview && (
                                    <div className="mb-4">
                                    <div className="flex items-center space-x-2">
                                        {selectedFile.type.startsWith('image') ? (
                                        <img src={filePreview} alt="Preview" className="w-16 h-16 object-cover rounded" />
                                        ) : (
                                        <p>{selectedFile.name}</p> // Show file name for non-image files
                                        )}
                                        <button onClick={removeFile} className="bg-red-500 text-white px-2 py-1 rounded">
                                        Remove
                                        </button>
                                    </div>
                                    </div>
                                )} */}
                            <div className="flex">
                                <div className="box-footer chat-input-section p-3 p-lg-4 border-top mb-0 w-[75%]">
                                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="min-h-5 max-h-20 w-full bg-[#e6ebf5] py-4 pl-3 rounded-md overflow-scroll box-content outline-0" placeholder="Type Message"/>
                                </div>
                                <div className="w-[25%] relative flex justify-around my-auto">
                                    <div>
                                        <img
                                            className="emoji-icon" height={20} width={20}
                                            src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                                            onClick={() => setShowPicker((val) => !val)}
                                        />
                                        <div className="absolute bottom-full mb-2 -left-[328px] right-0">
                                            {showPicker && (
                                                <EmojiPicker pickerStyle={{ width: "100%" }} onEmojiClick={onEmojiClick} />
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <RiAttachment2 size={20} onClick={handleIconClick}/>
                                        <input type="file" style={{ display: 'none' }} multiple id="fileInput" onChange={(e) => handleFileChange(e)} className="block mb-2"/>
                                    </div>
                                    <div>
                                        <button onClick={(e) => handleSendMessage(e)}><IoSend size={25}/></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {sendMediaMessage && 
                    <SendAttchmentFile selectedFile={selectedFile} closeMediaModal={handleMediaModel}/>
                }
            </div>
        </div>
        </>
    );
}

export default MessageSection;