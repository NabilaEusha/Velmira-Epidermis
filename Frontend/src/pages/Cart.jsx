import React from "react";
import { FaMinus, FaPlus, FaTrashAlt, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeProduct, updateQuantity } from "../redux/cartRedux";
import { userRequest } from "../requestMethods";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleRemoveProduct = (product) => {
    dispatch(removeProduct(product));
    toast.success("Item removed from cart");
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart cleared successfully");
  };

  const handleQuantityChange = (product, change) => {
    const newQuantity = product.quantity + change;
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ productId: product._id, newQuantity }));
    }
  };

  const handleProductClick = (product) => {
    // Navigate to product details page
    window.location.href = `/product/${product._id}`;
  };

  const handleCheckout = async () => {
    if (user.currentUser) {
      try {
        const res = await userRequest.post("/stripe/create-checkout-session", {
          cart,
          userId: user.currentUser._id,
          email: user.currentUser.email,
          name: user.currentUser.name,
        });
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      } catch (error) {
        console.log(error.message);
        toast.error("Checkout failed. Please try again.");
      }
    } else {
      toast.error("Please login to proceed to checkout.");
    }
  };

  const shippingCost = 10.00;
  const subtotal = cart.total || 0;
  const totalWithShipping = subtotal + shippingCost;

  if (!cart.products || cart.products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaShoppingCart className="mx-auto text-6xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some items to get started</p>
          <button
            onClick={() => window.location.href = '/products'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="mt-16"
      />

      {/* Header */}
      <div className="p-8">
        <h3 className="text-[18px] font-bold mb-6">Shopping Cart</h3>
      </div>

      <div className="px-8">
        <div className="flex gap-8">
          {/* Cart Items */}
          <div className="flex-1 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Your Items</h2>

            <div className="flex flex-col space-y-4">
              {cart.products.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-gray-200 pb-4"
                >
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-32 h-32 object-cover rounded-md cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleProductClick(product)}
                  />

                  <div className="flex-1 ml-4">
                    <h3 
                      className="text-xl font-semibold mb-2 cursor-pointer hover:text-blue-600 transition-colors"
                      onClick={() => handleProductClick(product)}
                    >
                      {product.title}
                    </h3>
                    <p className="text-gray-600 mb-2">{product.desc}</p>
                    <div className="flex items-center my-5 p-4">
                      <FaMinus 
                        className="bg-[#555114] text-white cursor-pointer p-2 rounded-full mr-4 text-3xl hover:bg-opacity-80 transition-colors" 
                        onClick={() => handleQuantityChange(product, -1)}
                      />
                      <span className="text-lg font-semibold mx-4">
                        {product.quantity}
                      </span>
                      <FaPlus 
                        className="bg-[#555114] text-white cursor-pointer p-2 rounded-full mr-4 text-3xl hover:bg-opacity-80 transition-colors" 
                        onClick={() => handleQuantityChange(product, 1)}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold mb-6">${(product.price * product.quantity).toFixed(2)}</p>
                    <FaTrashAlt
                      className="text-red-600 cursor-pointer hover:text-red-800 transition-colors"
                      onClick={() => handleRemoveProduct(product)}
                    />
                  </div>
                </div>
              ))}

              <button
                className="bg-[#555114] w-[200px] text-white p-3 mt-4 rounded-md font-semibold cursor-pointer hover:bg-opacity-80 transition-colors"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-80 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between">
                <span className="text-lg font-medium">Subtotal</span>
                <span className="text-lg font-medium">$ {subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-lg font-medium">Shipping</span>
                <span className="text-lg font-medium">$10.00</span>
              </div>

              <div className="flex justify-between">
                <span className="text-lg font-medium">Total</span>
                <span className="text-lg font-medium">$ {totalWithShipping.toFixed(2)}</span>
              </div>

              <button
                className="bg-[#555114] text-white p-3 w-full rounded-lg font-semibold cursor-pointer hover:bg-opacity-80 transition-colors"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;