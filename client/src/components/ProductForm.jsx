import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PlaceAutocomplete from './PlaceAutoComplete';

const ProductForm = ({ product, setEdit, setData }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [address, setAddress] = useState(product?.area || '');

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('ownerId', 1);  // Make sure this is the correct owner ID
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('state', data.state);
        formData.append('area', address); // Use selected address
        formData.append('price', data.price);
        if (data.image && data.image[0]) {
            formData.append('image', data.image[0]);
        }
        console.log(setEdit != undefined);
        if (setData != undefined) {
            setData(formData)
        }
        if (setEdit != undefined) {
            setEdit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div>
                <label htmlFor="title">Title</label>
                <input
                    defaultValue={product?.title || ''}
                    id="title"
                    {...register('title', { required: 'Title is required' })}
                />
                {errors.title && <p>{errors.title.message}</p>}
            </div>

            <div>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    defaultValue={product?.description || ''}
                    {...register('description', { required: 'Description is required' })}
                />
                {errors.description && <p>{errors.description.message}</p>}
            </div>

            <div>
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    id="price"
                    defaultValue={product?.price || ''}
                    {...register('price', { required: 'Price is required', valueAsNumber: true })}
                />
                {errors.price && <p>{errors.price.message}</p>}
            </div>

            <div>
                <label htmlFor="category">Category</label>
                <select id="category"
                    {...register('category', { required: 'Category is required' })}
                    defaultValue={product ? product.category : ''}
                >
                    <option value="">Select...</option>
                    <option value="sofas">Sofa</option>
                    <option value="tables">Table</option>
                    <option value="chairs">Chair</option>
                    <option value="closets">Closet</option>
                    <option value="beds">Bed</option>
                </select>
                {errors.category && <p>{errors.category.message}</p>}
            </div>

            <div>
                <label htmlFor="state">State</label>
                <select id="state" {...register('state', { required: 'State is required' })}
                    defaultValue={product?.state || ''}
                >
                    <option value="">Select...</option>
                    <option value="new">New</option>
                    <option value="used">Used</option>
                </select>
                {errors.state && <p>{errors.state.message}</p>}
            </div>

            <div>
                <label htmlFor="area">Area</label>
                <PlaceAutocomplete address={address} setAddress={setAddress} />
                {errors.area && <p>{errors.area.message}</p>}
            </div>

            <div>
                <label htmlFor="image">Image Upload</label>
                <input
                    type="file"
                    id="image"
                    {...register('image')}
                />
                {errors.image && <p>{errors.image.message}</p>}
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default ProductForm;
