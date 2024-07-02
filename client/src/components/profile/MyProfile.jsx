import React, { useEffect, useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { UserContext } from '../../App'
import PhoneInput from 'react-phone-input-2';
import { fetchUser,updateUser } from "../../api";


const MyProfile = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [user, setUser] = useState({});

    const getUser = async () => {
        try {
            const result = await fetchUser(currentUser.id);
            setUser(result[0]);
            console.log(result[0])
        }
        catch (err) {
            console.error(err);
        };
    }

    useEffect(() => {
        getUser();
    }, [])

    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const updateDetails=async(updatedUser)=>{
        try {
            await updateUser(currentUser.id, updatedUser);
            alert("User updated successfully!");
        } catch (error) {
            alert("Oops, something went wrong... please try again!");
        }
    }
    const onSubmit = (data) => {
        let updatedUser = {};
        if (data.name !== user?.name) {
            updatedUser = { ...updatedUser, name: data.name }
        }
        if (data.email !== user?.email) {
            updatedUser = { ...updatedUser, email: data.email }
        }
        if (data.phone !== user?.phone) {
            updatedUser = { ...updatedUser, phone: data.phone }
        }
        console.log(updatedUser, "  updated user")
        updateDetails(updatedUser);
    };


    return <>
        <h1>My Profile</h1>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            {console.log(user.name, "  name")}
            <input type="text" name="name"
                {...register("name", {
                    required: "Name is required.",
                    pattern: {
                        value: /^[a-zA-Z. ]+$/,
                        message: "Name is not valid."
                    }
                })} />
            {errors.name && <p>{errors.name.message}</p>}

            <input type="email" name="email"
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
}
export default MyProfile;