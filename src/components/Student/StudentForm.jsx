import React, { useState, useEffect } from 'react';

export const StudentForm = ({ student, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    class: '',
    type: 'school',
    contact: '',
    enrollmentDate: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        age: student.age.toString(),
        class: student.class,
        type: student.type,
        contact: student.contact,
        enrollmentDate: student.enrollmentDate.split('T')[0],
      });
    }
  }, [student]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age || parseInt(formData.age) < 1) newErrors.age = 'Valid age is required';
    if (!formData.class.trim()) newErrors.class = 'Class is required';
    if (!formData.contact.trim()) newErrors.contact = 'Contact is required';
    if (!formData.enrollmentDate) newErrors.enrollmentDate = 'Enrollment date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    onSubmit({
      name: formData.name.trim(),
      age: parseInt(formData.age),
      class: formData.class.trim(),
      type: formData.type,
      contact: formData.contact.trim(),
      status: 'current',
      enrollmentDate: formData.enrollmentDate,
    });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
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
            onChange={(e) => handleChange('name', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.name ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="Enter student's full name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age *
          </label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => handleChange('age', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.age ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="Enter age"
            min="1"
            max="100"
          />
          {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Class/Grade *
          </label>
          <input
            type="text"
            value={formData.class}
            onChange={(e) => handleChange('class', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.class ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="e.g., 10th Grade, BSc Computer Science"
          />
          {errors.class && <p className="text-red-500 text-xs mt-1">{errors.class}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Institution Type *
          </label>
          <select
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="school">School</option>
            <option value="college">College</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Number *
          </label>
          <input
            type="tel"
            value={formData.contact}
            onChange={(e) => handleChange('contact', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.contact ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="e.g., +1 (555) 123-4567"
          />
          {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enrollment Date *
          </label>
          <input
            type="date"
            value={formData.enrollmentDate}
            onChange={(e) => handleChange('enrollmentDate', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.enrollmentDate ? 'border-red-500' : 'border-gray-200'
            }`}
          />
          {errors.enrollmentDate && <p className="text-red-500 text-xs mt-1">{errors.enrollmentDate}</p>}
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
          className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-medium shadow-md hover:shadow-lg"
        >
          {student ? 'Update Student' : 'Add Student'}
        </button>
      </div>
    </form>
  );
};