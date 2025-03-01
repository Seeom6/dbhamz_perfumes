import ReactPaginate from "react-paginate";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
const Pagination = ({ data, itemsPerPage, currentPage, onPageChange }) => {
  const pageCount = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="w-full flex justify-center items-center">
      <ReactPaginate
        previousLabel={<FaAngleRight />}
        nextLabel={<FaAngleLeft />}
        pageCount={pageCount}
        onPageChange={onPageChange}
        forcePage={currentPage}
        containerClassName={
          "flex justify-center shadow-btn px-5 py-4 rounded-lg bg-[#F9F9F9] space-x-2 mt-4"
        }
        pageClassName={"px-3 py-1 text-primary  border rounded"}
        activeClassName={"bg-blue-500 bg-primary text-white"}
        previousClassName={
          "px-2 py-1 border flex justify-center items-center rounded"
        }
        nextClassName={
          "px-2 flex justify-center items-center py-1 border rounded"
        }
        disabledClassName={"opacity-50 cursor-not-allowed"}
      />
    </div>
  );
};

export default Pagination;
