"use client";
import { useRouter } from "next/navigation";
import { DashboardStats } from "@/components/dashboard-stats";
import { RecentActivities } from "@/components/recent-activities";
import { SchoolFilters } from "@/components/school-filters";
import { StudentTable } from "@/components/student-table";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    router.push("/");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">School Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <DashboardStats />
        <RecentActivities />
      </div>
      <SchoolFilters />
      <StudentTable />
    </div>
  );
}
