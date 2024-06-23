// import React,{useState} from 'react';
// import { useForm } from 'react-hook-form';
// import PlaceAutocomplete from './PlaceAutoComplete';

// const ProductUploadForm = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [selectedAddress, setSelectedAddress] = useState('');

//   const onSubmit = async (data) => {
//     console.log(data.selectedAddress)
//     const formData = new FormData();
//     formData.append('ownerId', 1);  // Make sure this is the correct owner ID
//     formData.append('title', data.title);
//     formData.append('description', data.description);
//     formData.append('category', data.category);
//     formData.append('state', data.state);
//     formData.append('area', data.selectedAddress);
//     formData.append('price', data.price);
//     formData.append('image', data.image[0]);

//     try {
//       const response = await fetch('http://localhost:8080/products', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       alert(result.message);
//     } catch (error) {
//       console.error('Error uploading product:', error);
//       alert('Error uploading product');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
//       <div>
//         <label htmlFor="title">Title</label>
//         <input
//           id="title"
//           {...register('title', { required: 'Title is required' })}
//         />
//         {errors.title && <p>{errors.title.message}</p>}
//       </div>

//       <div>
//         <label htmlFor="description">Description</label>
//         <textarea
//           id="description"
//           {...register('description', { required: 'Description is required' })}
//         />
//         {errors.description && <p>{errors.description.message}</p>}
//       </div>

//       <div>
//         <label htmlFor="price">Price</label>
//         <input
//           type="number"
//           id="price"
//           {...register('price', { required: 'Price is required', valueAsNumber: true })}
//         />
//         {errors.price && <p>{errors.price.message}</p>}
//       </div>

//       <div>
//         <label htmlFor="category">Category</label>
//         <select id="category" {...register('category', { required: 'Category is required' })}>
//           <option value="">Select...</option>
//           <option value="sofas">Sofa</option>
//           <option value="tables">Table</option>
//           <option value="chairs">Chair</option>
//           <option value="closets">Closet</option>
//           <option value="beds">Bed</option>
//         </select>
//         {errors.category && <p>{errors.category.message}</p>}
//       </div>

//       <div>
//         <label htmlFor="state">State</label>
//         <select id="state" {...register('state', { required: 'State is required' })}>
//           <option value="">Select...</option>
//           <option value="new">New</option>
//           <option value="used">Used</option>
//         </select>
//         {errors.state && <p>{errors.state.message}</p>}
//       </div>

//       <div>
//         <label htmlFor="area">Area</label>
//         <PlaceAutocomplete onPlaceSelected={setSelectedAddress} />
//         {errors.area && <p>{errors.area.message}</p>}
//       </div>

//       <div>
//         <label htmlFor="image">Image Upload</label>
//         <input
//           type="file"
//           id="image"
//           {...register('image', { required: 'Image is required' })}
//         />
//         {errors.image && <p>{errors.image.message}</p>}
//       </div>

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default ProductUploadForm;
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PlaceAutocomplete from './PlaceAutoComplete';

const ProductUploadForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedAddress, setSelectedAddress] = useState('');
  const [address, setAddress] = useState('');

  const onSubmit = async (data) => {
    const formData = new FormData();
    console.log(selectedAddress.types)
    formData.append('ownerId', 1);  // Make sure this is the correct owner ID
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('state', data.state);
    formData.append('area', address); // Use selectedAddress
    formData.append('price', data.price);
    formData.append('image', data.image[0]);

    try {
      const response = await fetch('http://localhost:8080/products', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error uploading product:', error);
      alert('Error uploading product');
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
        <select id="category" {...register('category', { required: 'Category is required' })}>
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
        <select id="state" {...register('state', { required: 'State is required' })}>
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
          {...register('image', { required: 'Image is required' })}
        />
        {errors.image && <p>{errors.image.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductUploadForm;
