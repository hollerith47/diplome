const axios = require("axios");
const {upsertUser} = require("./UserControllers");

const baseUrl = process.env.LARAVEL_API;
const isAuth = async (token) =>{
    try{
        const response = await axios.get(`${baseUrl}/user`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status === 200){
            console.log("Connection successful user authenticated")
            await upsertUser(response.data)
            // console.log(response.data)

            return response.data;
        }
    } catch (error){
        console.error("Error user not authenticated error");
        return false;
    }
}

const loginAPI = async () => {
    try {
        const userData = {
            email: process.env.API_USER,
            password: process.env.API_KEY,
        };

        // Connexion pour obtenir le token
        const loginResponse = await axios.post(`${baseUrl}/admin/login`, userData, {
            headers: { Accept: "application/json" }
        });

        if (loginResponse.status === 200) {
            console.log("Connection successful, user authenticated");
            // Ici, je suppose que votre intention était de traiter la réponse...
            // await upsertUser(loginResponse.data);

            const token = loginResponse.data.data.token;
            console.log({ token });

            // Utilisation du token pour obtenir les utilisateurs
            const usersResponse = await axios.get(`${baseUrl}/users`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            const users = await usersResponse.data.data;
            for(let user of users) {
                await upsertUser(user);
            }
        }
    } catch (error) {
        console.error("Error: User not authenticated or another error occurred.", error);
        return false;
    }
};


module.exports ={
    isAuth,
    loginAPI
}