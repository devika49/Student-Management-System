import React from "react";
import { Users, UserPlus } from "lucide-react";

export const EmptyState = ({ type, onAddStudent, onAddAlumni }) => {
  if (type === "search") {
    return (
      <div className="text-center py-12">
        <Users size={64} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-medium text-gray-500 mb-2">
          No matching records found
        </h3>
        <p className="text-gray-400">
          Try adjusting your search criteria or filters
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-16">
      <UserPlus size={80} className="mx-auto text-gray-300 mb-6" />
      <h3 className="text-2xl font-bold text-gray-500 mb-4">
        No records found
      </h3>
      <p className="text-gray-400 mb-8 max-w-md mx-auto">
        Get started by adding your first student or alumni record to the system.
      </p>

      <div className="flex justify-center space-x-4">
        {onAddStudent && (
          <button
            onClick={onAddStudent}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Add First Student
          </button>
        )}

        {onAddAlumni && (
          <button
            onClick={onAddAlumni}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Add First Alumni
          </button>
        )}
      </div>
    </div>
  );
};
