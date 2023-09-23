import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Products() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(false);

  const collectdata = async () => {
    if (!title || !brand || !category || !price) {
      alert('Please complete the form');
      setError(true);
      return false;
    }

    if (isNaN(price)) {
      alert('Price must be a valid number');
      return;
    } else {
      const auth = localStorage.getItem('user');
      // Parse the JSON string into an object
      const userData = JSON.parse(auth);
      // Access the _id property from the parsed user data
      const id = userData._id;

      let result = await fetch(`http://localhost:1000/addbyuser/${id}`, {
        method: 'post',
        body: JSON.stringify({ title, brand, category, price }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      result = await result.json();

      if (result) {
        setBrand('');
        setCategory('');
        setPrice('');
        setTitle('');
        navigate('/add');
      }
    }
  };

  return (
    <div className="bg-white p-4">
      <h1 className="text-2xl font-semibold">We are in product form</h1>

      <label className="block mt-4 font-semibold">Your Title Here</label>
      <input
        type="text"
        placeholder="Your Name Here"
        required
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        className={`mt-2 p-2 border ${
          error && !title ? 'border-red-500' : 'border-gray-300'
        } rounded-md`}
      />
      {error && !title && (
        <span className="text-red-500">This field is required</span>
      )}

      <label className="block mt-4 font-semibold">Your Brand Here</label>
      <input
        type="text"
        placeholder="Your Name Here"
        required
        value={brand}
        onChange={(e) => {
          setBrand(e.target.value);
        }}
        className="mt-2 p-2 border border-gray-300 rounded-md"
      />

      <label className="block mt-4 font-semibold">Your category Here</label>
      <input
        type="text"
        placeholder="Your Name Here"
        required
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        className="mt-2 p-2 border border-gray-300 rounded-md"
      />

      <label className="block mt-4 font-semibold">Your price Here</label>
      <input
        type="text"
        placeholder="Your Name Here"
        required
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        className="mt-2 p-2 border border-gray-300 rounded-md"
      />

      <button
        type="submit"
        onClick={collectdata}
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  );
}
