import { useLocation } from 'react-router-dom';
import Products from '../components/Products';
import { useState } from 'react';

const ProductList = () => {
  const location = useLocation();
  const query = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {query ? query.charAt(0).toUpperCase() + query.slice(1) : 'All Products'}
          </h1>
          <p className="text-gray-600">Discover our curated collection of premium beauty products</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
            {/* Filter Section */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                </svg>
                <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">Filter by</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Skin Concern</label>
                  <select 
                    name="concern" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700 appearance-none cursor-pointer"
                    onChange={handleFilters}
                  >
                    <option value="">Select concern</option>
                    <option>Dry Skin</option>
                    <option>Pigmentation</option>
                    <option>Oil Control</option>
                    <option>Anti Acne</option>
                    <option>Sunburn</option>
                    <option>Skin Brightening</option>
                    <option>Tan Removal</option>
                    <option>Night Routine</option>
                    <option>UV Protection</option>
                    <option>Damaged Hair</option>
                    <option>Frizzy Hair</option>
                    <option>Stretch Marks</option>
                    <option>Color Protection</option>
                    <option>Dry Hair</option>
                    <option>Soothing</option>
                    <option>Dandruff</option>
                    <option>Greying</option>
                    <option>Hairfall</option>
                    <option>Hair Color</option>
                    <option>Well Being</option>
                    <option>Acne</option>
                    <option>Hair Growth</option>
                    <option>Anti Aging</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>

                <div className="relative flex-1">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Brand</label>
                  <select 
                    name="brand" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700 appearance-none cursor-pointer"
                    onChange={handleFilters}
                  >
                    <option value="">Select brand</option>
                     <option>Beauty of Joseon</option>
                    <option>The Ordinary</option>
                    <option>Isntree</option>
                    <option>La Roche-Posay</option>
                    <option>CeraVe</option>
                    <option>Aveeno</option>
                    <option>COSRX</option>
                    <option>Skin1004</option>
                    <option>Cetaphil</option>
                    <option>Paula’s Choice</option>
                    <option>Nivea</option>
                    <option>Eucerin</option>
                    <option>Neutrogena</option>
                    <option>Johnsons Baby</option>
                    <option>Anua</option>

                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Sort Section */}
            <div className="flex items-center gap-4 lg:border-l lg:border-gray-200 lg:pl-6">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v1H8V5z"></path>
                </svg>
                <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">Sort by</span>
              </div>
              
              <div className="relative">
                <select 
                  name="price" 
                  className="p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700 appearance-none cursor-pointer min-w-[140px]"
                  onChange={(e) => setSort(e.target.value)}
                  value={sort}
                >
                  <option value="newest">Newest</option>
                  <option value="asc">Price (Low to High)</option>
                  <option value="desc">Price (High to Low)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Active Filters Display */}
          {(filters.concern || filters.brand) && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium text-gray-500">Active filters:</span>
                {filters.concern && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {filters.concern}
                    <button 
                      onClick={() => setFilters({...filters, concern: ''})}
                      className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.brand && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {filters.brand}
                    <button 
                      onClick={() => setFilters({...filters, brand: ''})}
                      className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-400 hover:bg-green-200 hover:text-green-600"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Products Component */}
        <Products query={query} filters={filters} sort={sort} />
      </div>
    </div>
  );
};

export default ProductList;