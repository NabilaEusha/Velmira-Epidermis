import { FaCheckCircle } from "react-icons/fa";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { userRequest } from "../requestMethods";

const statusMap = {
  0: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  1: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  2: { label: "Delivered", color: "bg-green-100 text-green-800" },
};

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const handleUpdateOrder = async (id) => {
    try {
      await userRequest.put(`/orders/${id}`, {
        status: 2,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: "_id", headerName: "Order ID", width: 120 },
    { field: "name", headerName: "Customer Name", width: 180 },
    { field: "email", headerName: "Customer Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 140,
      renderCell: (params) => {
        const status = statusMap[params.row.status] || statusMap[0];
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}
          >
            {status.label}
          </span>
        );
      },
    },
    {
      field: "Deliver",
      headerName: "Mark as Delivered",
      width: 180,
      renderCell: (params) => {
        return params.row.status === 0 || params.row.status === 1 ? (
          <button
            className="flex items-center gap-2 bg-[#2b4b6b] hover:bg-[#1d3557] text-white px-4 py-1 rounded-lg shadow transition-all duration-150 text-sm font-medium"
            onClick={() => handleUpdateOrder(params.row._id)}
          >
            <FaCheckCircle /> Mark Delivered
          </button>
        ) : (
          <span className="text-green-600 font-semibold">Delivered</span>
        );
      },
    },
  ];

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("/orders");
        // Sort orders by createdAt descending (newest first)
        const sortedOrders = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedOrders);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-50 py-8">
      <div className="w-full max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2b4b6b] mb-2">Orders Management</h1>
          <p className="text-gray-500 text-lg">View and manage all customer orders here.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <DataGrid
            getRowId={(row) => row._id}
            rows={orders}
            columns={columns}
            autoHeight
            className="!border-0 !bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;