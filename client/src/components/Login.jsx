import React, { useState, useEffect, useContext,useRef  } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../App'
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha'



const Login = () => {

  //const [currentUser, setCurrentUser] = useContext(UserContext);
  const [exist, setExist] = useState(true);
  const navigate = useNavigate();
  const captchaRef = useRef(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // const goToHome = (data) => {
  //   setCurrentUser({
  //     id: data.id,
  //     name: data.name,
  //     email: data.email,
  //     street: data.street,
  //     city: data.city,
  //     zipcode: data.zipcode,
  //     phone: data.phone,
  //     website: data.website,
  //   })
  //   localStorage.setItem('currentUser', JSON.stringify({ username: data.username, id: data.id }));
  //   navigate(`/home/users/${data.id}`)
  // }


  // const getUserDetails = (userId) => {
  //   fetch(`http://localhost:8080/users/${userId}`)
  //     .then(async response => {
  //       const data = await response.json();
  //       goToHome(data[0])
  //     })
  //     .catch(err => console.error(err))
  // }

  const logIn = (data) => {
    const token = captchaRef.current.getValue();
    captchaRef.current.reset();
    console.log(data)
    fetch(`http://localhost:8080/userLogin`, {
      method: 'POST',
      body: JSON.stringify({data, token }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
    )
      .then(async response => {
        const userId = await response.json();//is it safe to get the data????
        (userId == false) ? (setExist(false),console.log("ggggggg")) : (setExist(true),console.log("jjjjj"))
      })
  }


  return (
    <>
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