import React, { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { UserContext } from '../App'
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha'
import Cookies from 'js-cookie';
import { UserContext } from '../App'


const Login = () => {

  //const [currentUser, setCurrentUser] = useContext(UserContext);
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [exist, setExist] = useState(true);
  const navigate = useNavigate();
  const captchaRef = useRef(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();


  // useEffect(() => {
  //   // const currentUser = getUserFromCookie();
  //   // if (currentUser) {
  //     navigate(`/home`);
  //   // }
  // }, [exist]);

  const logIn = async (data) => {
    const token = captchaRef.current.getValue();
    captchaRef.current.reset();

    try {
      const response = await fetch('http://localhost:8080/userLogin', {
        method: 'POST',
        body: JSON.stringify({ data, token }),
        //credentials: 'include', // Send cookies with the request
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const userId = await response.json();

      if (userId) {
        const user = { id: userId, username: data.username };
        Cookies.set('user', JSON.stringify(user), { expires: 1 }); // Save user in cookie
        setExist(true);
        setCurrentUser(user);
        navigate(`/home`);
      } else {
        setExist(false);
      }
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