function ChatBox({ message, isSender }) {
    return ( 
        <>
        <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`max-w-xs px-4 py-2 rounded-lg ${isSender ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                {message}
            </div>
        </div>
        </>
    );
}

export default ChatBox;