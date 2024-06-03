import React, { useState } from 'react';

function ProductUploadForm() {
  const [ownerId, setOwnerId] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(0);
  const [state, setState] = useState(0);
  const [area, setArea] = useState('');
  const [price, setPrice] = useState(0);
  const [productImage, setProductImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('ownerId', ownerId);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('state', state);
    formData.append('area', area);
    formData.append('price', price);
    formData.append('image', productImage);

    try {
      const response = await fetch('http://localhost:8080/products', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error uploading product:', error);
      alert('Error uploading product');
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="text"
        name="ownerId"
        placeholder="Owner ID"
        value={ownerId}
        onChange={(e) => setOwnerId(e.target.value)}
        required
      />
      <br />
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <textarea
        name="description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <br />
      <input
        type="number"
        name="category"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(parseInt(e.target.value))}
        required
        min="0"
        max="5"
      />
      <br />
      <input
        type="number"
        name="state"
        placeholder="State"
        value={state}
        onChange={(e) => setState(parseInt(e.target.value))}
        required
      />
      <br />
      <input
        type="text"
        name="area"
        placeholder="Area"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        required
      />
      <br />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(parseInt(e.target.value))}
        required
        min="0"
      />
      <br />
      <input
        type="file"
        name="image"
        onChange={(e) => setProductImage(e.target.files[0])}
        required
      />
      <br />
      <button type="submit">Upload Product</button>
    </form>
  );
}

export default ProductUploadForm;