import React from "react";
import { Users, GraduationCap, UserCheck, School } from "lucide-react";

export const FilterTabs = ({ activeFilter, onFilterChange, counts }) => {
  const tabs = [
    { id: "all", label: "All", icon: Users, count: counts.all, color: "blue" },
    {
      id: "school",
      label: "School Students",
      icon: School,
      count: counts.school,
      color: "green",
    },
    {
      id: "college",
      label: "College Students",
      icon: GraduationCap,
      count: counts.college,
      color: "purple",
    },
    {
      id: "alumni",
      label: "Alumni",
      icon: UserCheck,
      count: counts.alumni,
      color: "orange",
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tabs.map(({ id, label, icon: Icon, count, color }) => (
        <button
          key={id}
          onClick={() => onFilterChange(id)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors
            ${
              activeFilter === id
                ? "bg-yellow-400 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-yellow-100 hover:text-yellow-700"
            }
          `}
        >
          {label}
          <span className="ml-2 text-xs font-semibold">{counts[id]}</span>
        </button>
      ))}
    </div>
  );
};
