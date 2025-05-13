import { Typewriter } from "react-simple-typewriter";

const Announcement = () => {
  return (
<div className="flex items-center justify-center bg-[#7c3469] text-white text-[18px] font-semibold h-[30px]">

      <Typewriter
        words={["Velmira", "Everything", "on", "Discout", "20% off"]}
        loop={5}
        cursor
        cursorStyle="_"
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1000}
      />
    </div>
  );
};

export default Announcement;