
import { UserLoginService } from "../service/userLoginService.js";
// import { verifyRecaptcha } from "../service/recaptchaService.js";
import jwt from 'jsonwebtoken';

export class UserLoginController {
  //post
  async checkUserLogin(req, res, next) {
    try {
      const { token, ...userData } = req.body;

      const userLoginService = new UserLoginService();


      const [jwtToken, refreshtoken, result] = await userLoginService.checkUserLogin(userData.data);

      res.cookie('x-access-token', jwtToken, {
        httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'strict'
      })
      res.cookie('refresh-token', refreshtoken, {
        httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'strict'
      })
      res.json(result)

    }
    catch (ex) {
      const err = {}
      err.statusCode = 500;
      err.message = ex;
      next(err)
    }
  }
  // get
  async getUserLogin(req, res, next) {
    try {
      const userLoginService = new UserLoginService();
      const resultItem = await userLoginService.getUserLogin(req.query);
      return res.status(200).json(resultItem);
    }
    catch (ex) {
      const err = {}
      err.statusCode = 500;
      err.message = ex;
      next(err)
    }
  }

  async editUserLogin(req, res, next) {
    try {
      const userLoginService = new UserLoginService();
      await userLoginService.updateLogin(req.body, req.params.id);
      res.status(200).json({ status: 200 })
    }
    catch (ex) {
      const err = {}
      err.statusCode = 500;
      err.message = ex;
      next(err)
    }
  }
  async refreshToken(req, res, next) {
    const refreshToken = req?.query?.token || req?.cookies["refresh-token"];

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token not found.' });
    }

    try {

      const decoded = jwt.verify(refreshToken, "keyrefresh");


      const accessToken = jwt.sign({ id: decoded.id }, "privateKey", { expiresIn: '20m' });

      res.cookie('x-access-token', accessToken, { httpOnly: true, secure: true, maxAge: 20 * 60 * 1000 }); // 20 minutes
      res.status(200).json({ accessToken });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Refresh token expired.' });
      }
      return res.status(401).json({ message: 'Invalid refresh token.' });
    }
  }

  // src/controllers/userLoginController.js



  async sendCode(req, res) {
    const { username } = req.params;

    try {
      const code = generateRandomCode(6); // Generate random code
      const userLoginService = new UserLoginService();
      await userLoginService.sendVerificationCode(username, code);

      // Implement code to send verification code via email or other means
      // sendVerificationCodeByEmail(username, code); // Example using Nodemailer

      res.send('Verification code sent successfully');
    } catch (error) {
      console.error('Error sending verification code:', error);
      res.status(500).send('Error: Could not send verification code');
    }
  }

  async resetPassword(req, res) {
    const { username } = req.params;
    const { code, newPassword } = req.body;

    try {
      const userLoginService = new UserLoginService();
      const isValidCode = await userLoginService.verifyCode(username, code);
      if (!isValidCode) {
        return res.status(400).send('Invalid verification code');
      }

      await userLoginService.resetPassword(username, newPassword);
      res.send('Password reset successful');
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).send('Error: Could not reset password');
    }
  }
}
// Function to generate random alphanumeric code
function generateRandomCode(length) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}