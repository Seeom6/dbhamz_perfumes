import bigPerfume1 from "/assets/bigPerfume1.png";
import bigPerfume2 from "/assets/bigPerfume2.png";
import bigPerfume3 from "/assets/bigPerfume3.png";

const Perfumes = () => {
  return (
    <div className="w-full flex justify-center items-center px-4 gap-1 md:gap-4 h-36 sm:h-48 lg:h-[400px]">
      <div className="w-full h-[80%]">
        <img className="w-full rounded-md h-full object-fit" src={bigPerfume1} alt="" />
      </div>
      <div className="w-full h-full">
        <img className="w-full rounded-md h-full object-fit" src={bigPerfume2} alt="" />
      </div>
      <div className="w-full h-[80%]">
        <img className="w-full rounded-md h-full object-fit" src={bigPerfume3} alt="" />
      </div>
    </div>
  );
};

export default Perfumes;
