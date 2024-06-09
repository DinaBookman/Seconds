import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { UserContext } from '../../App'

const UserDetailes = ({ username, password }) => {
    const navigate = useNavigate();
    // const [currentUser, setCurrentUser] = useContext(UserContext);

    const {
        register,
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
            // phone: data.street,
            // city: data.city,
            // zipcode: data.zipcode,
            phone: data.phone,
            // website: data.website,
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

                {/* <label>address</label>

                <input type='text' placeholder='street' name='street'
                    {...register("street", {
                        required: "street is required.",
                        pattern: {
                            value: /^[a-zA-Z.  - 0-9]+$/,
                            message: "street is not valid."
                        }
                    })} />
                {errors.street && <p>{errors.street.message}</p>}


                <input type='text' name="city" placeholder='city'
                    {...register("city", {
                        required: "city is required.",
                        pattern: {
                            value: /^[a-zA-Z -]+$/,
                            message: "city is not valid."
                        }
                    })} />
                {errors.city && <p>{errors.city.message}</p>}

                <input type='text' name="zipcode" placeholder='zipcode'
                    {...register("zipcode", {
                        required: "zipcode is required.",
                        pattern: {
                            value: /^\d{5}[-\s]?(?:\d{4})?$/,
                            message: "zipcode is not valid."
                        }
                    })} />
                {errors.zipcode && <p>{errors.zipcode.message}</p>} */}


                <input type="tel" name="phone" placeholder='phone'
                    {...register("phone", {
                        required: "phone is required.",
                        pattern: {
                            value: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                            message: "phone is not valid."
                        }
                    })} />
                {errors.phone && <p>{errors.phone.message}</p>}
{/* 
                <input type="text" name="website" placeholder='website'
                    {...register("website", {
                        required: "website is required.",
                    })} />
                {errors.website && <p>{errors.website.message}</p>} */}

                <input type="submit" value="add detailes" />
            </form>
        </>
    );
}
export default UserDetailes