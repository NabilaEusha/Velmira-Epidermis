import { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogData } from '../components/mockData';

const ExplorePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique categories
  const categories = ['All', ...new Set(blogData.map(blog => blog.category))];

  // Filter blogs based on category and search
  const filteredBlogs = blogData.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#2d310e] to-[#7e973d] text-white py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 text-center">
          <h1 
            className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-italiana)" }}
          >
            Explore Wellness & Beauty
          </h1>
          <p className="text-base sm:text-xl max-w-3xl mx-auto">
            Your ultimate resource for skincare knowledge, wellness tips, and beauty insights. 
            Discover expert advice to transform your skin health journey.
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 sm:gap-4">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7e973d]"
              />
              <svg className="absolute left-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  aria-label={`Filter by ${category}`}
                  className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300 min-h-[44px] min-w-[44px] ${
                    selectedCategory === category
                      ? 'bg-[#7e973d] text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {filteredBlogs.map((blog) => (
            <article 
              key={blog.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-32 sm:h-40 md:h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-[#7e973d] text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">
                  {blog.category}
                </span>
              </div>
              
              <div className="p-4 sm:p-6 flex flex-col flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 line-clamp-2 hover:text-[#7e973d] transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{blog.readTime}</span>
                  <span>{new Date(blog.date).toLocaleDateString()}</span>
                </div>
                
                <Link 
                  to={`/blog/${blog.id}`}
                  aria-label={`Read full article: ${blog.title}`}
                  className="inline-block w-full text-center bg-[#2d310e] text-white px-4 py-2 rounded hover:bg-[#1a1c08] transition-colors duration-300 text-xs sm:text-sm font-medium min-h-[44px] min-w-[44px]"
                >
                  Read Full Article
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchTerm('');
              }}
              aria-label="Clear Filters"
              className="bg-[#7e973d] text-white px-4 sm:px-6 py-2 rounded hover:bg-[#6a7f35] transition-colors duration-300 min-h-[44px] min-w-[44px] text-sm sm:text-base"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default ExplorePage;