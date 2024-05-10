const User = require('../models/user.model');
// const {loginAPI} = require("./AuthController");
const axios = require("axios");

const baseUrl = process.env.LARAVEL_API;

const upsertUser = async (data) => {
    const {first_name, last_name, email, role, phone, about, gender, image, birth_date} = data ;

    try{
        const userData = {
            first_name, last_name, email,
            role, phone, about, gender,
            image, birth_date
        }
        const user = await User.findOneAndUpdate(
            { email: email }, // critère de recherche par email
            { $set: userData }, // mise à jour des données
            { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true } // options
        );
        return !!user;
    }catch (error) {
        console.log("error creating/updating user", error)
        return false;
    }
}


const getUsers = async (token) =>{
    try {
        // const token = await loginAPI();

        // console.log({token})
        const response = await axios.get(`${baseUrl}/users`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        })

        // console.log(response.data)
        return response.data.data.data;

    }catch (error) {
        console.log("error getting users", error)
    }


}
module.exports = {
    upsertUser,
    getUsers
}