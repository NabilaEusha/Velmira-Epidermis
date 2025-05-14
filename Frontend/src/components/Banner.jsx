const Banner = () => {
  return (
    <div className="relative bg-[url('/beautybanner2.jpg')] bg-no-repeat bg-cover h-[80vh] px-[200px]">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative flex flex-col text-white w-[50%]">
        <span className="text-[30px] mt-25">A personalized Approach to Skincare for Radient Skin.</span><br></br>
        <h1 className="text-3xl mt-3">Glow with Confidence</h1>
        <div className="flex items-center mt-[20px]">
          <button className="bg-[#e48bcd] p-[10px] w-[200px] text-white cursor-pointer mr-9">Shop Now</button>
          <button className="bg-gray-500 p-[10px] w-[200px] text-white cursor-pointer mr-9">Contact Us</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
