import React from "react";
import {
  Users,
  UserCheck,
  TrendingUp,
  Calendar,
  Award,
  BookOpen,
} from "lucide-react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const colorMap = {
  blue: { bg: "bg-blue-50", icon: "text-blue-600", fill: "bg-blue-600" },
  orange: {
    bg: "bg-orange-50",
    icon: "text-orange-600",
    fill: "bg-orange-500",
  },
  green: { bg: "bg-green-50", icon: "text-green-600", fill: "bg-green-600" },
  purple: {
    bg: "bg-purple-50",
    icon: "text-purple-600",
    fill: "bg-purple-600",
  },
  pink: { bg: "bg-pink-50", icon: "text-pink-600", fill: "bg-pink-500" },
  red: { bg: "bg-red-700", icon: "text-red-700", fill: "bg-red-700" },
  yellow: {
    bg: "bg-yellow-500",
    icon: "text-yellow-500",
    fill: "bg-yellow-500",
  },
};

export const Dashboard = ({
  totalStudents = 0,
  totalAlumni = 0,
  students = [],
  alumni = [],
}) => {
  const currentYear = new Date().getFullYear();
  const recentEnrollments = students.filter(
    (s) =>
      s.enrollmentDate &&
      new Date(s.enrollmentDate).getFullYear() === currentYear
  ).length;
  const schoolStudents = students.filter((s) => s.type === "school").length;
  const collegeStudents = students.filter((s) => s.type === "college").length;

  const stats = [
    {
      title: "Total Students",
      value: totalStudents,
      icon: Users,
      colorKey: "blue",
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Alumni Network",
      value: totalAlumni,
      icon: UserCheck,
      colorKey: "orange",
      change: "+8%",
      changeType: "positive",
    },
    {
      title: "New Enrollments",
      value: recentEnrollments,
      icon: TrendingUp,
      colorKey: "green",
      change: "+24%",
      changeType: "positive",
    },
    {
      title: "Active Programs",
      value: 12,
      icon: BookOpen,
      colorKey: "purple",
      change: "+2",
      changeType: "positive",
    },
  ];

  const recentActivities = [
    {
      type: "enrollment",
      name: "Emma Johnson",
      action: "enrolled in 11th Grade",
      time: "2 hours ago",
    },
    {
      type: "update",
      name: "Michael Chen",
      action: "updated contact information",
      time: "5 hours ago",
    },
    {
      type: "graduation",
      name: "Sarah Williams",
      action: "added to alumni network",
      time: "1 day ago",
    },
    {
      type: "enrollment",
      name: "David Rodriguez",
      action: "enrolled in MBA Program",
      time: "2 days ago",
    },
  ];

  const pct = (n) =>
    totalStudents ? Math.round((n / totalStudents) * 100) : 0;

  // Pie chart data
  const pieData = {
    labels: ["School Students", "College Students"],
    datasets: [
      {
        label: "Student Distribution",
        data: [schoolStudents, collegeStudents],
        backgroundColor: ["#EF4444", "#FACC15"], // Tailwind red-700 & yellow-500
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="space-y-7">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const c = colorMap[stat.colorKey] || colorMap.blue;
          return (
            <div
              key={stat.title}
              className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between h-full transition-shadow duration-200 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div
                    className={`${c.bg} p-3 rounded-lg inline-flex items-center justify-center`}
                  >
                    <Icon className={`${c.icon}`} size={22} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <h3 className="text-3xl font-extrabold text-gray-900 mt-1">
                      {stat.value}
                    </h3>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`inline-flex items-center text-sm font-semibold ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.changeType === "positive" ? "▲" : "▼"} {stat.change}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">vs last period</p>
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                {stat.title === "New Enrollments"
                  ? `${recentEnrollments} this year`
                  : ""}
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart for Student Distribution */}
        <div className="bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl transition-shadow h-80 flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Student Distribution
          </h3>
          <Pie data={pieData} options={pieOptions} />
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow h-full flex flex-col">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                Recent Activity
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Latest student & alumni actions
              </p>
            </div>
            <div>
              <button className="text-sm text-gray-600 px-2 py-1 rounded-md hover:bg-gray-50">
                View all
              </button>
            </div>
          </div>
          <div className="mt-5 flex-1 overflow-y-auto">
            <div className="space-y-4">
              {recentActivities.map((activity, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div
                    className={`p-2 rounded-full ${
                      activity.type === "enrollment"
                        ? "bg-blue-100"
                        : activity.type === "update"
                        ? "bg-yellow-100"
                        : "bg-green-100"
                    }`}
                  >
                    {activity.type === "enrollment" && (
                      <Users size={16} className="text-blue-600" />
                    )}
                    {activity.type === "update" && (
                      <Calendar size={16} className="text-yellow-600" />
                    )}
                    {activity.type === "graduation" && (
                      <Award size={16} className="text-green-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">
                      <span className="font-medium">{activity.name}</span>{" "}
                      <span className="text-gray-600">{activity.action}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
