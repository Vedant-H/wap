import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { ChartContainer, ChartTooltip, ChartLegend } from "../components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Sample data
const users = [
  { name: "Alice", created: "2025-07-01", status: "Active", activity: 80 },
  { name: "Bob", created: "2025-06-15", status: "Inactive", activity: 20 },
  { name: "Charlie", created: "2025-05-20", status: "Active", activity: 60 },
  { name: "Diana", created: "2025-07-03", status: "Active", activity: 95 },
  { name: "Eve", created: "2025-06-28", status: "Inactive", activity: 10 },
];

const activityColors = ["#6366f1", "#a21caf", "#06b6d4", "#f59e42", "#ef4444"];
const statusColors = ["#22c55e", "#f87171"];

const statusCounts = users.reduce(
  (acc, u) => {
    acc[u.status] = (acc[u.status] || 0) + 1;
    return acc;
  },
  { Active: 0, Inactive: 0 }
);

const statusPieData = [
  { name: "Active", value: statusCounts.Active },
  { name: "Inactive", value: statusCounts.Inactive },
];

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col items-center py-12 px-2">
      <div className="w-full max-w-6xl">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-10 text-center tracking-tight drop-shadow-lg">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <Card className="bg-white border border-gray-200 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-gray-900 text-lg font-semibold">User Activity (Bar Chart)</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-72">
                <BarChart data={users} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="name" stroke="#a3a3a3" tick={{ fill: '#52525b', fontWeight: 600 }} />
                  <YAxis stroke="#a3a3a3" tick={{ fill: '#52525b', fontWeight: 600 }} />
                  <Bar dataKey="activity" radius={[8, 8, 0, 0]}>
                    {users.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={activityColors[index % activityColors.length]} />
                    ))}
                  </Bar>
                  <ChartTooltip />
                  <ChartLegend />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-gray-900 text-lg font-semibold">User Status (Pie Chart)</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-72">
                <PieChart>
                  <Pie
                    data={statusPieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={statusColors[index % statusColors.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                  <ChartLegend />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
        <Card className="bg-white border border-gray-200 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-gray-900 text-lg font-semibold">User Table</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-xl">
              <table className="min-w-full text-base text-gray-700">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3 text-left font-bold tracking-wide">Name</th>
                    <th className="px-6 py-3 text-left font-bold tracking-wide">Date Created</th>
                    <th className="px-6 py-3 text-left font-bold tracking-wide">Status</th>
                    <th className="px-6 py-3 text-left font-bold tracking-wide">Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={i} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="px-6 py-3 font-semibold">{u.name}</td>
                      <td className="px-6 py-3">{u.created}</td>
                      <td className="px-6 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold shadow ${u.status === 'Active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>{u.status}</span>
                      </td>
                      <td className="px-6 py-3">{u.activity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;
