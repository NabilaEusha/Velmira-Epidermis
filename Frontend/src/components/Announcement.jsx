import { Typewriter } from "react-simple-typewriter";

const Announcement = () => {
  return (
<div className="flex items-center justify-center bg-[#8e884a] text-white text-[18px] font-semibold h-[30px]">

      <Typewriter
        words={["Elevate Your Ritual", "Velmira is Now", "20% Off", "Sitewide"]}
        loop={10}
        cursor
        cursorStyle="_"
        typeSpeed={70}
        deleteSpeed={60}
        delaySpeed={2000}
      />
    </div>
  );
};

export default Announcement;