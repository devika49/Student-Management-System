import React from "react";
import {
  Home,
  Users,
  GraduationCap,
  UserCheck,
  Settings,
  BarChart3,
} from "lucide-react";
import logo from "../Assets/logo.png";

export const Sidebar = ({
  isOpen,
  onClose,
  activeSection,
  onSectionChange,
}) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "students", label: "Students", icon: Users },
    { id: "alumni", label: "Alumni", icon: UserCheck },
    { id: "camp", label: "Camps", icon: GraduationCap }, // Camp menu
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleItemClick = (id) => {
    onSectionChange(id);
    if (window.innerWidth < 1024) onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:h-screen flex flex-col`}
      >
        {/* Logo */}
        <div className="flex items-center p-6 border-b border-gray-200">
          <img
            src={logo}
            alt="NG Logo"
            className="ml-2 w-13 h-14 object-contain"
          />
          <h2 className="ml-3 text-l font-bold text-yellow-400">
            Leading India's Future Today
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="space-y-2">
            {menuItems.map(({ id, label, icon: Icon }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => handleItemClick(id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-700 border-r-4 border-blue-600"
                        : "text-gray-600 hover:bg-gray-200 hover:text-gray-700"
                    }
                  `}
                >
                  <Icon
                    size={20}
                    className={isActive ? "text-blue-600" : "text-yellow-400"}
                  />
                  <span className="font-medium">{label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Profile */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">AD</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Administrator</p>
              <p className="text-xs text-gray-500">admin@school.edu</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
