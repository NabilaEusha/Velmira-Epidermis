import {DataGrid} from '@mui/x-data-grid';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {userRequest} from "../requestMethods"
import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Products = () => {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() =>{
    const getProducts = async() =>{
      try {
      const res = await userRequest.get("/products");
      setProducts(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getProducts();
  },[])

  // Add product delete handler
  const handleDelete = async () => {
    if (!selectedProductId) return;
    try {
      await userRequest.delete(`/products/${selectedProductId}`);
      setProducts(products.filter((item) => item._id !== selectedProductId));
      toast.success('Product deleted successfully!');
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete product');
    } finally {
      setDialogOpen(false);
      setSelectedProductId(null);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="flex items-center">
            <img
              className="h-12 w-12 rounded-full object-cover mr-2 border"
              src={params.row.img}
              alt=""
              height="100px"
              width="100px"
            />
            <span className="font-semibold text-gray-800">{params.row.title}</span>
          </div>
        );
      },
    },
    { field: "desc", headerName: "Description", width: 150 },
    { field: "originalPrice", headerName: "Price ($)", width: 100 },
    { field: "inStock", headerName: "In Stock", width: 100 },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.row._id}`}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer w-[70px] rounded shadow font-semibold transition-colors">Edit</button>
            </Link>
          </>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <FaTrash className="text-red-500 cursor-pointer m-2 hover:text-red-700 transition-colors" onClick={() => { setDialogOpen(true); setSelectedProductId(params.row._id); }} />
          </>
        );
      },
    },
  ];

  // Filter products by search
  const filteredProducts = products.filter((product) =>
    product.title?.toLowerCase().includes(search.toLowerCase()) ||
    product.desc?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-10 px-4 flex justify-center">
      <ToastContainer position="top-right" />
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
      <div className="w-full max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
          <Link to="/newproduct">
            <button className="bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-2 rounded-lg text-white font-semibold shadow">
              + New Product
            </button>
          </Link>
        </div>
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow"
          />
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <DataGrid getRowId={(row) => row._id} rows={filteredProducts} columns={columns.filter(col => col.field !== '_id')} autoHeight hideFooterSelectedRowCount />
        </div>
      </div>
    </div>
  );
};

export default Products;