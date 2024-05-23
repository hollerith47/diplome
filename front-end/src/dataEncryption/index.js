import {ENCRYPTION_KEY} from "../config";

const Cryptr = require("cryptr");
const cryptr = new Cryptr(ENCRYPTION_KEY);


export function encrypt(text){
    return cryptr.encrypt(text);
}

export function decrypt(text){
    return cryptr.decrypt(text);
}
