import React, { useState, useContext, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import Cookies from 'js-cookie';
import { UserContext } from '../App';
import { checkUserLogin } from '../api';


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

    try {
      const jwtToken = await checkUserLogin(data,token);
      console.log(jwtToken)
        const user = { id: 6, username: data.username };
        // Cookies.set('user', JSON.stringify(user), { expires: 1 }); // Save user in cookie
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
        <ReCAPTCHA sitekey='6Le45PQpAAAAAMmqahVM7Clw7wrXviXTkesVYVMY'
          ref={captchaRef}
        />
        <div className="h-captcha" data-sitekey="b8cd8c24-4840-4155-ba11-bdc0c7f9a353"></div>
        <input type="submit" value="Log In" />
      </form>
      <div>new here? <Link style={{ textDecoration: 'underline' }} to={'/auth/register'}>please sign up</Link></div>
    </>
  )
}
export default Login