import { Plus, DownloadCloud } from "lucide-react";
import { FilterTabs } from "../FilterTabs";
import { SearchBar } from "../SearchBar";
import { EmptyState } from "../EmptyState";

// Utility to export students to CSV
const exportStudentsToCSV = (students) => {
  const headers = ["Name", "Type", "Class", "Status"];
  const rows = students.map((s) => [s.name, s.type, s.class, "Student"]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

  const link = document.createElement("a");
  link.href = encodeURI(csvContent);
  link.download = "students_data.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const StudentsSection = ({
  students,
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange,
  onAddStudent,
  onEdit,
  onDelete,
  counts,
}) => {
  const filteredStudents = students.filter((student) => {
    // Apply filter
    let matchesFilter = true;
    if (filter !== "all") {
      matchesFilter = student.type === filter;
    }

    // Apply search filter
    let matchesSearch = true;
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      matchesSearch =
        student.name.toLowerCase().includes(searchLower) ||
        student.class.toLowerCase().includes(searchLower);
    }

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 pt-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Student Management
        </h2>

        <FilterTabs
          activeFilter={filter}
          onFilterChange={onFilterChange}
          counts={counts}
        />

        {/* Search + icon buttons row */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
          {/* SearchBar (left) */}
          <div className="w-full sm:w-2/3">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
              // if your SearchBar accepts className/placeholder props
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Search students by name or class..."
            />
          </div>

          {/* Icon-only buttons (right) */}
          <div className="flex items-center gap-2">
            {/* Add Student: + icon only */}
            <button
              onClick={() => onAddStudent()}
              aria-label="Add student"
              title="Add student"
              className="p-2 rounded-full bg-yellow-400 hover:bg-yellow-300 text-white shadow transition focus:outline-none focus:ring-2 focus:ring-yellow-200"
            >
              <Plus size={16} />
              <span className="sr-only">Add student</span>
            </button>

            {/* Export CSV: download icon only */}
            <button
              onClick={() => exportStudentsToCSV(students)}
              aria-label="Export students CSV"
              title="Export students CSV"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white shadow transition focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <DownloadCloud size={16} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md">
          <EmptyState
            type={searchTerm || filter !== "all" ? "search" : "nodata"}
            onAddStudent={onAddStudent}
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
                  Type
                </th>
                <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {student.name}
                  </td>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap capitalize">
                    {student.type}
                  </td>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
                    {student.class}
                  </td>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      onClick={() => onEdit(student)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => onDelete(student.id)}
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
