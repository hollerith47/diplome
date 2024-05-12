const twilio = require("twilio");

const getTurnServers =  (req, res) => {
    const accountSID = process.env.TWILIO_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    const client = twilio(accountSID, authToken);
    try {
        client.tokens.create().then((token) => {
            res.send({token});
        })
    }catch (error){
        console.log("error while fetching twilio");
        console.log(error);
        res.send({token: null})
    }
}

module.exports ={
    getTurnServers
}