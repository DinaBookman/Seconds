
// import 'dotenv/config'
// async function verifyRecaptcha (token) {
//     const secretKey = process.env.REACT_APP_SECRET_KEY;
//     const url = `https://www.google.com/recaptcha/api/siteverify`;
// console.log("esrhdfgukhil")
//     try {
//         const res = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             body: `secret=${secretKey}&response=${token}`
//         });
//         const data = await res.json();
//         return data;
//     } catch (error) {
//         throw new Error(error);
//     }
// }

// export {
//     verifyRecaptcha
// };