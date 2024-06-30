import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PlaceAutocomplete from './searches/PlaceAutoComplete';

const ProductForm = ({ product, setEdit, setData }) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: product || {},
    });
    const [address, setAddress] = useState(product?.area || '');

    const onSubmit = async (data) => {
        const formData = new FormData();

            formData.append('ownerId', 1);

        if (data.title !== product?.title) {
            formData.append('title', data.title);
        }
        if (data.description !== product?.description) {
            formData.append('description', data.description);
        }
        if (data.category !== product?.category) {
            formData.append('category', data.category);
        }
        if (data.state !== product?.state) {
            formData.append('state', data.state);
        }
        if (address !== product?.area) {
            formData.append('area', address);
        }
        if (data.price !== product?.price) {
            formData.append('price', data.price);
        }
        if (data.image && data.image[0]) {
            formData.append('image', data.image[0]);
        }

        if (setData) {
            setData(formData);
        }
        if (setEdit) {
            setEdit(formData);
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
                <select id="category"
                    {...register('category', { required: 'Category is required' })}
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
                {product?.image && (
                    <div>
                        <img src={product.image} alt="Current" width="100" />
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

            <button type="submit">Submit</button>
        </form>
    );
};

export default ProductForm;
