import { FaTrash } from 'react-icons/fa';
import {DataGrid} from '@mui/x-data-grid';
import {userRequest} from "../requestMethods"
import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {
 const [users, setUsers] = useState([]);
 const [search, setSearch] = useState("");
 const [dialogOpen, setDialogOpen] = useState(false);
 const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() =>{
   
    const getUsers = async() =>{

      try {
      const res = await userRequest.get("/users");
      setUsers(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUsers();
  },[])
  // Add user delete handler
  const handleDelete = async () => {
    if (!selectedUserId) return;
    try {
      await userRequest.delete(`/users/${selectedUserId}`);
      setUsers(users.filter((item) => item._id !== selectedUserId));
      toast.success('User deleted successfully!');
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete user');
    } finally {
      setDialogOpen(false);
      setSelectedUserId(null);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "role", headerName: "Role", width: 130 },
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <FaTrash className="text-red-500 cursor-pointer m-2 hover:text-red-700 transition-colors" onClick={() => { setDialogOpen(true); setSelectedUserId(params.row._id); }} />
          </>
        );
      },
    },
  ];

  // Filter users by search
  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-10 px-4 flex justify-center">
      <ToastContainer position="top-right" />
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
      <div className="w-full max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        </div>
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow"
          />
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <DataGrid getRowId={(row) => row._id} rows={filteredUsers} columns={columns.filter(col => col.field !== '_id')} autoHeight hideFooterSelectedRowCount />
        </div>
      </div>
    </div>
  );
}

export default Users;