import StarRatings from "react-star-ratings";
import { FaMinus, FaPlus } from "react-icons/fa";

const Product = () => {
  return (
    <div className="p-8 flex flex-col lg:flex-row gap-10">
      {/* LEFT IMAGE */}
      <div className="flex-1 flex justify-center">
        <img
          src="/lotion1.jpg"
          alt="Lotion"
          className="h-[500px] w-full max-w-[650px] object-cover rounded-md shadow-lg"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* Title */}
        <h2 className="text-2xl font-semibold mb-4">
          COSRX Advanced Snail 96 Mucin Power Essence 100ml
        </h2>

        {/* Description */}
        <p className="text-gray-700 mb-4">
         COSRX Snail Mucin Essence (96% filtrate) deeply hydrates, repairs skin, fades pigmentation, and softens fine lines. Key ingredients like hyaluronic acid and panthenol boost elasticity. Suitable for most skin types.

        </p>

        {/* Price */}
        <h3 className="text-xl font-semibold mb-2">$90</h3>

        {/* Rating */}
        <div className="flex items-center mb-6">
          <StarRatings
            rating={2.403}
            starDimension="25px"
            starRatedColor="yellow"
            starSpacing="5px"
          />
          <span className="ml-2 text-gray-600">(2)</span>
        </div>

        {/* What's in the box */}
        <div className="border-2 border-gray-300 rounded-lg shadow-md p-6 mb-6 w-full max-w-md">
          <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">
            WHAT'S IN THE BOX
          </h2>
          <hr className="mb-4" />
         <span className="text-[18px] text-gray-600 block">
  <div className="space-y-2">
    <div>
      <strong>1.</strong> COSRX Advanced Snail Mucin Essence (100ml)
    </div>
    <div>
      <strong>2.</strong> A Little Gift from Velmira – A surprise mini treat, just for you!
    </div>
  </div>
</span>

        </div>

        {/* Wholesale offer */}
        <div className="inline-flex items-center bg-[#96694c] text-white font-semibold text-sm p-4 rounded-full shadow-md mb-6">
          Wholesale Available: $70 as from 10 items
        </div>

        {/* Quantity selector */}
        <div className="flex items-center mb-6">
          <FaMinus className="bg-[#ab9962] text-white cursor-pointer p-2 rounded-full text-3xl" />
          <span className="text-lg font-semibold mx-6">1</span>
          <FaPlus className="bg-[#ab9962] text-white cursor-pointer p-2 rounded-full text-3xl" />
        </div>

        {/* Add to cart button */}
        <button className="bg-[#7a6557] text-white font-medium py-3 px-6 w-[200px] rounded-md mb-6 hover:opacity-90 transition">
          Add to Cart
        </button>

        <hr className="my-4" />

        {/* Reviews Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Reviews</h2>

          {/* Review 1 */}
          <div className="flex items-center mb-4">
            <StarRatings
              rating={2.403}
              starDimension="25px"
              starRatedColor="yellow"
              starSpacing="5px"
            />
            <span className="ml-4 font-semibold">Tasnia S.</span>
          </div>

          {/* Review 2 */}
          <div className="flex items-center">
            <StarRatings
              rating={2.403}
              starDimension="25px"
              starRatedColor="yellow"
              starSpacing="5px"
            />
            <span className="ml-4 font-semibold">Eusha</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
