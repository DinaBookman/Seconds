import 'dotenv/config';
import fetch from 'node-fetch'; 

export const verifyRecaptcha = async (req, res, next) => {
    try {
        let token;
        if (req.method === 'GET') {
            token = req.query.token; 
        } else if (req.method === 'POST') {
            token = req.body.token; 
        }

        if (!token) {
            return res.status(400).json({ message: 'Token is required.' });
        }

        const isRecaptchaValid = await verify(token);


        if (!isRecaptchaValid.success) {
            return res.status(400).json({ message: 'reCAPTCHA verification failed.' });
        }

        next();
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error during reCAPTCHA verification.', error: err.message });
    }
};

async function verify(token) {
    const secretKey = process.env.REACT_APP_SECRET_KEY;
    const url = `https://www.google.com/recaptcha/api/siteverify`;

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `secret=${secretKey}&response=${token}`
        });

        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}
