import axios from "axios";

const serverAPI = "http://localhost:5000/api";

export const getRoomExists = async (roomId) => {
    const response = await axios.get(`${serverAPI}/room-exists/${roomId}`)
    return response.data
}

export const getTURNCredentials = async () => {
    const response = await axios.get(`${serverAPI}/get-turn-credentials`)
    return response.data
}


