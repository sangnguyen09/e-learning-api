import jwt from 'jsonwebtoken';

export const verifyJwtToken = (token, secrectKey) =>{
    return new Promise((resolve, reject)=>{
        jwt.verify(token, secrectKey, (err, decoded)=>{
            if (err) {
                return reject(err);
            }
            resolve(decoded);
        })
    })
}