import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {  useNavigate } from 'react-router-dom';


export default function Update() {
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCateg] = useState('');
  const [price, setPrice] = useState('');
  const params = useParams();
  const navigate = useNavigate(); 


  useEffect(() => {
    setProducts();
  }, []);

  const setProducts = async () => {
    let result = await fetch(`http://localhost:1000/update/${params.id}`);
    result = await result.json();
    setTitle(result.title);
    setBrand(result.brand);
    setCateg(result.category);
    setPrice(result.price);
  };

  const updateProduct = async () => {
    // Replace this with actual logic to update data on the server
    const updatedData = {
      title: title,
      brand: brand,
      category: category,
      price: price
    };

    let result = await fetch(`http://localhost:1000/update/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Handle the response from the server as needed
    // You can navigate to a success page or display a message
    result = await result.json();
    if (result) {
        
        navigate('/')
    }
  };

  return (
    <div>
      <h2>Now we are in update</h2>

      <label>Your Title Here</label><br />
      <input type="text" placeholder="Your Name Here" required value={title} onChange={(e) => setTitle(e.target.value)} /><br />

    

      <label>Your Brand Here</label><br />
      <input type="text" placeholder="Your Brand Here" required value={brand} onChange={(e) => setBrand(e.target.value)} /><br />

      <label>Your category Here</label><br />
      <input type="text" placeholder="Your category Here" required value={category} onChange={(e) => setCateg(e.target.value)} /><br />

      <label>Your price Here</label><br />
      <input type="text" placeholder="Your price Here" required value={price} onChange={(e) => setPrice(e.target.value)} /><br />

      <button type="button" onClick={updateProduct}>Update Product</button>
    </div>
  );
}
