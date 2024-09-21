
export const generateVerificationCode = (length = 6): string =>{
    const character = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789';
    let verificationCode = ''; //6 digit code yha store karenge
    const charactersLength = character.length;

    for (let i=0; i<length; i++){
        verificationCode += character.charAt(Math.floor(Math.random() * charactersLength))
    }

    return verificationCode;
};