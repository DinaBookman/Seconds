
// import React, { useState, useEffect } from 'react';
// import PlaceAutocomplete from './searches/PlaceAutoComplete';
// import { useForm, Controller } from 'react-hook-form';
// import Select from 'react-select';
// import makeAnimated from 'react-select/animated';
// import { getCategories, getStatuses } from '../api';

// const ProductForm = ({ product, setEdit, setData }) => {
//     const { register, handleSubmit, formState: { errors }, control, setValue } = useForm({
//         defaultValues: product || {},
//     });
//     const [address, setAddress] = useState(product?.area || '');

//     const [statusOptions, setStatusOptions] = useState([]); 
//     const [categoryOptions, setCategoryOptions] = useState([]); 

//     // Fetch options for status and category select
//     const getStatusOptions = async () => {
//         try {
//             const result = await getStatuses();
//             const formattedOptions = result.map(status => ({
//                 value: status.id,
//                 label: status.description.toUpperCase()
//             }));
//             setStatusOptions(formattedOptions);
//         } catch (error) {
//             console.error('Oops something went wrong...', error);
//             alert('Oops something went wrong...');
//         }
//     };

//     const getCategoryOptions = async () => {
//         try {
//             const result = await getCategories();
//             const formattedOptions = result.map(category => ({
//                 value: category.id,
//                 label: category.displayName.toUpperCase()
//             }));
//             setCategoryOptions(formattedOptions);
//         } catch (error) {
//             console.error('Oops something went wrong...', error);
//             alert('Oops something went wrong...');
//         }
//     };

//     useEffect(() => {
//         getStatusOptions();
//         getCategoryOptions();
//     }, []);

//     useEffect(() => {
//         if (product) {
//             setValue("category", categoryOptions.find(option => option.value === product.categoryId));
//             setValue("status", statusOptions.find(option => option.value === product.statusId));
//         }
//     }, [categoryOptions, statusOptions, product, setValue]);

//     const onSubmit = async (data) => {
//         const formData = new FormData();

//         formData.append('ownerId', 1);

//         if (data.title !== product?.title) {
//             formData.append('title', data.title);
//         }
//         if (data.description !== product?.description) {
//             formData.append('description', data.description);
//         }
//         if (data.category?.value !== product?.categoryId) {
//             formData.append('categoryId', data.category.value);
//         }
//         if (data.status?.value !== product?.statusId) {
//             formData.append('statusId', data.status.value);
//         }
//         if (address !== product?.area) {
//             formData.append('area', address);
//         }
//         if (data.price !== product?.price) {
//             formData.append('price', data.price);
//         }

//         // Handle image upload
//         if (data.image && data.image.length > 0) {
//             formData.append('image', data.image[0]);
//         }

//         if (setData) {
//             setData(formData);
//         }
//         if (setEdit) {
//             setEdit(formData);
//         }

//         // Log FormData entries for debugging
//         for (let [key, value] of formData.entries()) {
//             console.log(key, value);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
//             <div>
//                 <label htmlFor="title">Title</label>
//                 <input
//                     id="title"
//                     {...register('title', { required: 'Title is required' })}
//                 />
//                 {errors.title && <p>{errors.title.message}</p>}
//             </div>

//             <div>
//                 <label htmlFor="description">Description</label>
//                 <textarea
//                     id="description"
//                     {...register('description', { required: 'Description is required' })}
//                 />
//                 {errors.description && <p>{errors.description.message}</p>}
//             </div>

//             <div>
//                 <label htmlFor="price">Price</label>
//                 <input
//                     type="number"
//                     id="price"
//                     {...register('price', { required: 'Price is required', valueAsNumber: true })}
//                 />
//                 {errors.price && <p>{errors.price.message}</p>}
//             </div>

//             <div>
//                 <label htmlFor="category">Category</label>
//                 <Controller
//                     name="category"
//                     control={control}
//                     rules={{ required: 'Category is required' }}
//                     render={({ field }) => (
//                         <Select
//                             {...field}
//                             options={categoryOptions}
//                             components={makeAnimated()}
//                             isClearable
//                             placeholder="Select..."
//                             defaultValue={field.value}
//                         />
//                     )}
//                 />
//                 {errors.category && <p>{errors.category.message}</p>}
//             </div>

//             <div>
//                 <label htmlFor="status">Status</label>
//                 <Controller
//                     name="status"
//                     control={control}
//                     rules={{ required: 'Status is required' }}
//                     render={({ field }) => (
//                         <Select
//                             {...field}
//                             options={statusOptions}
//                             components={makeAnimated()}
//                             isClearable
//                             placeholder="Select..."
//                             defaultValue={field.value}
//                         />
//                     )}
//                 />
//                 {errors.status && <p>{errors.status.message}</p>}
//             </div>

//             <div>
//                 <label htmlFor="area">Area</label>
//                 <PlaceAutocomplete address={address} setAddress={setAddress} />
//                 {errors.area && <p>{errors.area.message}</p>}
//             </div>

