import React, { useState, useContext, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import { UserContext,RegisterContext } from '../../App';
import { checkUserLogin } from '../../api';
import { RECAPTCHA_SITE_KEY, RECAPTCHA_DATA_SITE_KEY } from '../../env'
import './Login.css'; // Import the CSS file




const Login = () => {

  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [signup,setSignup]=useContext(RegisterContext);
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
      const user = await checkUserLogin(data, token);
      localStorage.setItem("currentUser", JSON.stringify(user))
      setExist(true);
      setCurrentUser(user);
      setSignup(false)
      const from = location.state?.from || '/home';
      navigate(from);
    } catch (error) {
      setExist(false);
    }
  };



  return (
    <>
    <div><Link className="link" to={'/home'}>Exit Connect</Link></div>
    <div className="container">
      <h1>Login</h1>
      {signup && <div className="success-message">You successfully signed up! Please login now.</div>}
      {!exist && <div className="error-message">Incorrect username or password</div>}
      {recaptchaError && <div className="error-message">Please verify that you are not a robot.</div>}
      <form noValidate onSubmit={handleSubmit(logIn)}>
        <input type='text' name='username' placeholder='Username'
          {...register("username", {
            required: "Username is required.",
          })} />
        {errors.username && <p className="error-message">{errors.username.message}</p>}
        <input type="password" name="password" placeholder='Password'
          {...register("password", {
            required: "Password is required.",
          })} />
        {errors.password && <p className="error-message">{errors.password.message}</p>}
        <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} ref={captchaRef} />
        <input type="submit" value="Log In" />
      </form>
      <div>New here? <Link className="link" to={'/auth/register'}>Please sign up</Link></div>
    </div>
  </>
  
  )
}
export default Login