import axios from "axios";

const serverAPI = "http://localhost:5000/api";

export const getRoomExists = async (roomId) => {
    const response = await  axios.get(`${serverAPI}/room-exists/${roomId}`)
    console.log(serverAPI)
    return response.data
}




