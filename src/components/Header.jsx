import { User } from "lucide-react";

export const Header = ({ username = "Administrator" }) => {
  return (
    <div className="bg-white shadow-sm w-full">
      <div className="flex items-center justify-between px-3 sm:px-6 lg:px-8 py-4">
        {/* Left side: Title */}
        <h1 className="text-xl font-bold text-red-600">
          Leading India's Future Today
        </h1>

        {/* Right side: User Profile */}
        <div className="flex flex-row space-x-2 bg-yellow-400 px-5 py-3 rounded-full shadow cursor-pointer hover:bg-yellow-300 transition ml-auto">
          <User size={22} className="text-white" />
          <span className="text-sm font-medium text-white">{username}</span>
        </div>
      </div>
    </div>
  );
};
