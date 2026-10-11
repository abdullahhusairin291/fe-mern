import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const Pagination = () => {
  const { pagination } = useLoaderData();
  const { page, totalPage } = pagination;
  const { search, pathname } = useLocation();
  const navigation = useNavigate();

  const handlePageChange = (number) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", number);
    navigation(`${pathname}?${searchParams.toString()}`);
  };

  const pages = Array.from({ length: totalPage }, (_, index) => {
    return index + 1;
  });

  return (
    <div className="join flex mt-5 justify-center">
      {pages.map((pageNumber) => {
        return (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`join-item btn text-white border-none ${pageNumber === page ? "bg-primary" : "bg-gray-300"}`}
          >
            {pageNumber}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
