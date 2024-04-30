
import { Link } from 'react-router-dom';
import Heart from '../assets/heart.svg';

const ProductCard = ({products}) => {
  const { id, image, variant_name, stock_sataus, actual_price, price, discount_percent, variant_id } = products;
//  console.log("Product",product);
  return (
    <Link to={`/product?product_id=${id}&variant_id=${variant_id}`}>
    <div className="bg-white  hadow-md overflow-hidden">
      <div className="relative">
        <img src={image} alt={variant_name} className="w-full mt-3" />
        <button className="absolute top-2 right-2 text-red-500 focus:outline-none">
          <img src={Heart} alt="favourite" />
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{variant_name}</h2>
        <p className={`text-green-500 font-semibold mb-2 text-lg capitalize`}>{stock_sataus}</p>
        <p className=" mb-2 font-bold">₹{actual_price}</p>
        <p className="mb-2"><span className='line-through	text-gray-600'>₹{price}</span><span className='bg-green-500 px-2 py-1 rounded-md mx-2 text-white'>{discount_percent} %off</span></p>
      </div>
    </div>
    </Link>
  );
};

export default ProductCard;
