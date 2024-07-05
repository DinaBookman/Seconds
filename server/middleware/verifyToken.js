import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req?.query?.token || req?.cookies["x-access-token"];
    console.log(token, "I got into the verify");
    
    if (!token) {
        return res.status(403).send("No access token");
    }

    try {
        const verified = jwt.verify(token, "privateKey");
        if (!verified) {
            return res.status(401).send("Invalid Token");
        }
        req.user = verified; 
        next(); 
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
};


