import React, { useState, useEffect,useContext } from 'react';
import PlaceAutocomplete from '../searches/PlaceAutoComplete';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { getCategories, getStatuses } from '../../api';
import { UserContext } from '../../App';
import './ProductForm.css';

const ProductForm = ({ product, setEdit, setData, setIsUpdate }) => {
  const { register, handleSubmit, formState: { errors }, control, setError, clearErrors } = useForm({ // Added clearErrors
    defaultValues: product || {},
  });
  const [currentUser, setCurrentUser] = useState(UserContext)
  const [address, setAddress] = useState(product?.area || '');
  const [statusOptions, setStatusOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

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
   if(address!=''){
    clearErrors('area');
   }
  }, [address]);

  useEffect(() => {
    fetchStatusOptions();
    fetchCategoryOptions();
  }, []);

  const onSubmit = async (data) => {
    let hasError = false;
    console.log(setData && address === '' && !product?.area)
    if (setData && address === '' && !product?.area) {
      setError('area', {
        type: 'manual',
        message: 'Area is required',
      });
      hasError = true;
    } else {
      clearErrors('area'); // Clear errors if validation passes
    }

    if (setData && !(data.image && data.image.length > 0) && !product?.img) {
      setError('image', {
        type: 'manual',
        message: 'Image is required',
      });
      hasError = true;
    } else {
      clearErrors('image'); // Clear errors if validation passes
    }

    if (hasError) {
      return;
    }

    const formData = new FormData();
    formData.append('ownerId', currentUser?.id||JSON.parse(localStorage.getItem("currentUser")).id);

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

    if (data.image && data.image.length > 0) {
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
    <form className="form-container" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          {...register('title', { required: 'Title is required' })}
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          {...register('description', { required: 'Description is required' })}
          className={errors.description ? 'error' : ''}
        />
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      <div>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          {...register('price', { required: 'Price is required', valueAsNumber: true })}
          className={errors.price ? 'error' : ''}
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
              defaultInputValue={product ? product?.category.toUpperCase() : ''}
              classNamePrefix="react-select"
              className={errors.category ? 'error' : ''}
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
              defaultInputValue={product ? product.status.toUpperCase() : ''}
              classNamePrefix="react-select"
              className={errors.status ? 'error' : ''}
            />
          )}
        />
        {errors.status && <p>{errors.status.message}</p>}
      </div>

      <div>
        <label htmlFor="area">Area</label>
        <PlaceAutocomplete address={address} setAddress={setAddress} required={!!setData} /> {/* Updated required prop */}
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
          className={errors.image ? 'error' : ''}
        />
        {errors.image && <p>{errors.image.message}</p>}
      </div>

      <button type="submit">{setEdit ? 'UPDATE' : 'ADD'}</button>
      {setEdit && <button type="button" onClick={() => setIsUpdate(-1)}>CANCEL</button>}
    </form>
  );
};

export default ProductForm;
