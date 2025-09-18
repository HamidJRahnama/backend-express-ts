import jwt from "jsonwebtoken"

const SECRET = "THISISMYSECRET"

export const encodeToken =(payload:any)=>{
    const token = jwt.sign(payload , SECRET ,{expiresIn:"3m"})
    return token
}

export const decodeToken = (token:any )=>{
    const decode = jwt.verify(token , SECRET)
    return decode
}

