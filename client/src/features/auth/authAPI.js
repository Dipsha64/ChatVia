import axios from "axios";
import { loginUserRoute } from "../../utils/APIRoutes";

export const loginUserAPI = (userData) => {
    return new Promise(async(resolve, reject) => {
        const result = await axios.post(loginUserRoute,userData);
        resolve(result);
    })
}