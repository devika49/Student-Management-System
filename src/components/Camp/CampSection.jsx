// src/components/CampSection.jsx
import { useState } from "react";
import { CampForm } from "../Camp/CampForm";
import { SearchBar } from "../SearchBar";
import { Plus, Edit, X, DownloadCloud } from "lucide-react";

export const CampSection = () => {
  const [camps, setCamps] = useState([
    {
      id: "1",
      type: "Medical",
      name: "Health Awareness Camp",
      resourcePerson: "Dr. Ramesh",
      location: "Mumbai",
      startDate: "2025-09-25",
      endDate: "2025-09-27",
      participants: 50,
      photos: [
        { url: "https://via.placeholder.com/150", name: "photo1" },
        { url: "https://via.placeholder.com/150", name: "photo2" },
      ],
      reports: [
        { url: "https://example.com/report1.pdf", name: "Report1.pdf" },
        { url: "https://example.com/report2.pdf", name: "Report2.pdf" },
      ],
      status: "Completed",
    },
    {
      id: "2",
      type: "Education",
      name: "Career Guidance Camp",
      resourcePerson: "Ms. Priya",
      location: "Delhi",
      startDate: "2025-10-01",
      endDate: "2025-10-03",
      participants: 30,
      photos: [
        { url: "https://via.placeholder.com/150", name: "photo1" },
        { url: "https://via.placeholder.com/150", name: "photo2" },
        { url: "https://via.placeholder.com/150", name: "photo3" },
      ],
      reports: [],
      status: "Planned",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCamp, setEditingCamp] = useState(null);

  // Open Add Camp modal
  const openAdd = () => {
    setEditingCamp(null);
    setModalOpen(true);
  };

  // Open Edit Camp modal
  const openEdit = (camp) => {
    setEditingCamp(camp);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setEditingCamp(null);
  };

  // Add new camp
  const addCamp = (campData) => {
    const newCamp = { id: Date.now().toString(), ...campData };
    setCamps((prev) => [...prev, newCamp]);
    closeModal();
  };

  // Update existing camp
  const updateCamp = (id, updatedData) => {
    setCamps((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedData } : c))
    );
    closeModal();
  };

  // Export CSV
  const exportCSV = () => {
    const headers = [
      "ID",
      "Type",
      "Name",
      "Resource Person",
      "Location",
      "Start",
      "End",
      "Participants",
      "Photos Count",
      "Reports Count",
      "Status",
    ];
    const rows = camps.map((c) => [
      c.id,
      c.type || "General",
      c.name,
      c.resourcePerson || "-",
      c.location || "-",
      c.startDate || "-",
      c.endDate || "-",
      c.participants || "-",
      (c.photos || []).length,
      (c.reports || []).length,
      c.status || "Planned",
    ]);

    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "camps.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter camps based on search term
  const filteredCamps = camps.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.type && c.type.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.resourcePerson &&
        c.resourcePerson.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header: Title + Search + Buttons */}
      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800">Camp Management</h2>

        {/* Search + Buttons row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
          {/* SearchBar */}
          <div className="w-full sm:w-2/3">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Search by name, type, or resource person..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Buttons row */}
          <div className="flex items-center gap-2">
            {/* Add Camp: + icon only */}
            <button
              onClick={openAdd}
              aria-label="Add Camp"
              title="Add Camp"
              className="p-2 rounded-full bg-yellow-400 hover:bg-yellow-300 text-white shadow transition focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <Plus size={16} />
              <span className="sr-only">Add Camp</span>
            </button>

            {/* Export CSV: download icon + text */}
            <button
              onClick={exportCSV}
              aria-label="Export camps CSV"
              title="Export camps CSV"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white shadow transition focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <DownloadCloud size={16} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Camps Table */}
      {filteredCamps.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                {[
                  "ID",
                  "Type",
                  "Name",
                  "Resource Person",
                  "Location",
                  "Start",
                  "End",
                  "Participants",
                  "Group Photos",
                  "Reports",
                  "Status",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCamps.map((camp) => (
                <tr key={camp.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
                    {camp.id}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    {camp.type || "General"}
                  </td>
                  <td className="px-4 py-2 font-medium">{camp.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {camp.resourcePerson || "-"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {camp.location || "-"}
                  </td>
                  <td className="px-4 py-2 text-sm">{camp.startDate || "-"}</td>
                  <td className="px-4 py-2 text-sm">{camp.endDate || "-"}</td>
                  <td className="px-4 py-2 text-sm">
                    {camp.participants || "-"}
                  </td>

                  {/* Group Photos */}
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-1">
                      {(camp.photos || []).map((p, i) => (
                        <img
                          key={i}
                          src={p.url}
                          alt={p.name}
                          className="h-10 w-14 object-cover rounded border"
                        />
                      ))}
                    </div>
                  </td>

                  {/* Reports */}
                  <td className="px-4 py-2">
                    <div className="flex flex-col gap-1">
                      {(camp.reports || []).map((r, i) => (
                        <a
                          key={i}
                          href={r.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 text-xs hover:underline"
                        >
                          {r.name}
                        </a>
                      ))}
                      {(camp.reports || []).length === 0 && (
                        <span className="text-gray-400">—</span>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-2 text-sm">
                    {camp.status || "Planned"}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-2">
                    <button
                      onClick={() => openEdit(camp)}
                      className="flex items-center gap-1 bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500 text-xs"
                    >
                      <Edit size={14} /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-gray-500 bg-white rounded-xl p-6 shadow-md">
          No camps found
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={closeModal}
            aria-hidden
          />
          <div className="relative bg-white w-full max-w-3xl rounded-lg shadow-lg overflow-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                {editingCamp ? "Edit Camp" : "Add Camp"}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 rounded hover:bg-gray-100"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4">
              <CampForm
                camp={editingCamp || undefined}
                onAdd={(data) => addCamp(data)}
                onUpdate={(id, data) => updateCamp(id, data)}
                onCancel={closeModal}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampSection;
