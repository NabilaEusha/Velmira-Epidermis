import { Link } from 'react-router-dom';

const Category = () => {
  const categories = [
    {
      name: "Serums",
      image: "/serum1.jpg",
      description: "Concentrated skincare solutions",
      link: "/products/serums"
    },
    {
      name: "Toners",
      image: "/lotion1.jpg", 
      description: "Balance and refresh your skin",
      link: "/products/toners"
    },
    {
      name: "Lotions",
      image: "/lotion.jpg",
      description: "Nourish and moisturize daily",
      link: "/products/lotions"
    },
    {
      name: "Sunscreen",
      image: "/foundation.jpg",
      description: "Protect your skin everyday",
      link: "/products/sunscreen"
    }
  ];

  return (
    <div className="py-16 px-6 bg-gradient-to-b from-gray-50 to-white">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: "var(--font-italiana)" }}>
          Shop by Category
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover our carefully curated collection of premium skincare products
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
        {categories.map((category, index) => (
          <Link to={category.link} key={index}>
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
              {/* Background Image */}
              <div 
                className="h-56 sm:h-64 md:h-72 lg:h-80 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${category.image})` }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-500"></div>
                
                {/* Decorative Pattern Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br from-[#7e973d]/30 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-[#cedeb1] transition-colors duration-300" 
                      style={{ fontFamily: "var(--font-italiana)" }}>
                    {category.name}
                  </h3>
                  <p className="text-gray-200 text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0">
                    {category.description}
                  </p>
                  
                  {/* Shop Now Button */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 transform translate-y-4 group-hover:translate-y-0">
                    <span aria-label={`Shop ${category.name}`} className="inline-flex items-center px-4 py-2 min-h-[44px] min-w-[44px] bg-[#7e973d] text-white text-xs sm:text-sm font-medium rounded-full hover:bg-[#6d7c35] transition-colors duration-300">
                      Shop Now
                      <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-[#7e973d] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <Link to="/products">
          <button aria-label="View All Products" className="bg-gradient-to-r from-[#2d310e] to-[#7e973d] hover:from-[#7e973d] hover:to-[#2d310e] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 min-h-[44px] min-w-[44px]">
            View All Products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Category;