import React, { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const defaultImageSrc = 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'; // Replace with your default image URL
  const defaultColor = ''; // Replace with your default color text

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch('http://localhost:1000/lists');
        if (response.ok) {
          const data = await response.json();
          // Map the data to include a default image if imageSrc is missing
          const productsWithImages = data.map((product) => ({
            ...product,
            imageSrc: product.imageSrc || defaultImageSrc,
          }));
          setProducts(productsWithImages);
        } else {
          console.error('Failed to fetch data from API');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="bg-white">
      {/* ... (your existing JSX code) */}
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            
            <div className="mt-1 text-sm text-gray-500">Category: {product.category}</div>

            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href={product.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.title}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.color || defaultColor}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
