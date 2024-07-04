import React, { useState, useContext, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import { UserContext } from '../../App';
import { checkUserLogin } from '../../api';
import { RECAPTCHA_SITE_KEY, RECAPTCHA_DATA_SITE_KEY } from '../../env'



const Login = () => {

  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [exist, setExist] = useState(true);
  const [recaptchaError, setRecaptchaError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const captchaRef = useRef(null);


  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();


  const logIn = async (data) => {
    const token = captchaRef.current.getValue();

    if (!token) {
      setRecaptchaError(true);
      return;
    }
    setRecaptchaError(false)
    captchaRef.current.reset();
    console.log(token)
    try {
      const user = await checkUserLogin(data, token);

      console.log(user)
      localStorage.setItem("currentUser", JSON.stringify(user))
      setExist(true);
      setCurrentUser(user);
      const from = location.state?.from || '/home';
      navigate(from);
    } catch (error) {
      setExist(false);
      console.error('Error logging in:', error);
    }
  };



  return (
    <>
      <div><Link style={{ textDecoration: 'underline' }} to={'/home'}>exit connect</Link></div>
      <h1>login</h1>
      {!exist && <div>Incorrect username or password</div>}
      {recaptchaError && <div>Please verify that you are not a robot.</div>}
      <form noValidate onSubmit={handleSubmit(logIn)}>
        <input type='text' name='username' placeholder='username'
          {...register("username", {
            required: "username is required.",
          })} />
        {errors.username ? <p>{errors.username.message}</p> : <br />}
        <input type="password" name="password" id="" placeholder='password'
          {...register("password", {
            required: "password is required.",
          })} />
        {errors.password ? <p>{errors.password.message}</p> : <br />}
        <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY}
          ref={captchaRef}
        />
        <div className="h-captcha" data-sitekey={RECAPTCHA_DATA_SITE_KEY}></div>
        <input type="submit" value="Log In" />
      </form>
      <div>new here? <Link style={{ textDecoration: 'underline' }} to={'/auth/register'}>please sign up</Link></div>
      {/* <div>Forgot your password? <Link style={{ textDecoration: 'underline' }} to={'/auth/forgot-password'}>Reset Password</Link></div> */}
    </>
  )
}
export default Login