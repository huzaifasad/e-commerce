import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Productlist() {
    const[product,setproduct]=useState([])
    useEffect(() => {
        getproduct();
      }, []); 
    //   useEffect(() => {
    //     console.log('products are', product);
    //   }, [product]);
    
const schange=async (e)=>{
    let key=e.target.value;
    if (key) {
        let result=await fetch(`http://localhost:1000/serach/${key}`)
        result=await result.json();
        if (result) {
            setproduct(result)
    
        }
    }
    else{
        getproduct()
    }
  
}
      const getproduct=async()=>{
        let result= await fetch('http://localhost:1000/lists')
        result=await result.json();
        setproduct(result)
      }
      const deleteproduct=async(id)=>{
        let result=await fetch(`http://localhost:1000/delete/${id}`,{
            method:'delete'
        })
        result=await result.json();
        if (result) {
            getproduct();
        }
      }
   
    //   console.log('products are',product)
  return (
    <div>
      <h2>This is product list</h2>
      <input type="search" onChange={schange}></input>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">S.NO</th>
            <th scope="col">Title</th>
            <th scope="col">brand</th>
            <th scope="col">category</th>
            <th scope="col">price</th>
            <th scope="col">Opreation</th>
          </tr>
        </thead>
        <tbody>
  {product.map((item, index) => (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{item.title}</td>
      <td>{item.brand}</td>
      <td>{item.category}</td>
      <td>{item.price}</td>
      <td>
        <button onClick={() => deleteproduct(item._id)}>Delete</button>
        <button>
          <Link to={`/update/${item._id}`}>Update</Link>
        </button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
}
