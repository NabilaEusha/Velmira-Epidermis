import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { userRequest } from "../requestMethods";
import { 
  FaBox, 
  FaShoppingCart, 
  FaUsers, 
  FaDollarSign,
  FaChartLine,
  FaArrowUp,
  FaArrowDown
} from "react-icons/fa";

const Home = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    loading: true
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [productsRes, ordersRes, usersRes] = await Promise.all([
          userRequest.get("/products"),
          userRequest.get("/orders"),
          userRequest.get("/users")
        ]);

        const products = productsRes.data;
        const orders = ordersRes.data;
        const users = usersRes.data;

        // Calculate total revenue from orders
        const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

        // Get recent orders (last 5)
        const recent = orders
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        setStats({
          totalProducts: products.length,
          totalOrders: orders.length,
          totalUsers: users.length,
          totalRevenue: totalRevenue,
          loading: false
        });

        setRecentOrders(recent);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 0: return "text-yellow-600 bg-yellow-100";
      case 1: return "text-blue-600 bg-blue-100";
      case 2: return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0: return "Pending";
      case 1: return "Processing";
      case 2: return "Delivered";
      default: return "Unknown";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome to your e-commerce admin dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Products */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FaBox className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FaShoppingCart className="text-green-600 text-xl" />
            </div>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <FaUsers className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <FaDollarSign className="text-yellow-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
            <FaChartLine className="text-gray-400" />
          </div>
          
          {recentOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{order.name}</p>
                          <p className="text-sm text-gray-500">{order.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-900">
                        {formatCurrency(order.total)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No orders found</p>
            </div>
          )}
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Revenue Trend</h2>
            <FaArrowUp className="text-green-500" />
          </div>
          
          <div className="h-64">
            <LineChart
              xAxis={[{ 
                data: [1, 2, 3, 4, 5, 6, 7],
                label: 'Days'
              }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5, 7],
                  label: 'Revenue',
                  color: '#3B82F6'
                },
              ]}
              height={250}
              margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
              grid={{ vertical: true, horizontal: true }}
            />
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Last 7 days revenue trend</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <FaArrowUp className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Growth Rate</p>
              <p className="text-xl font-bold text-gray-900">+12.5%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FaShoppingCart className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Order Value</p>
              <p className="text-xl font-bold text-gray-900">
                {stats.totalOrders > 0 ? formatCurrency(stats.totalRevenue / stats.totalOrders) : '$0.00'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <FaUsers className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-xl font-bold text-gray-900">{Math.floor(stats.totalUsers * 0.8)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;