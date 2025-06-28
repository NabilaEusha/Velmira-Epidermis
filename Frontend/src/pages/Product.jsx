import StarRatings from "react-star-ratings";
import { FaMinus, FaPlus, FaBox, FaTruck, FaShieldAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { userRequest } from "../requestMethods";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addProduct } from "../redux/cartRedux";
import { showAverageRating } from "../components/Ratings"

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  let price;

  const handleQuantity = (action) => {
    if (action === "dec") {
      setQuantity(quantity === 1 ? 1 : quantity - 1);
    }

    if (action === "inc") {
      setQuantity(quantity + 1);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await userRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, [id]);

  const handlePrice = (
    originalPrice,
    discountedPrice,
    wholePrice,
    minimumQuantity,
    quantity
  ) => {
    if (quantity > minimumQuantity && discountedPrice) {
      discountedPrice = wholePrice;
      price = discountedPrice;
      return price;
    } else if (quantity > minimumQuantity && originalPrice) {
      originalPrice = wholePrice;
      price = originalPrice;
      return price;
    } else if (discountedPrice) {
      price = discountedPrice;
      return price;
    } else {
      price = originalPrice;
      return price;
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addProduct({ ...product, quantity, price, email: "eusha.nabila@gmail.com" })
    );
    toast.success("Product has been added to basket successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    console.log(cart);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.info(isWishlisted ? "Removed from wishlist" : "Added to wishlist", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const currentPrice = handlePrice(
    product.originalPrice,
    product.discountedPrice,
    product.wholesalePrice,
    product?.wholesaleMinimumQuantity,
    quantity
  );

  const hasDiscount = product.discountedPrice && product.originalPrice > product.discountedPrice;
  const discountPercentage = hasDiscount ? 
    Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* LEFT IMAGE SECTION */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white p-8">
              <img
                src={product.img}
                alt={product.title}
                className="w-full h-[600px] object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Discount Badge */}
              {hasDiscount && (
                <div className="absolute top-4 left-4 bg-[#96694c] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  -{discountPercentage}% OFF
                </div>
              )}
            </div>
          </div>

          {/* RIGHT CONTENT SECTION */}
          <div className="flex flex-col space-y-8">
            
            {/* Product Header */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                {product.title}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {showAverageRating(product)}
                </div>
                <span className="text-sm text-gray-500">
                  ({product?.ratings?.length || 0} reviews)
                </span>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.desc}
              </p>
            </div>

            {/* Price Section */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">
                  ${currentPrice}
                </span>
                {hasDiscount && (
                  <span className="text-xl text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              
              {quantity > (product?.wholesaleMinimumQuantity || 0) && (
                <div className="mt-2 text-sm text-[#96694c] font-medium">
                  Wholesale pricing applied!
                </div>
              )}
            </div>

            {/* Wholesale Offer */}
            {product.wholesalePrice && (
              <div className="bg-[#96694c] text-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <FaBox className="text-2xl" />
                  <div>
                    <h3 className="font-bold text-lg">Wholesale Available</h3>
                    <p className="text-white opacity-90">
                      ${product.wholesalePrice} per item for orders of {product.wholesaleMinimumQuantity}+ items
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* What's in the Box */}
            <div className="bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <FaBox className="text-2xl text-[#96694c]" />
                  <h3 className="text-xl font-bold text-gray-800">What's in the Box</h3>
                </div>
                <div className="w-full h-px bg-gray-200 mb-4"></div>
                <p className="text-gray-700 font-medium">{product.title}</p>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              
              {/* Quantity Selector */}
              <div className="flex items-center space-x-6">
                <span className="text-lg font-semibold text-gray-700">Quantity:</span>
                <div className="flex items-center space-x-4 bg-gray-50 rounded-full p-2">
                  <button
                    onClick={() => handleQuantity("dec")}
                    className="w-8 h-8 bg-[#ab9962] text-white rounded-full flex items-center justify-center hover:bg-[#96694c] transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <FaMinus />
                  </button>
                  
                  <span className="text-2xl font-bold text-gray-800 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  
                  <button
                    onClick={() => handleQuantity("inc")}
                    className="w-8 h-8 bg-[#ab9962] text-white rounded-full flex items-center justify-center hover:bg-[#96694c] transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#7a6557] hover:bg-[#6a5447] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-lg">Add to Cart</span>
                  <span className="text-xl">→</span>
                </div>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <FaTruck className="text-2xl text-[#96694c] mb-2" />
                <span className="text-sm font-medium text-gray-700">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <FaShieldAlt className="text-2xl text-[#ab9962] mb-2" />
                <span className="text-sm font-medium text-gray-700">Secure Payment</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <FaBox className="text-2xl text-[#7a6557] mb-2" />
                <span className="text-sm font-medium text-gray-700">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Customer Reviews
          </h2>
          
          {product?.ratings?.length > 0 ? (
            <div className="space-y-6">
              {(showAllReviews ? product.ratings : product.ratings.slice(0, 2)).map((rating, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#7a6557] rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {rating.postedBy.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-bold text-gray-800 text-lg">
                        {rating.postedBy}
                      </span>
                    </div>
                    <StarRatings
                      rating={parseInt(rating.star)}
                      starDimension="24px"
                      starRatedColor="#ab9962"
                      starSpacing="2px"
                    />
                  </div>
                  {rating.comment && (
                    <p className="text-gray-700 leading-relaxed ml-16">
                      "{rating.comment}"
                    </p>
                  )}
                </div>
              ))}
              
              {product.ratings.length > 2 && (
                <div className="text-center pt-4">
                  <button
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="bg-[#7a6557] hover:bg-[#6a5447] text-white font-medium py-3 px-8 rounded-lg transition-all duration-300"
                  >
                    {showAllReviews ? 'Show Less' : `See More Reviews (${product.ratings.length - 2})`}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl text-gray-300 mb-4">⭐</div>
              <p className="text-xl text-gray-500">No reviews yet</p>
              <p className="text-gray-400 mt-2">Be the first to review this product!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;