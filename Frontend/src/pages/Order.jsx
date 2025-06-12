import { FaCheckCircle } from "react-icons/fa";
import StarRatings from "react-star-ratings";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useSelector } from "react-redux";

const Order = () => {
    const user = useSelector((state) => state.user);
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
            } catch (error) {
                console.error("Error fetching orders:", error);
                setError("Failed to load orders. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        getUserOrder();
    }, [user]);

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
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <div className="text-center mb-8">
                    <FaCheckCircle className="text-green-900 text-6xl mx-auto mb-4" />
                    <h1 className="text-3xl font-bold">Your Orders</h1>
                    <p className="text-gray-600 mt-2">
                        Here are the details of your recent orders
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-8">
                        <p>Loading your orders...</p>
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
                            <h2 className="text-2xl font-semibold mb-4">Order #{order._id}</h2>
                            <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-xl font-semibold mb-2">Items Ordered</h3>
                                    <div className="flex flex-col">
                                        {order.products.map((product, index) => (
                                            <div className="mb-4" key={index}>
                                                <div className="flex items-center justify-evenly border-b border-gray-200 pb-4">
                                                    <img
                                                        src={product.img}
                                                        alt=""
                                                        className="w-24 h-24 rounded-md object-cover"
                                                    />
                                                    <div className="flex-1 ml-4">
                                                        <h4 className="text-lg font-semibold">
                                                            {product.title}
                                                        </h4>
                                                        <p className="text-gray-600">{product.quantity}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-lg font-bold">${product.price}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <h3 className="my-3">Rate this product</h3>
                                                    <StarRatings
                                                        numberOfStars={5}
                                                        starDimension="25px"
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
                                                        className="p-[10px] w-[300px] mt-3"
                                                        onChange={(e) => setComment(e.target.value)}
                                                    />
                                                    <button className="bg-[#1e1e1e] mt-3 w-[200px] p-[5px] text-white" onClick={() => handleRating(product._id)}>
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}

                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-x1 font-semibold mb-2">Shipping Information</h3>
                    <p className="text-gray-600">u2108060_nabila@gmail.com</p>
                    <p className="text-gray-600">+880 1533 030 960</p>
                    <p className="text-gray-600">Nabila S.</p>
                </div>

                <div className="bg-gray-50 rounded-lg mb-6">
                    <h3 className="text-xl font-semibold mb-2">Payement method</h3>
                    <p className="text-gray-600">VISA</p>
                </div>

                <div className="bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
                    <div className="flex justify-between mb-2">
                        <span className="text-lg font-medium">Subtotal</span>
                        <span className="text-lg font-semibold">$720</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-lg font-medium">Shipping</span>
                        <span className="text-lg font-semibold">$10</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-lg font-medium">Total</span>
                        <span className="text-lg font-semibold">$730</span>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button className="bg-[#4b4924] text-white p-3 rounded-lg font-semibold cursor-pointer">
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Order;