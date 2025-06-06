import Slider from "react-slick";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";

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
  };

  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await userRequest.get("/banners"); // <-- Fetch all banners
        setBanners(res.data); // should be an array of banner objects
      } catch (error) {
        console.error("Failed to fetch banners", error);
      }
    };

    fetchBanners();
  }, []);

  if (banners.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Slider {...settings}>
      {banners.map((banner, index) => (
        <div key={index}>
          <div
            className="relative bg-no-repeat bg-cover h-[80vh] px-[200px]"
            style={{ backgroundImage: `url(${banner.img})` }}
          >
            <div className="absolute inset-0 bg-black opacity-30"></div>

            <div className="relative flex flex-col text-white w-[50%]">
              <span
                className="text-[40px] mt-25 font-semibold"
                style={{ fontFamily: "var(--font-italiana)" }}
              >
                {banner.title}
              </span>

              <h1
                className="text-3xl mt-3 font-gray-200"
                style={{ fontFamily: "var(--font-italiana)" }}
              >
                {banner.subtitle}
              </h1>
              <div className="flex items-center mt-[20px]">
                <button className="bg-[#2d310e] p-[10px] w-[200px] text-white cursor-pointer mr-9">
                  Shop Now
                </button>
                <button className="bg-[#7e973d] p-[10px] w-[200px] text-white cursor-pointer mr-9">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Banner;
