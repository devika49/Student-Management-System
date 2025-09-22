// src/components/CampForm.jsx
import { useEffect, useState } from "react";

/**
 * Props:
 * - camp (optional) : existing camp object for edit
 * - onAdd(campData) : called for new camp
 * - onUpdate(id, campData) : called to update existing camp
 * - onCancel() : optional, called to cancel/close form
 */
export const CampForm = ({ camp, onAdd, onUpdate, onCancel }) => {
  const [form, setForm] = useState({
    type: "",
    name: "",
    resourcePerson: "",
    location: "",
    startDate: "",
    endDate: "",
    participants: "",
    description: "",
    photos: [], // { name, url }
    reports: [], // { name, url }
  });

  // On mount / when editing, prefill
  useEffect(() => {
    if (camp) {
      setForm({
        type: camp.type || "",
        name: camp.name || "",
        resourcePerson: camp.resourcePerson || "",
        location: camp.location || "",
        startDate: camp.startDate || "",
        endDate: camp.endDate || "",
        participants: camp.participants || "",
        description: camp.description || "",
        photos: camp.photos || [],
        reports: camp.reports || [],
      });
    }
  }, [camp]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // handle image files (multiple)
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const newPhotos = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setForm((f) => ({ ...f, photos: [...(f.photos || []), ...newPhotos] }));
    // clear input value to allow re-upload same file if needed
    e.target.value = null;
  };

  // handle PDF reports
  const handleReportUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const newReports = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setForm((f) => ({ ...f, reports: [...(f.reports || []), ...newReports] }));
    e.target.value = null;
  };

  // remove a photo by index
  const removePhoto = (index) => {
    setForm((f) => ({ ...f, photos: f.photos.filter((_, i) => i !== index) }));
  };

  // remove report
  const removeReport = (index) => {
    setForm((f) => ({
      ...f,
      reports: f.reports.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.type || !form.name) {
      alert("Please enter camp type and camp name.");
      return;
    }

    const payload = {
      type: form.type,
      name: form.name,
      resourcePerson: form.resourcePerson,
      location: form.location,
      startDate: form.startDate,
      endDate: form.endDate,
      participants: form.participants,
      description: form.description,
      photos: form.photos,
      reports: form.reports,
      status: camp?.status || "Planned",
    };

    if (camp && camp.id && onUpdate) {
      onUpdate(camp.id, payload);
    } else if (onAdd) {
      onAdd(payload);
    }

    // If onCancel present (e.g. to close modal), call it
    if (onCancel) onCancel();

    // reset only when adding new (avoid clearing when editing)
    if (!camp) {
      setForm({
        type: "",
        name: "",
        resourcePerson: "",
        location: "",
        startDate: "",
        endDate: "",
        participants: "",
        description: "",
        photos: [],
        reports: [],
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 rounded bg-white">
      <h3 className="text-lg font-semibold">
        {camp ? "Edit Camp" : "Add New Camp"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Camp Type</option>
          <option value="Summer Camp">Summer Camp</option>
          <option value="InnerChild Camp">InnerChild Camp</option>
          <option value="Motivational Camp">Motivational Camp</option>
          <option value="Training">Training</option>
          <option value="Outreach">Outreach</option>
          <option value="Workshop">Workshop</option>
          <option value="Other">Other</option>
        </select>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Camp name"
          className="border p-2 rounded"
        />

        <input
          name="resourcePerson"
          value={form.resourcePerson}
          onChange={handleChange}
          placeholder="Resource person (name)"
          className="border p-2 rounded md:col-span-2"
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="border p-2 rounded"
        />

        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="participants"
          value={form.participants}
          onChange={handleChange}
          placeholder="Participants"
          className="border p-2 rounded"
        />
      </div>

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="border p-2 rounded w-full"
      />

      {/* File uploads */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Camp Photos</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoUpload}
            className="block"
          />
          {form.photos && form.photos.length > 0 && (
            <table className="w-full mt-2 text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-1 border">Preview</th>
                  <th className="p-1 border">Filename</th>
                  <th className="p-1 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {form.photos.map((p, i) => (
                  <tr key={i} className="text-center">
                    <td className="p-1 border">
                      <img
                        src={p.url}
                        alt={p.name}
                        className="h-16 mx-auto object-cover rounded"
                      />
                    </td>
                    <td className="p-1 border">{p.name}</td>
                    <td className="p-1 border">
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        className="text-red-600 underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Camp Reports (PDF)
          </label>
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleReportUpload}
          />
          {form.reports && form.reports.length > 0 && (
            <table className="w-full mt-2 text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-1 border">Filename</th>
                  <th className="p-1 border">Preview</th>
                  <th className="p-1 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {form.reports.map((r, i) => (
                  <tr key={i} className="text-center">
                    <td className="p-1 border">{r.name}</td>
                    <td className="p-1 border">
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                      >
                        Open PDF
                      </a>
                    </td>
                    <td className="p-1 border">
                      <button
                        type="button"
                        onClick={() => removeReport(i)}
                        className="text-red-600 underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 mt-3">
        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 text-white rounded"
        >
          {camp ? "Save Changes" : "Add Camp"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
