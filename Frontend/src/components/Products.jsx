import { useEffect, useState } from "react";
import Product from "./Product";
import PropTypes from "prop-types"
import {userRequest} from "../requestMethods"
import {Link} from "react-router-dom";



const Products = ({ filters, sort, query }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  console.log(products)

  useEffect(() => {
    const getProducts = async () => {

      try {
        let res;

        if (query) {
          res = await userRequest.get(`/products?search=${query}`);
        } else {
          res = await userRequest.get("/products");
        }
        setProducts(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getProducts();

  }, [
    query
  ])


  useEffect(() => {

    let tempProducts = [...products];

    // Apply filters

    if (filters) {
      tempProducts = tempProducts.filter((item) => Object.entries(filters).every(([key, value]) => {
        if (!value) return true;

        return item[key].includes(value);
      }))
    }


    // Apply sorting

    if (sort === "newest") {
      tempProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    } else if (sort === "asc") {

      tempProducts.sort((a, b) => a.originalPrice - b.originalPrice);

    } else if (sort === "desc") {
      tempProducts.sort((a, b) => b.originalPrice - a.originalPrice);
    }

    setFilteredProducts(tempProducts);
  }, [products, filters, sort])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-6 md:px-10 lg:px-16">
      {filteredProducts.map((product, index) => (
        <Link to={`/product/${product._id}`} key={product._id} aria-label={`View details for ${product.title || 'product'}`}
          className="block h-full">
          <Product product={product} />
        </Link>
      ))}
    </div>
  );
};

Products.propTypes = {
  cat: PropTypes.string,
  filters: PropTypes.object,
  sort: PropTypes.string,
  query: PropTypes.string
}

export default Products;