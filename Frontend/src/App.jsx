import './App.css';
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Myaccount from "./pages/Myaccount";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Announcement from "./components/Announcement";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import Order from "./pages/Order";
import About from './pages/About';
import ExplorePage from './pages/ExplorePage';
import BlogPost from './pages/BlogPost';
import Chatbot from './pages/Chatbot/Chatbot';
import {useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user);
  const Layout = () => {
    return (
      <div>
        <Announcement/>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path:"/",
          element: <Home />
        },
        {
          path:"/cart",
          element: <Cart />
        },
        {
          path:"/login",
          element: <Login />
        },
        {
          path:"/create-account",
          element: <Register />
        },
        {
          path:"/myaccount",
          element: user?.currentUser ? <Myaccount /> : <Home />
        },
        {
          path:"/product/:productId",
          element: <Product />
        },
        {
          path:"/products/:searchterm",
          element: <ProductList />
        },
        {
          path:"/products",
          element: <ProductList />
        },
        {
          path: "/myorders",
          element: <Order />
        },
        {
          path: "/about",
          element: <About />
        },
        {
          path: "/explore",
          element: <ExplorePage />
        },
        {
          path: "/blog/:id",
          element: <BlogPost />
        },
        {
          path: "/chatbot",
          element: <Chatbot />
        }
      ]
    },
   
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;