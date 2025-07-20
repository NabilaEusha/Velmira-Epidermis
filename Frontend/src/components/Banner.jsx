import Slider from "react-slick";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { Link } from "react-router-dom";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    arrows: false,
    dotsClass: "slick-dots custom-dots",
  };

  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await userRequest.get("/banners");
        setBanners(res.data);
      } catch (error) {
        console.error("Failed to fetch banners", error);
      }
    };

    fetchBanners();
  }, []);

  if (banners.length === 0) {
    return (
      <div className="flex items-center justify-center h-[80vh] bg-gradient-to-r from-[#cedeb1] to-[#7e973d]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-4"></div>
          <p className="text-white text-xl font-semibold">
            Loading amazing content...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index}>
            <div
              className="relative bg-no-repeat bg-cover bg-center h-[60vh] md:h-[80vh] flex items-center"
              style={{ backgroundImage: `url(${banner.img})` }}
            >
              {/* Enhanced Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>

              {/* Decorative Elements */}
              <div className="absolute top-10 right-10 w-32 h-32 border-4 border-white/20 rounded-full animate-pulse"></div>
              <div className="absolute bottom-20 right-32 w-16 h-16 bg-[#7e973d]/30 rounded-full animate-bounce"></div>

              {/* Content Container */}
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 w-full">
                <div className="max-w-2xl">
                  {/* Title */}
                  <h2
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-6 leading-snug animate-fade-in-up animation-delay-200"
                    style={{ fontFamily: "var(--font-italiana)" }}
                  >
                    {banner.title}
                  </h2>

                  {/* Subtitle */}
                  <p
                    className="text-base sm:text-lg md:text-2xl text-gray-100 mb-8 leading-relaxed animate-fade-in-up animation-delay-400"
                    style={{ fontFamily: "var(--font-italiana)" }}
                  >
                    {banner.subtitle}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-600">
                    <Link to="/products">
                      <button aria-label="Shop Now" className="group bg-gradient-to-r from-[#2d310e] to-[#3a3f12] hover:from-[#3a3f12] hover:to-[#2d310e] px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center min-w-[140px] sm:min-w-[200px]">
                        <span>Shop Now</span>
                        <svg
                          className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </button>
                    </Link>

                    <Link to="/about">
                      <button aria-label="Contact Us" className="group bg-gradient-to-r from-[#7e973d] to-[#8fa344] hover:from-[#8fa344] hover:to-[#7e973d] px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center min-w-[140px] sm:min-w-[200px]">
                        <svg
                          className="mr-2 w-5 h-5 transform group-hover:scale-110 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <span>Contact Us</span>
                      </button>
                    </Link>
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex flex-wrap items-center mt-8 space-x-4 sm:space-x-6 text-white/80 animate-fade-in-up animation-delay-800">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-[#7e973d]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm font-medium">
                        Premium Quality
                      </span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-[#7e973d]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-medium">Trusted Brand</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-[#7e973d]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm font-medium">
                        Customer Loved
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
