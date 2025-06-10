import {showAverageRating} from "./Ratings"
const Product = ({product}) => {
  return (
    <div className="flex flex-col items-center justify-center h-[500px] m-[30px] cursor-pointer">
        <img src={product.img} alt="" className="h-[300px] w-[300px] bg-cover" />
        <h2 className="font-semibold text-[18px] w-[300px]">
         {product.title}
        </h2>
        <span className="block">Price: <span className="font-semibold text-gray-900">${product.originalPrice}</span></span>
          <span className="block text-green-600">
            After discount: <span className="font-semibold">${product.discountedPrice}</span>
          </span>
        <span className="flex items-center">

        {showAverageRating(product)}
        </span>

      </div>
  )
}

export default Product