import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import star from '../assets/star.svg';
import locationIcon from '../assets/location.svg';
import commonIcon from '../assets/replacement.svg';
import axios from 'axios'; // Import Axios
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { Loading } from '../components/Loading/Loading';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const location = useLocation();
  const [productId, setProductId] = useState(null);
  const [variantId, setVariantId] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get('product_id');
    const variantId = searchParams.get('variant_id');
    setProductId(productId);
    setVariantId(variantId);
  }, [location]);
console.log("ProductId ", productId);
console.log("Variant Id :",variantId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://app1.crazzyhub.com/api/product-details-api/?product_id=${productId}&variant_id=${variantId}`,
         {
          headers: {
            Authorization: "7c2b8693d001c79d4b5ed6ebc387ad6b862989dfjhjjhj",
            'Content-Type': 'multipart/form-data', 
          }
        });
        // if (!response.ok) {
        //   throw new Error('Failed to fetch product details');
        // }
        const data = response.data;
        console.log("XXXXXXXXXXXXX",data);
        setProduct(data.data);
        setRelatedProduct(data.related_products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [productId, variantId]);

  const handleClickVariant=async(color,store,other,search)=>{
    setLoading(true);
    try {
      const response = await axios.get(`https://app1.crazzyhub.com/api/product-variant-filter-api/?product_id=${productId}&variant_id=${variantId}&color_variant_id=${color}&storage_variant_id=${store}&other_variant_id=${other}&search=${search}`,
       {
        headers: {
          Authorization: "7c2b8693d001c79d4b5ed6ebc387ad6b862989dfjhjjhj",
          'Content-Type': 'multipart/form-data', 
        }
      });
      // if (!response.ok) {
      //   throw new Error('Failed to fetch product details');
      // }
      const data = response.data;
      console.log("XXXXXXXXXXXXX",data);
      setProduct(data.data);
      setRelatedProduct(data.related_products);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  if (!product) {
    return <Loading />
    // return <div className='font-bold text-3xl text-center mt-10'>Loading...</div>;
  }

  return (
    <SkeletonTheme  highlightColor="#d8d7fb" >
    <div className="container mx-auto mt-3">
      <div className="">
        <div className=' flex justify-around w-full'>


          <div className=' '>
            <img src={product.variant_image} alt={product.product_variant_name} className="w-[30vw] border border-gray-400" />
          </div>


          <div className='  w-[35vw]'>
            <h1 className="text-2xl font-bold">{product.product_variant_name}</h1>
            <div className='flex my-1'>{[1, 1, 1, 1, 1].map((_, index) => (
              <span key={index}><img src={star} alt="imgs" className='w-5 h-5' /></span>
            ))}</div>

            <p className="text-green-600 font-semibold text-lg">{product.stock_sataus}</p>
            <div className="flex items-center">
              <p className="text-xl text-orange-500 font-bold">₹ {product.price}</p>
              <p className=" ml-2 line-through">M.R.P: {product.mrp}</p>
              <p className='bg-green-500 text-white mx-2 px-2 rounded-md'>{product.discount_percent}%</p>
            </div>

            <div className="mt-1">
              <h2 className="text-lg font-bold">{product.color_variant}</h2>
              <div className="flex space-x-4">
                {product.variant_color_values.map(color => (<>
                  { loading ? <div className={`border-2 p-1 border-gray-300 px-3 rounded-md `} >
                  <Skeleton className="h-10 w-10  p-2 cursor-pointer" />
                    <p className='text-sm'><Skeleton /></p>
                  </div>
                 : <div className={`border-2 border-gray-300 px-3 rounded-md ${product.color_variant_name == color.value && 'border-orange-500'}`} onClick={()=>{handleClickVariant(color.id,null,null,"color")}} >
                    <img key={color.id} src={color.variant_image} alt={color.value} className="h-14 w-14  p-1 cursor-pointer" />
                    <p className='text-sm'>{color.value}</p>
                  </div> }
                </>))}
              </div>
            </div>
            <div className="mt-1">
              <h2 className="text-lg font-semibold">{product.other_variant}</h2>
              <div className="flex space-x-4">
                {product.other_variant_values.map(ram => (<>
                  {loading ?
                  <button  ><Skeleton className={`px-4 py-2 border-2 w-16 h-10 border-gray-300 rounded-md bg-gray-100 `}  /></button> 
                 : <button key={ram.id} className={`px-4 py-2 border-2 border-gray-300 rounded-md hover:bg-gray-100 ${ram.value==product.other_variant_name && 'border-orange-500'}`} onClick={()=>{handleClickVariant(null,null,ram.id,"other")}} >{ram.value}</button> }
                </>))}
              </div>
            </div>
            <div className="mt-1">
              <h2 className="text-lg font-semibold">{product.storage_variant}</h2>
              <div className="flex space-x-4">
                {product.variant_storage_values.map(storage => (<>
                  {loading ?
                  <button key={storage.id}   ><Skeleton className={`px-4 py-2 w-20 h-10 border border-gray-300 rounded-md hover:bg-gray-100 `} /></button>
                  :<button key={storage.id} className={`px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 ${product.storage_variant_name == storage.value && 'border-orange-500 border-2'}`} onClick={()=>{handleClickVariant(null,storage.id,null,"storage")}} >{storage.value}</button>}
                </>))}
              </div>
            </div>


            <div>
              <div className='flex justify-between bg-gray-200 py-2 my-3 border border-gray-400'>
                <span className="text-lg font-semibold">Delivery Options</span>
                <span className='flex'><img src={locationIcon} alt="" className='w-5 h-5 mr-2 select-none' /><input type="text" placeholder='Enter Pincode' className='outline-none bg-transparent border-b border-gray-500 ' /></span>
              </div>

              <div className='flex justify-between px-5 bg-[#fee2e2] py-1 border border-gray-300'>
                <div className='flex justify-center'>
                  <img src={commonIcon} alt="" className='w-10 h-10' />
                  <div>
                    <p className='text-sm font-semibold'>Replacement</p>
                    <p className='text-sm'>in 7 days</p>

                  </div>
                </div>
                <div className='flex'>
                  <img src={commonIcon} alt="" className='w-10 h-10' />
                  <div>  
                    <p className='text-sm font-semibold'>Warrenty</p>
                    <p className='text-sm'>in 1 year</p>
                  </div>
                </div>
                <div className='flex'>
                  <img src={commonIcon} alt="" className='w-10 h-10' />
                  <div>
                    <p className='text-sm font-semibold'>GST Invoice</p>
                    <p className='text-sm'>Available</p>
                  </div>

                </div>
              </div>

            </div>

          </div>




          <div className="my-8 w-[25vw]">
            <h2 className="text-lg font-semibold">Frequently Bought Together</h2>
            <div className="grid grid-cols-1 gap-4 mt-2 h-[50vh] overflow-y-scroll overflow-x-hidden  border border-gray-300 bg-gray-200">
              {relatedProduct?.map(product => (
                <div key={product.id} className="flex justify-between border border-gray-200 ">

                  <div className='flex'><img src={product.variant_image} alt={product.product_variant_name} className="h-15 w-10 m-3" />
                    <div className="">
                      <p className="text-gray-800">{product.product_variant_name}</p>
                      <p className="font-semibold">{product.brand_name}</p>
                    </div></div>

                  <p>₹{product.price}</p>
                </div>
              ))}
            </div>

            <div className='my-2'>
            <button className="bg-gradient-to-r from-orange-500 via-sky-500 to-blue-500 text-white font-semibold py-2 px-4 shadow-md hover:bg-gradient-to-r hover:from-orange-600 hover:via-sky-600 hover:to-blue-600 w-full">
                Buy Now
              </button>
              <button className="text-white font-semibold py-2 px-4 shadow-md bg-green-500 my-2 w-full">
                Add to Cart
              </button>
              
              <div className='flex justify-between'>
                <button className='text-red-700 border border-red-700 rounded-md py-1 px-5'>Share</button>
                <button className='text-red-700 border border-red-700 rounded-md py-1 px-5'>Compre</button>
                <button className='text-red-700 border border-red-700 rounded-md py-1 px-5'>wishlist</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </SkeletonTheme>
  );
};

export default ProductDetails;
