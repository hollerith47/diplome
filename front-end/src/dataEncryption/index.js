import CryptoJS from 'crypto-js';


// Encrypt
// const encrypted = CryptoJS.AES.encrypt(message, ENCRYPTION_KEY).toString();
export function encrypt (text, secretKey){
    return CryptoJS.AES.encrypt(text, secretKey).toString();
}

// Decrypt
export function decrypt (encryptedText, secretKey){
    const bytes  = CryptoJS.AES.decrypt(encryptedText, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}
