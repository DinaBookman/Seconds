import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { RegisterContext } from '../../App'
import { addUser } from '../../api';

const UserDetailes = ({ username, password }) => {
  const navigate = useNavigate();
  const [signup, setSignup] = useContext(RegisterContext);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();



  const addDetailes = async (data) => {
    const user = {
      name: data.name,
      email: data.email,
      rating: 0,
      reviews: "",

      phone: data.phone,
      username: username,
      password: password
    };
    try {
      const userId = await addUser(user);
      setSignup(true)
      navigate(`/auth/login`)
    } catch (error) {
      alert("oops somthing went wrong... please try again!")
    }

  };

  return (
    <>
      <h1>add some more detailes...</h1>

      <form noValidate onSubmit={handleSubmit(addDetailes)}>
        <input type="text" name="name" placeholder='name'
          {...register("name", {
            required: "name is required.",
            pattern: {
              value: /^[a-zA-Z. ]+$/,
              message: "Name is not valid."
            }
          })} />
        {errors.name && <p>{errors.name.message}</p>}

        <input type="email" placeholder='email' name="email"
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Email is not valid."
            }
          })} />
        {errors.email && <p>{errors.email.message}</p>}




        <div>
          <label htmlFor="phone">Phone Number</label>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: 'Phone number is required',
              validate: (value) => {
                const phoneNumber = value.replace(/\D/g, '');
                return phoneNumber.length >= 10 && phoneNumber.length <= 14 || 'Invalid phone number format';
              }
            }}
            render={({ field }) => (
              <PhoneInput
                country={'us'}
                value={field.value}
                onChange={field.onChange}
                inputProps={{
                  name: 'phone',
                  required: true,
                  autoFocus: true
                }}
              />
            )}
          />
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>

        <input type="submit" value="add detailes" />
      </form>
    </>
  );
}
export default UserDetailes