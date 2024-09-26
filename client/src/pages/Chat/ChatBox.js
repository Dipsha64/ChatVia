function ChatBox({ messageObj, isSender }) {
    return ( 
        <>
        <div className={`flex ${(isSender === messageObj.sender) ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`max-w-xs px-4 py-2 rounded-lg ${(messageObj.sender === isSender) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                {messageObj.messageContent}
            </div>
        </div>
        </>
    );
}

export default ChatBox;