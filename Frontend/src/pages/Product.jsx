import StarRatings from "react-star-ratings";
import { FaMinus, FaPlus } from "react-icons/fa";
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
  return (
    <div className="p-8 flex flex-col lg:flex-row gap-10">
          <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
      {/* LEFT IMAGE */}
      <div className="flex-1 flex justify-center">
        <img
          src={product.img}
          alt=""
          className="h-[500px] w-full max-w-[650px] object-cover rounded-md shadow-lg"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* Title */}
        <h2 className="text-2xl font-semibold mb-4">{product.title}</h2>

        {/* Description */}
        <p className="text-gray-700 mb-4">{product.desc}</p>

        {/* Price */}
        <h3 className="text-xl font-semibold mb-2">
          $
          {handlePrice(
            product.originalPrice,
            product.discountedPrice,
            product.wholesalePrice,
            product?.wholesaleMinimumQuantity,
            quantity
          )}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-6">
              {showAverageRating(product)}
        </div>

        {/* What's in the box */}
        <div className="border-2 border-gray-300 rounded-lg shadow-md p-6 mb-6 w-full max-w-md">
          <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">
            WHAT'S IN THE BOX
          </h2>
          <hr className="mb-4" />
          <span className="text-[18px] text-gray-600 block">

             {product.title}
          
          </span>
        </div>

        {/* Wholesale offer */}
        <div className="inline-flex items-center bg-[#96694c] text-white font-semibold text-sm p-4 rounded-full shadow-md mb-6">
          Wholesale Available: ${product.wholesalePrice} as from{" "}
          {product.wholesaleMinimumQuantity} items{" "}
        </div>

        {/* Quantity selector */}
        <div className="flex items-center mb-6">
          <FaMinus
            className="bg-[#ab9962] text-white cursor-pointer p-2 rounded-full text-3xl"
            onClick={() => handleQuantity("dec")}
          />
          <span className="text-lg font-semibold mx-6">{quantity}</span>
          <FaPlus
            className="bg-[#ab9962] text-white cursor-pointer p-2 rounded-full text-3xl"
            onClick={() => handleQuantity("inc")}
          />
        </div>

        {/* Add to cart button */}
        <button className="bg-[#7a6557] text-white font-medium py-3 px-6 w-[200px] rounded-md mb-6 hover:opacity-90 transition cursor-pointer shadow-md"
        onClick={handleAddToCart}
        >
          Add to Cart
        </button>

        <hr className="my-4" />

        {/* Reviews Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Reviews</h2>

          
          {
            product?.ratings?.map((rating, index) => (
              <div className="flex items-center" key={index}>
                <StarRatings
                  rating={parseInt(rating.star)}
                  starDimension="25px"
                  starRatedColor="red"
                  starSpacing="5px"
                />
                <span className="font-semibold mx-[20px]">{rating.postedBy}</span>
              </div>
            ))
          }

        </div>
      </div>
    </div>
  );
};

export default Product;
