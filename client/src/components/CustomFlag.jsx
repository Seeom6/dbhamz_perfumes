import ReactCountryFlag from "react-country-flag";

 const CustomSingleValue = ({ data }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <ReactCountryFlag
        countryCode={data}
        svg
        className="w-[24px] h-[24px] mr-0.5 md:mr-2.5"
      />
    </div>
  );
};

export default CustomSingleValue