//             <div>
//                 <label htmlFor="image">Image Upload</label>
//                 {product?.img && (
//                     <div>
//                         <img src={product.img} alt="Current" width="100" />
//                         <p>Current Image</p>
//                     </div>
//                 )}
//                 <input
//                     type="file"
//                     id="image"
//                     {...register('image')}
//                 />
//                 {errors.image && <p>{errors.image.message}</p>}
//             </div>

//             <button type="submit">Submit</button>
//         </form>
//     );
// };

// export default ProductForm;

import React, { useState, useEffect } from 'react';
import PlaceAutocomplete from './searches/PlaceAutoComplete';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { getCategories, getStatuses } from '../api';

const ProductForm = ({ product, setEdit, setData, setIsUpdate }) => {
    const { register, handleSubmit, formState: { errors }, control } = useForm({
        defaultValues: product || {},
    });
    const [address, setAddress] = useState(product?.area || '');

    const [statusOptions, setStatusOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);

    // Fetch options for status and category select
    const fetchStatusOptions = async () => {
        try {
            const result = await getStatuses();
            const formattedOptions = result.map(status => ({
                value: status.id,
                label: status.description.toUpperCase()
            }));
            setStatusOptions(formattedOptions);
        } catch (error) {
            console.error('Error fetching statuses:', error);
            alert('Oops something went wrong...');
        }
    };

    const fetchCategoryOptions = async () => {
        try {
            const result = await getCategories();
            const formattedOptions = result.map(category => ({
                value: category.id,
                label: category.displayName.toUpperCase()
            }));
            setCategoryOptions(formattedOptions);
        } catch (error) {
            console.error('Error fetching categories:', error);
            alert('Oops something went wrong...');
        }
    };

    useEffect(() => {
        fetchStatusOptions();
        fetchCategoryOptions();
    }, []);

    const onSubmit = async (data) => {
        const formData = new FormData();

        formData.append('ownerId', 1);

        // Append form data based on changes
        if (data.title !== product?.title) {
            formData.append('title', data.title);
        }
        if (data.description !== product?.description) {
            formData.append('description', data.description);
        }
        if (data.category?.value !== product?.categoryId) {
            formData.append('categoryId', data.category.value);
        }
        if (data.status?.value !== product?.statusId) {
            formData.append('statusId', data.status.value);
        }
        if (address !== product?.area) {
            formData.append('area', address);
        }
        if (data.price !== product?.price) {
            formData.append('price', data.price);
        }

        // Handle image upload
        if (data.image && data.image.length > 0) {
            formData.append('image', data.image[0]);
        }

        // Handle setData and setEdit if provided
        if (setData) {
            setData(formData);
        }
        if (setEdit) {
            setEdit(formData);
        }

        // Log FormData entries for debugging
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    {...register('title', { required: 'Title is required' })}
                />
                {errors.title && <p>{errors.title.message}</p>}
            </div>

            <div>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    {...register('description', { required: 'Description is required' })}
                />
                {errors.description && <p>{errors.description.message}</p>}
            </div>

            <div>
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    id="price"
                    {...register('price', { required: 'Price is required', valueAsNumber: true })}
                />
                {errors.price && <p>{errors.price.message}</p>}
            </div>

            <div>
                <label htmlFor="category">Category</label>
                <Controller
                    name="category"
                    control={control}
                    rules={{ required: 'Category is required' }}

                    render={({ field }) => (
                        <Select
                            {...field}
                            options={categoryOptions}
                            components={makeAnimated()}
                            isClearable
                            tabSelectsValue
                            placeholder="Select..."
                            defaultInputValue={product ? product?.category.toUpperCase() : null}
                        />
                    )}
                />
                {errors.category && <p>{errors.category.message}</p>}
            </div>

            <div>
                <label htmlFor="status">Status</label>
                <Controller
                    name="status"
                    control={control}
                    rules={{ required: 'Status is required' }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={statusOptions}
                            components={makeAnimated()}
                            isClearable
                            placeholder="Select..."
                            defaultInputValue={product ? product.status.toUpperCase() : null}
                        />
                    )}
                />
                {errors.status && <p>{errors.status.message}</p>}
            </div>

            <div>
                <label htmlFor="area">Area</label>
                <PlaceAutocomplete address={address} setAddress={setAddress} required />
                {errors.area && <p>{errors.area.message}</p>}
            </div>

            <div>
                <label htmlFor="image">Image Upload</label>
                {product?.img && (
                    <div>
                        <img src={product.img} alt="Current" width="100" />
                        <p>Current Image</p>
                    </div>
                )}
                <input
                    type="file"
                    id="image"
                    {...register('image')}
                />
                {errors.image && <p>{errors.image.message}</p>}
            </div>

            <button type="submit">{setEdit ? 'UPDATE' : 'ADD'}</button>
            {setEdit && <button onClick={() => setIsUpdate(-1)}>CANCEL</button>}
        </form>
    );
};

export default ProductForm;

