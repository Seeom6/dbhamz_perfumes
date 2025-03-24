import ReactPaginate from "react-paginate";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
const Pagination = ({ data, itemsPerPage, currentPage, onPageChange }) => {
  const pageCount = Math.ceil(data.length / itemsPerPage);

  // Clamp currentPage to a valid range
  const clampedCurrentPage = Math.min(currentPage, pageCount - 1);

  return (
    <div className="w-full flex justify-center items-center">
      <ReactPaginate
previousLabel={
  <button className="flex outline-none border-0 items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-ford to-primary rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-x-0.5 active:translate-x-0">
    <FaChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
    <span>السابق</span>
  </button>
}
nextLabel={
  <button className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-secondary to-primary rounded-lg hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:translate-x-0.5 active:translate-x-0">
    <span>التالي</span>
    <FaChevronLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
  </button>
}
  pageCount={pageCount}
        onPageChange={onPageChange}
        forcePage={clampedCurrentPage} // Use clampedCurrentPage
        containerClassName={
          "flex justify-center shadow-btn px-5 py-4 rounded-lg bg-[#F9F9F9] space-x-2 mt-4"
        }
        pageClassName={"px-3 hidden py-1 text-primary border rounded"}
        activeClassName={"bg-blue-500 bg-primary text-white"}
        previousClassName={
          "px-2 py-1  flex justify-center items-center rounded"
        }
        nextClassName={
          "px-2 flex justify-center items-center py-1  rounded"
        }
        disabledClassName={"opacity-50 cursor-not-allowed"}
      />
    </div>
  );
};

export default Pagination;