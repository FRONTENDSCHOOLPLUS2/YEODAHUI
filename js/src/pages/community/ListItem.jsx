import { useNavigate } from "react-router-dom";

function ListItem() {
  const navigate = useNavigate();
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out">
      <td className="p-2 text-center">2</td>
      <td
        className="p-2 truncate indent-4 cursor-pointer"
        onClick={() => navigate(`/info/2`)}
      >
        안녕하세요.
      </td>
      <td className="p-2 text-center truncate">용쌤</td>
      <td className="p-2 text-center hidden sm:table-cell">29</td>
      <td className="p-2 text-center hidden sm:table-cell">2</td>
      <td className="p-2 truncate text-center hidden sm:table-cell">
        2024.07.05 13:39:23
      </td>
    </tr>
  );
}

export default ListItem;
