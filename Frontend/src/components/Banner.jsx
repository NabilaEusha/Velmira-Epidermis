import Slider from "react-slick";

const Banner = () => {
  const images = [
    "/banner2.jpg",
    "/beautybanner.jpg",
    "/banner2.jpg",
    "/beautybanner2.jpg",
    "/beautybanner4.jpg",
    "/beautybanner3.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800, // how fast the transition happens
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // change every 1.5 seconds
    pauseOnHover: false, // keep going even if hovered
    arrows: false,
  };

  return (
    <Slider {...settings}>
      {images.map((img, index) => (
        <div key={index}>
          <div
            className="relative bg-no-repeat bg-cover h-[80vh] px-[200px]"
            style={{ backgroundImage: `url(${img})` }}
          >
            <div className="absolute inset-0 bg-black opacity-30"></div>

            <div className="relative flex flex-col text-white w-[50%]">
              <span
                className="text-[40px] mt-25 font-semibold"
                style={{ fontFamily: "var(--font-italiana)" }}
              >
                A Personalized Approach to Skincare for Radiant Skin.
              </span>

              <h1
                className="text-3xl mt-3 font-gray-200"
                style={{ fontFamily: "var(--font-italiana)" }}
              >
                Glow with Confidence
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
