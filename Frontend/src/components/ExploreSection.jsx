import { Link } from 'react-router-dom';
import { blogData } from './mockData';

const ExploreSection = () => {
  // Get first 4 blog posts for homepage
  const featuredBlogs = blogData.slice(0, 4);

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            className="text-4xl font-bold text-gray-800 mb-4"
            style={{ fontFamily: "var(--font-italiana)" }}
          >
            Explore Wellness & Beauty
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover expert insights on skincare, wellness tips, and ingredient guides 
            to help you achieve your healthiest, most radiant skin.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredBlogs.map((blog) => (
            <div 
              key={blog.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-[#7e973d] text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {blog.category}
                </span>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{blog.readTime}</span>
                  <span>{new Date(blog.date).toLocaleDateString()}</span>
                </div>
                
                <Link 
                  to={`/blog/${blog.id}`}
                  className="inline-block bg-[#2d310e] text-white px-4 py-2 rounded hover:bg-[#1a1c08] transition-colors duration-300 text-sm font-medium"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link 
            to="/explore"
            className="inline-flex items-center bg-[#7e973d] text-white px-8 py-3 rounded-lg hover:bg-[#6a7f35] transition-colors duration-300 font-semibold"
          >
            View All Articles
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;