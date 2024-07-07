import React, { useState,useRef } from 'react'
import { Link } from 'react-router-dom';
import UserDetailes from './UserDetailes';
import { useForm } from "react-hook-form";
import { fetchUserLogin } from '../../api';
import ReCAPTCHA from 'react-google-recaptcha';
import { RECAPTCHA_SITE_KEY, RECAPTCHA_DATA_SITE_KEY } from '../../env'

const Register = () => {

    const [exist, setExist] = useState("");
    const [input, setInput] = useState({ name: "", password: "" })
    const [recaptchaError, setRecaptchaError] = useState(false);
    const captchaRef = useRef(null);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const isExist = async (name,token) => {
 
        try {
            const reasult = await fetchUserLogin(name,token);
            if (reasult.length)
                setExist("exist")
            else
                setExist("notExist")
        }
        catch (error) {
            alert(error)
        }
    }

    const signUp = (data) => {
        if (data.password != data.passwordVerification) {
            setExist("notValid");
            return
        }
        const token = captchaRef.current.getValue();

        if (!token) {
          setRecaptchaError(true);
          return;
        }
        setRecaptchaError(false)
        captchaRef.current.reset();
        setInput({ name: data.username, password: data.password })
        isExist(data.username,token);

    }

    return (
        <>
            <h1>sign up</h1>
            {exist === "notValid" && <div>not valid input</div>}
            {exist === "exist" && <div>you are an existing user please log in!</div>}
            {recaptchaError && <div>Please verify that you are not a robot.</div>}
            {exist === "notExist" ? <UserDetailes username={input.name} password={input.password} /> :
                 <div className="container">
                    <form noValidate onSubmit={handleSubmit(signUp)}>
                        <input type='text' name='username' placeholder='username'
                            {...register("username", {
                                required: "username is required.",
                            })} />
                        {errors.username ? <p>{errors.username.message}</p> : <br />}

                        <input type="password" name="password" placeholder='password'
                            {...register("password", {
                                required: "password is required.",
                            })} />
                        {errors.password ? <p>{errors.password.message}</p> : <br />}

                        <input type="password" name="passwordVerification" placeholder='password verification'
                            {...register("passwordVerification", {
                                required: "password verification is required.",
                            })} />
                        {errors.passwordVerification ? <p>{errors.passwordVerification.message}</p> : <br />}
                        <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY}
                            ref={captchaRef}
                        />
                        <div className="h-captcha" data-sitekey={RECAPTCHA_DATA_SITE_KEY}></div>

                        <input type="submit" value="Sign Up" />
                    </form>
                      {exist != "notExist" && <div>Are you an existing user? <Link style={{ textDecoration: 'underline' }} to={'/auth/login'}>please login</Link></div>}
                </div>
            }
          
        </>
    );
}
export default Register
