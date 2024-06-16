import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { UserContext } from '../../App'

const UserDetailes = ({ username, password }) => {
    const navigate = useNavigate();
    // const [currentUser, setCurrentUser] = useContext(UserContext);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm();

    // const goToHome = (userId,data) => {
    //     setCurrentUser({
    //         id: userId,
    //         name: data.name,
    //         email: data.email,
    //         street: data.street,
    //         city: data.city,
    //         zipcode: data.zipcode,
    //         phone: data.phone,
    //         website: data.website
    //     })
    //     localStorage.setItem('currentUser', JSON.stringify({ id: data.id }));
    //     navigate(`/home/users/${userId}`)
    // }

    const addDetailes = (data) => {
        const user = {
            name: data.name,
            email: data.email,
            rating:0,
            reviews:"",

            phone: data.phone,
            username:username,
            password:password
        };
        console.log(username,password)
        fetch('http://localhost:8080/users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        }).then(async response => {
            const userId = await response.json();
            (!response.ok) ? alert("oops somthing went wrong... please try again!") : goToHome(userId,data) })
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