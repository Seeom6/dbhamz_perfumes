import { RotatingLines } from 'react-loader-spinner'

const Loading = ({elements , width= "96" , height="96" }) => {
  return (
    <div className={`w-full flex justify-center items-center  ${elements}`}>
      <RotatingLines
        visible={true}
        height = {height}
        width={width}
        strokeColor="#e4bd3a"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loading;
