import { Plus, DownloadCloud } from "lucide-react";
import { SearchBar } from "../SearchBar";
import { EmptyState } from "../EmptyState";

// Utility function to export CSV
const exportToCSV = (alumni) => {
  const headers = ["Name", "Degree", "Occupation", "Status"];
  const rows = alumni.map((a) => [a.name, a.degree, a.occupation, "Alumni"]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

  const link = document.createElement("a");
  link.href = encodeURI(csvContent);
  link.download = "alumni_data.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const AlumniSection = ({
  alumni,
  searchTerm,
  onSearchChange,
  onAddAlumni,
  onView,
  onDelete,
}) => {
  const filteredAlumni = alumni.filter((person) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      person.name.toLowerCase().includes(searchLower) ||
      person.degree.toLowerCase().includes(searchLower) ||
      person.occupation.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800">Alumni Management</h2>

        {/* Search + Buttons row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
          {/* SearchBar */}
          <div className="w-full sm:w-2/3">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Search alumni by name, degree, or occupation..."
            />
          </div>

          {/* Buttons row */}
          <div className="flex items-center gap-2">
            {/* Add Alumni: + icon */}
            <button
              onClick={() => onAddAlumni()}
              aria-label="Add alumni"
              title="Add alumni"
              className="p-2 rounded-full bg-yellow-400 hover:bg-yellow-300 text-white shadow transition focus:outline-none focus:ring-2 focus:ring-yellow-200"
            >
              <Plus size={16} />
              <span className="sr-only">Add alumni</span>
            </button>
            {/* Export CSV: download icon + text */}
            <button
              onClick={() => exportToCSV(alumni)}
              aria-label="Export alumni CSV"
              title="Export alumni CSV"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white shadow transition focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <DownloadCloud size={16} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {filteredAlumni.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md">
          <EmptyState
            type={searchTerm ? "search" : "nodata"}
            onAddAlumni={onAddAlumni}
          />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Degree
                </th>
                <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Occupation
                </th>
                <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAlumni.map((alum) => (
                <tr key={alum.id}>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {alum.name}
                  </td>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
                    {alum.degree}
                  </td>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
                    {alum.occupation}
                  </td>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      onClick={() => onView(alum)}
                    >
                      View
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => onDelete(alum.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="sm:hidden text-xs text-gray-400 px-4 py-2">
            Swipe left/right to see more columns
          </div>
        </div>
      )}
    </div>
  );
};
