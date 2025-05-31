import { FaPlus } from "react-icons/fa";

const Banners = () => {
  return (
    <div className="flex justify-evenly m-[10%]">
      {/* LEFT */}
      <div className="mr-[50px]">
        <h2 className="text-xl font-semibold mb-4">Active Banners</h2>

        {/* Banner Item */}
        <div className="flex flex-col space-y-4 mt-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <img
              src="https://images.pexels.com/photos/4792671/pexels-photo-4792671.jpeg"
              alt=""
              className="w-32 h-32 object-cover rounded-md"
            />

            <div className="flex-1 ml-4 mr-6">
              {" "}
              {/* Added mr-6 here */}
              <h3 className="text-xl font-semibold mb-2">
                Radiate Beauty, Inside and out
              </h3>
              <p className="text-gray-600 mb-2">
                Discover your perfect product for flawless look
              </p>
            </div>

            <button className="bg-red-500 p-2 text-white font-semibold cursor-pointer">
              Delete
            </button>
          </div>
        </div>

        {/* Another Banner Item */}
        <div className="flex flex-col space-y-4 mt-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <img
              src="https://images.pexels.com/photos/4792671/pexels-photo-4792671.jpeg"
              alt=""
              className="w-32 h-32 object-cover rounded-md"
            />

            <div className="flex-1 ml-4 mr-6">
              {" "}
              {/* Added mr-6 here */}
              <h3 className="text-xl font-semibold mb-2">
                Radiate Beauty, Inside and out
              </h3>
              <p className="text-gray-600 mb-2">
                Discover your perfect product for flawless look
              </p>
            </div>

            <button className="bg-red-500 p-2 text-white font-semibold cursor-pointer">
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col">
        <div className="flex-1 bg-white p-5">
          <div className="flex flex-col space-y-4">
            {/* Image Upload */}
            <div className="flex flex-col">
              <span className="font-semibold mb-1">Image:</span>
              <div className="border-2 h-[100px] w-[100px] border-[#444] rounded-md border-solid flex items-center justify-center">
                <label htmlFor="" className="cursor-pointer">
                  <FaPlus className="text-[20px]" />
                </label>
              </div>
            </div>

            {/* Title Input */}
            <div className="flex flex-col">
              <span className="font-semibold mb-1">Title:</span>
              <input
                type="text"
                className="w-[250px] outline-none border-b-2 border-[#444] border-solid"
              />
            </div>

            {/* Subtitle Input */}
            <div className="flex flex-col">
              <span className="font-semibold mb-1">Subtitle:</span>
              <input
                type="text"
                className="w-[250px] outline-none border-b-2 border-[#444] border-solid"
              />
            </div>

            {/* Upload Button */}
            <button className="bg-[#1e1e1e] p-2 text-white font-semibold cursor-pointer">
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banners;
