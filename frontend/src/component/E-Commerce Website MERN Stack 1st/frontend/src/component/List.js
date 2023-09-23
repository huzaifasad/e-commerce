import React, { useState, useEffect } from 'react';

export default function List() {
    const [data, setData] = useState([]);

    const collectData = async () => {
        try {
            let result = await fetch('http://localhost:1000/lists', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (result.ok) {
                let responseData = await result.json();
                setData(responseData);
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        collectData();
    }, []); // Fetch data when the component mounts

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Category</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>{item.brand}</td>
                            <td>{item.category}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button type='button' onClick={collectData}>Fetch Data</button>
        </div>
    );
}
