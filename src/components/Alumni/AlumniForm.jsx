import React, { useState, useEffect } from "react";

export const AlumniForm = ({ alumni, onSubmit, onCancel }) => {
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({
    name: "",
    passedYear: currentYear.toString(),
    degree: "",
    occupation: "",
    type: "school",
    contact: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (alumni) {
      setFormData({
        name: alumni.name,
        passedYear: alumni.passedYear.toString(),
        degree: alumni.degree,
        occupation: alumni.occupation,
        type: alumni.type,
        contact: alumni.contact,
      });
    }
  }, [alumni]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (
      !formData.passedYear ||
      parseInt(formData.passedYear) < 1950 ||
      parseInt(formData.passedYear) > currentYear
    ) {
      newErrors.passedYear = `Valid year between 1950 and ${currentYear} is required`;
    }
    if (!formData.degree.trim()) newErrors.degree = "Degree is required";
    if (!formData.occupation.trim())
      newErrors.occupation = "Occupation is required";
    if (!formData.contact.trim()) newErrors.contact = "Contact is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit({
      name: formData.name.trim(),
      passedYear: parseInt(formData.passedYear),
      degree: formData.degree.trim(),
      occupation: formData.occupation.trim(),
      type: formData.type,
      contact: formData.contact.trim(),
      status: "alumni",
    });
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors ${
              errors.name ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="Enter alumni's full name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Graduation Year *
          </label>
          <input
            type="number"
            value={formData.passedYear}
            onChange={(e) => handleChange("passedYear", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors ${
              errors.passedYear ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="Enter graduation year"
            min="1950"
            max={currentYear}
          />
          {errors.passedYear && (
            <p className="text-red-500 text-xs mt-1">{errors.passedYear}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Degree/Qualification *
          </label>
          <input
            type="text"
            value={formData.degree}
            onChange={(e) => handleChange("degree", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors ${
              errors.degree ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="e.g., High School Diploma, BSc Computer Science"
          />
          {errors.degree && (
            <p className="text-red-500 text-xs mt-1">{errors.degree}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Institution Type *
          </label>
          <select
            value={formData.type}
            onChange={(e) => handleChange("type", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
          >
            <option value="school">School</option>
            <option value="college">College</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Occupation *
          </label>
          <input
            type="text"
            value={formData.occupation}
            onChange={(e) => handleChange("occupation", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors ${
              errors.occupation ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="e.g., Software Engineer, Doctor, Teacher"
          />
          {errors.occupation && (
            <p className="text-red-500 text-xs mt-1">{errors.occupation}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Number *
          </label>
          <input
            type="tel"
            value={formData.contact}
            onChange={(e) => handleChange("contact", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors ${
              errors.contact ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="e.g., +1 (555) 123-4567"
          />
          {errors.contact && (
            <p className="text-red-500 text-xs mt-1">{errors.contact}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-teal-600 text-white hover:bg-teal-700 rounded-lg transition-colors font-medium shadow-md hover:shadow-lg"
        >
          {alumni ? "Update Alumni" : "Add Alumni"}
        </button>
      </div>
    </form>
  );
};
