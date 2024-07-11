import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Pagination({ totalPage }) {
  const [queryParams, setQueryParams] = useSearchParams(location.search);
  const [activePage, setActivePage] = useState(queryParams.page || 1);
  const onClick = (index) => {
    setActivePage(index);
    queryParams.set("page", index);
    setQueryParams(queryParams);
  };

  return (
    <div>
      <ul className="flex justify-center gap-3 m-4">
        {[...Array(totalPage)].map((p, index) => (
          <li
            key={`page${index}`}
            className={
              activePage === index + 1 ? "text-bold text-blue-700" : ""
            }
          >
            <span className="cursor-pointer" onClick={() => onClick(index + 1)}>
              {index + 1}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
