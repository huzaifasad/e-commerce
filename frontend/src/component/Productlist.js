import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Productlist() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const searchChange = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:1000/serach/${key}`);
      result = await result.json();
      if (result) {
        setProduct(result);
      }
    } else {
      getProducts();
    }
  };

  const categoryFilter = async (category) => {
    let result = await fetch(`http://localhost:1000/categroy/${category}`);
    result = await result.json();
    setProduct(result);
  };

  const getProducts = async () => {
    const auth = localStorage.getItem('user');
    const userData = JSON.parse(auth);
    const id = userData._id;

    let result = await fetch(`http://localhost:1000/listbyuser/${id}`);
    result = await result.json();
    setProduct(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:1000/delete/${id}`, {
      method: 'delete',
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const resetFilter = () => {
    getProducts();
  };

  return (
    <div className="bg-white p-4">
      <h2 className="text-2xl font-semibold">This is product list</h2>
      <button
        onClick={() => categoryFilter('Mob')}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
      >
        Mobile
      </button>
      <button
        onClick={() => categoryFilter('Laptop')}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
      >
        Laptop
      </button>
      <button
        onClick={resetFilter}
        className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
      >
        Clear Filters
      </button>
      <input
        type="search"
        onChange={searchChange}
        className="border border-gray-300 p-2 rounded-md mr-2"
        placeholder="Search"
      />
      <table className="table-auto mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">S.NO</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Brand</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Operation</th>
          </tr>
        </thead>
        <tbody>
          {product.map((item, index) => (
            <tr key={item._id}>
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{item.title}</td>
              <td className="px-4 py-2">{item.brand}</td>
              <td className="px-4 py-2">{item.category}</td>
              <td className="px-4 py-2">{item.price}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => deleteProduct(item._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md mr-2"
                >
                  Delete
                </button>
                <Link
                  to={`/update/${item._id}`}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md"
                >
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
