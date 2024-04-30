import { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { filteredData } from '../data/filterData';
import ProductCard from '../components/ProductCard';
import { Loading } from '../components/Loading/Loading';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData();
        formData.append('category_id', "28");
        formData.append('brand_id', "226");
        formData.append('color_id', "");

        const response = await axios.post(`https://app1.crazzyhub.com/api/all-filter-product-list`, 
          formData,
          {
            headers: {
              Authorization: '7c2b8693d001c79d4b5ed6ebc387ad6b862989dfjhjjhj',
              'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
            }
          }
        );
        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }
        const data = response.data;
        console.log('fetched data', data.data.product_list);
        setProducts(data.data.product_list);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
    // setProducts(filteredData?.data?.product_list);
    console.log('fetched data', filteredData?.data);

  }, []);
  if (!products) {
    return <Loading />
    // return <div className='font-bold text-3xl text-center mt-10'>Loading...</div>;
  }


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-10">
      {products.length != 0 && products?.map(product => (
        <div key={product.id} className="bg-white rounded shadow-md px-4  border border-gray-300">
          <ProductCard products={product}/>
        </div>
      ))}
    </div>
  );
};

export default Home;
