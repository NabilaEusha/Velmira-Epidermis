import {showAverageRating} from "./Ratings"
const Product = ({product}) => {
  return (
    <div className="flex flex-col items-center justify-center max-w-xs w-full h-auto min-h-[340px] sm:min-h-[400px] md:min-h-[440px] lg:min-h-[480px] xl:min-h-[500px] m-4 sm:m-6 md:m-8 bg-white rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer p-4">
      <img 
        src={product.img} 
        alt={product.title || 'Product image'} 
        className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 object-cover rounded-xl mb-3" 
      />
      <h2 className="font-semibold text-base sm:text-lg md:text-xl text-center w-full truncate mb-1">
        {product.title}
      </h2>
      <span className="block text-sm sm:text-base">Price: <span className="font-semibold text-gray-900">${product.originalPrice}</span></span>
      <span className="block text-green-600 text-sm sm:text-base">
        After discount: <span className="font-semibold">${product.discountedPrice}</span>
      </span>
      <span className="flex items-center mt-2">
        {showAverageRating(product)}
      </span>
    </div>
  )
}

export default Product