import CryptoJS from 'crypto-js';
import {ENCRYPTION_KEY} from "../config";



// Encrypt
// const encrypted = CryptoJS.AES.encrypt(message, ENCRYPTION_KEY).toString();
export function encrypt (text){
    return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
}

// Decrypt
export function decrypt (encryptedText) {
    const bytes = CryptoJS.AES.decrypt(encryptedText, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}
