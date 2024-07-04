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
        req.user = verified; // Attach the verified user information to the request object
        next(); // Call the next middleware/route handler
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
};



// import jwt from 'jsonwebtoken';

// export const verifyToken = async (req, res, next) => {
//   // Check if access token is present in cookies
//   const accessToken = req.cookies['x-access-token'];

//   try {
//     if (!accessToken) {
//       throw new Error('Access token not found');
//     }

//     // Verify access token
//     const decoded = jwt.verify(accessToken, 'privateKey');
//     req.user = decoded; // Set the decoded user information on the request object

//     // Continue with the next middleware or route handler
//     return next();
//   } catch (error) {
//     // If access token is invalid or expired, check for refresh token
//     const refreshToken = req.cookies['refresh-token'];
//     if (!refreshToken) {
//       return res.status(401).send('Unauthorized: No tokens provided');
//     }

//     try {
//       // Verify refresh token
//       const decodedRefreshToken = jwt.verify(refreshToken, 'keyrefresh');
//       // Assuming the refresh token is valid, issue a new access token
//       const newAccessToken = jwt.sign({ id: decodedRefreshToken.id }, 'privateKey', { expiresIn: '1m' });

//       // Set the new access token in cookies
//       res.cookie('x-access-token', newAccessToken, { httpOnly: true, secure: true, maxAge: 1 * 60 * 1000 }); // 20 minutes

//       // Set the decoded user information on the request object
//       req.user = decodedRefreshToken;

//       // Proceed with the request
//       return next();
//     } catch (refreshError) {
//       return res.status(401).send('Unauthorized: Invalid tokens');
//     }
//   }
// };

