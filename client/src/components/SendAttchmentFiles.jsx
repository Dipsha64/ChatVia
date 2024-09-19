import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";

function SendAttchmentFile({selectedFile,closeMediaModal}) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    console.log("selectedFile...",typeof selectedFile, selectedFile );
    const handleMediaMessage = () => {

    }

    const renderPreview = (file) => {
        const { fileType, previewUrl } = file;
        if (fileType.startsWith('image/')) {
        return <img src={previewUrl} alt="Preview" className="preview-image max-w-xs mb-2" />;
        } else if (fileType.startsWith('video/')) {
        return (
            <video controls className="preview-video max-w-xs mb-2">
            <source src={previewUrl} type={fileType} />
            Your browser does not support the video tag.
            </video>
        );
        } else if (fileType === 'application/pdf') {
        return (
            <embed src={previewUrl} type="application/pdf" width="100%" height="300px" className="mb-2" />
        );
        } else if (
        fileType ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
        return (
            <div>
            <p>DOCX file uploaded</p>
            <a href={previewUrl} download={file.file.name} className="download-link text-blue-600">
                Download {file.file.name}
            </a>
            </div>
        );
        } else {
        return (
            <div>
            <p>File uploaded</p>
            <a href={previewUrl} download={file.file.name} className="download-link text-blue-600">
                Download {file.file.name}
            </a>
            </div>
        );
        }
    }
    
    return ( 
        <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-[28rem] max-h-[46rem] p-6 overflow-scroll h-fit min-h-auto relative">
                <h2 className="text-xl font-semibold">Invite New Member</h2>
                <button onClick={closeMediaModal} className="absolute top-4 right-4 text-white bg-red-500 px-4 py-2 rounded">
                    <IoClose />
                </button>
                <div className="my-4">
                    <hr className="border-t border-gray-300" />
                </div>
                <div>
                    <form noValidate onSubmit={handleSubmit(handleMediaMessage)}>
                        <div className="">
                            <div className="">
                                <div className="">
                                {/* {selectedFile.map((file, index) => (
                                    <div key={index} className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-4">
                                        {renderPreview(file)}
                                    </div>
                                ))} */}
                                <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-4">
                                    {selectedFile.length > 0 && (
                                    <div>
                                        <p className="font-semibold mb-2">Send {selectedFile.length} Files</p>
                                        <div className="space-y-4 ">
                                        {selectedFile.map((file, index) => (
                                            <div
                                            key={index}
                                            className="flex items-center border border-gray-300 rounded-lg p-2"
                                            >
                                            {/* Thumbnail Preview */}
                                            {file.fileType.startsWith("image/") ? (
                                                <img
                                                src={file.previewUrl}
                                                alt="Preview"
                                                className="w-12 h-12 object-cover rounded-md"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                                                {file.fileType.startsWith("video/") ? "🎥" : "📄"}
                                                </div>
                                            )}

                                            {/* File Information */}
                                            <div className="ml-3 flex-1">
                                                <p className="text-sm font-medium text-gray-800 truncate">
                                                {file.file.name}
                                                </p>
                                                <p className="text-xs text-gray-500">{file.file.size} KB</p>
                                            </div>
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                    )}
                                </div>
                                </div>
                            </div>
                            <div className="flex flex-row-reverse gap-6 mt-9 fixed top-2 right-2">
                                <button className="p-3 bg-violet-600 text-white rounded-md">Save</button>
                                <button onClick={closeMediaModal}>Close</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

export default SendAttchmentFile;