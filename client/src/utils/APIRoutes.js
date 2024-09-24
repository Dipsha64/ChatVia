const host = "http://localhost:4009";

export const registerUserRoute = `${host}/api/auth/register`;
export const loginUserRoute = `${host}/api/auth/login`;
export const sendEmailRoute = `${host}/api/auth/send-email`;
export const verifyEmailUserRoute = `${host}/api/auth/verifyEmailUser`;
export const getUserContactsRoute = (ids) => `${host}/api/auth/${ids}/contacts`;
export const sendMessageRoute = `${host}/api/message/`;
export const getUserChatsRoute = (ids) => `${host}/api/chat/${ids}`;
export const getChatMessagesRoute = (ids) => `${host}/api/message/${ids}`