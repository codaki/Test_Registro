import { useState } from "react";
import { useNavigate } from "react-router-dom";
/* eslint-disable react/prop-types */
function Table({ columns, data, searchTerm, setSearchTerm, onEdit, onReport }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const navigate = useNavigate();

  const handleEdit = async (id) => {
    onEdit(id); // ✅ Llama a la función que obtiene los datos completos
  };
  const handleCalendar = (id) => {
    navigate(`/Calendario/${id}`); // Navigate to calendar with professor ID
  };
  const handleReport = (profesor) => {
    onReport(profesor);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (column) => {
    let direction = "asc";
    if (sortConfig.key === column && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: column, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const filteredData = sortedData.filter((profesor) =>
    `${profesor.nombres} ${profesor.apellidos} ${profesor.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 pl-4 bg-white dark:bg-gray-900 sticky top-0 z-10">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="overflow-y-auto max-h-[55rem] no-scrollbar">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0  z-10">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  onClick={() =>
                    handleSort(column.toLowerCase().replace(" ", "_"))
                  }
                >
                  {column}
                  {sortConfig.key === column.toLowerCase().replace(" ", "_") ? (
                    sortConfig.direction === "asc" ? (
                      <span> ▲</span>
                    ) : (
                      <span> ▼</span>
                    )
                  ) : null}
                </th>
              ))}
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Acción
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    {row[column.toLowerCase().replace(" ", "_")]}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleCalendar(row.profesor_id)}
                  >
                    Calendario
                  </button>
                  <button
                    className="text-blue-600 hover:text-blue-900 ml-4"
                    onClick={() => handleEdit(row.profesor_id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-yellow-600 hover:text-yellow-900 ml-4"
                    onClick={() => handleReport(row)}
                  >
                    Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
