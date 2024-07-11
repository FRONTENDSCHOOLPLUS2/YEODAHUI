import Submit from "@components/Submit";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Search() {
  const [queryParams, setQueryParams] = useSearchParams(location.search);
  const [value, setValue] = useState(queryParams.get("keyword") || "");

  const onSubmit = () => {
    queryParams.set("keyword", value);
    setQueryParams(queryParams);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <input
        className="dark:bg-gray-600 bg-gray-100 p-1 rounded"
        type="text"
        name="keyword"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Submit>검색</Submit>
    </form>
  );
}

export default Search;
