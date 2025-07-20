import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogData } from '../components/mockData';

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const currentBlog = blogData.find(b => b.id === parseInt(id));
    setBlog(currentBlog);
    
    if (currentBlog) {
      // Get related blogs from the same category
      const related = blogData
        .filter(b => b.category === currentBlog.category && b.id !== currentBlog.id)
        .slice(0, 3);
      setRelatedBlogs(related);
    }
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Blog post not found</h2>
          <Link to="/explore" className="text-[#7e973d] hover:underline">
            Return to Explore
          </Link>
        </div>
      </div>
    );
  }

  // Mock full content for demonstration
  const fullContent = `
    <p>Welcome to this comprehensive guide on ${blog.title.toLowerCase()}. This article will provide you with in-depth insights and practical tips that you can implement in your daily skincare routine.</p>
    
    <h3>Understanding the Basics</h3>
    <p>Before diving into specific solutions, it's important to understand the fundamentals. Your skin is your body's largest organ and requires consistent care and attention to maintain its health and appearance.</p>
    
    <h3>Key Points to Remember</h3>
    <ul>
      <li>Consistency is crucial for seeing results</li>
      <li>Always patch test new products before full application</li>
      <li>Listen to your skin and adjust your routine as needed</li>
      <li>Protect your skin from environmental damage</li>
    </ul>
    
    <h3>Step-by-Step Approach</h3>
    <p>Here's a detailed breakdown of how to implement these recommendations:</p>
    <ol>
      <li>Start with a gentle cleanser suitable for your skin type</li>
      <li>Apply treatments in order of thinnest to thickest consistency</li>
      <li>Always finish with sunscreen during your morning routine</li>
      <li>Be patient - most skincare results take 4-6 weeks to become visible</li>
    </ol>
    
    <h3>Common Mistakes to Avoid</h3>
    <p>Many people make these common errors that can hinder their progress:</p>
    <p>Over-exfoliating, using too many active ingredients at once, skipping moisturizer, and not being consistent with their routine.</p>
    
    <h3>Conclusion</h3>
    <p>Remember that healthy skin is a journey, not a destination. Be patient with yourself and your skin as you implement these changes. With consistent care and the right approach, you'll be on your way to achieving your skincare goals.</p>
  `;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-56 sm:h-[40vh] md:h-[60vh] overflow-hidden">
        <img 
          src={blog.image} 
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-2 sm:px-6">
            <span className="inline-block bg-[#7e973d] px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4">
              {blog.category}
            </span>
            <h1 
              className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-italiana)" }}
            >
              {blog.title}
            </h1>
            <div className="flex items-center justify-center space-x-4 sm:space-x-6 text-xs sm:text-sm">
              <span>{blog.readTime}</span>
              <span>•</span>
              <span>{new Date(blog.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-2 sm:px-6 py-8 sm:py-12">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 mb-8 sm:mb-12">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: fullContent }}
          />
        </div>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <div className="mb-8 sm:mb-12">
            <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Link 
                  key={relatedBlog.id}
                  to={`/blog/${relatedBlog.id}`}
                  aria-label={`Read related article: ${relatedBlog.title}`}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 min-h-[44px] min-w-[44px]"
                >
                  <img 
                    src={relatedBlog.image} 
                    alt={relatedBlog.title}
                    className="w-full h-28 sm:h-40 object-cover"
                  />
                  <div className="p-3 sm:p-4">
                    <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-xs sm:text-base">
                      {relatedBlog.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                      {relatedBlog.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back to Explore */}
        <div className="text-center">
          <Link 
            to="/explore"
            aria-label="Back to All Articles"
            className="inline-flex items-center text-[#7e973d] hover:text-[#6a7f35] font-semibold min-h-[44px] min-w-[44px] text-sm sm:text-base"
          >
            <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Articles
          </Link>
        </div>
      </div>
    </div>
  );
};
export default BlogPost;