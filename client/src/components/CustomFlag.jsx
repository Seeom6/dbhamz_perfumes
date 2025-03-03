import ReactCountryFlag from "react-country-flag";

 const CustomSingleValue = ({ data }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <ReactCountryFlag
        countryCode={data}
        svg
        className=" mr-0.5 md:mr-2.5"
       style={{width: "15px" , height: "15px"}}
      />
    </div>
  );
};

export default CustomSingleValue