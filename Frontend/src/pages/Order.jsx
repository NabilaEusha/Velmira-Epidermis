import { FaCheckCircle } from "react-icons/fa";
import StarRatings from "react-star-ratings";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useSelector, useDispatch } from "react-redux";
import { resetCart } from "../redux/cartRedux";
import { Link, useLocation } from "react-router-dom";


const Order = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const [orders, setOrders] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserOrder = async () => {
            if (!user.currentUser?._id) {
                setLoading(false);
                return;
            }
            
            try {
                setLoading(true);
                setError(null);
                const res = await userRequest.get(`/orders/find/${user.currentUser._id}`);
                setOrders(res.data);
                // Only reset cart if redirected from Stripe (session_id in URL)
                const params = new URLSearchParams(location.search);
                if (params.has('session_id')) {
                    dispatch(resetCart());
                    // Remove session_id from URL so it doesn't reset again on refresh
                    params.delete('session_id');
                    window.history.replaceState({}, '', location.pathname + (params.toString() ? '?' + params.toString() : ''));
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
                setError("Failed to load orders. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        getUserOrder();
    }, [user, dispatch, location]);

    const handleRating = async(id) =>{
        const singleRating = {
            star: rating,
            name: user.currentUser.name,
            postedBy: user.currentUser.name,
            comment: comment,
        };
        try {
            await userRequest.put(`/products/rating/${id}`, singleRating);
            setComment("")
            setRating(0);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-4 sm:p-6">
                <div className="text-center mb-8">
                    <FaCheckCircle className="text-green-900 text-4xl sm:text-6xl mx-auto mb-4" />
                    <h1 className="text-2xl sm:text-3xl font-bold">Your Recent Order</h1>
                    <p className="text-gray-600 mt-2 text-sm sm:text-base">
                        Here are the details of your most recent purchase
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-8">
                        <p>Loading your order...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-8 text-red-600">
                        <p>{error}</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-8">
                        <p>You haven't placed any orders yet.</p>
                    </div>
                ) : (
                    orders.map((order, index) => (
                        <div className="mb-8" key={index}>
                            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Order #{order._id}</h2>
                            <div className="space-y-4">
                                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                                    <h3 className="text-lg sm:text-xl font-semibold mb-2">Items Ordered</h3>
                                    <div className="flex flex-col">
                                        {order.products.map((product, index) => (
                                            <div className="mb-4" key={index}>
                                                <div className="flex flex-col sm:flex-row items-center justify-evenly border-b border-gray-200 pb-4 gap-4">
                                                    <img
                                                        src={product.img}
                                                        alt=""
                                                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-md object-cover"
                                                    />
                                                    <div className="flex-1 sm:ml-4">
                                                        <h4 className="text-base sm:text-lg font-semibold">
                                                            {product.title}
                                                        </h4>
                                                        <p className="text-gray-600 text-sm">{product.quantity}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-base sm:text-lg font-bold">${product.price.toFixed(2)}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <h3 className="my-2 sm:my-3 text-sm sm:text-base">Rate this product</h3>
                                                    <StarRatings
                                                        numberOfStars={5}
                                                        starDimension="20px"
                                                        rating={rating}
                                                        isSelectable={true}
                                                        starRatedColor={"#FF7BA9"}
                                                        changeRating={(newRating) => {
                                                            setRating(newRating);
                                                        }}
                                                    />
                                                    <textarea
                                                        name=""
                                                        id=""
                                                        placeholder="leave a message"
                                                        className="p-2 w-full max-w-xs mt-3 text-sm rounded"
                                                        onChange={(e) => setComment(e.target.value)}
                                                    />
                                                    <button className="bg-[#1e1e1e] mt-3 w-full sm:w-[200px] p-2 text-white rounded min-h-[44px] min-w-[44px]" aria-label="Submit rating" onClick={() => handleRating(product._id)}>
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Shipping Information for this order */}
                                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg mt-4">
                                    <h3 className="text-lg sm:text-xl font-semibold mb-2">Shipping Information</h3>
                                    {order.email && <p className="text-gray-600 text-sm">{order.email}</p>}
                                    {order.phone && <p className="text-gray-600 text-sm">{order.phone}</p>}
                                    {order.name && <p className="text-gray-600 text-sm">{order.name}</p>}
                                    {order.address && <p className="text-gray-600 text-sm">{order.address}</p>}
                                </div>
                            </div>
                        </div>
                    ))
                )}

                <div className="bg-gray-50 rounded-lg mb-6 p-3 sm:p-4">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">Payment method</h3>
                    <p className="text-gray-600 text-sm">VISA</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">Order Summary</h3>
                    {orders.length > 0 && (
                        <>
                            <div className="flex justify-between mb-2">
                                <span className="text-base sm:text-lg font-medium">Subtotal</span>
                                <span className="text-base sm:text-lg font-semibold">${orders[0].total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-base sm:text-lg font-medium">Shipping</span>
                                <span className="text-base sm:text-lg font-semibold">$10.00</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-base sm:text-lg font-medium">Total</span>
                                <span className="text-base sm:text-lg font-semibold">${(orders[0].total + 10).toFixed(2)}</span>
                            </div>
                        </>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <Link to="/products">
                    <button className="bg-[#4b4924] text-white p-3 rounded-lg font-semibold cursor-pointer min-h-[44px] min-w-[44px]" aria-label="Continue Shopping">
                        Continue Shopping
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Order;