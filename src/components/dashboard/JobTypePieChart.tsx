
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { candidates } from "@/data/candidates";

const JobTypePieChart = () => {
  // Count job types
  const jobTypeCount: Record<string, number> = {};
  candidates.forEach(candidate => {
    const jobType = candidate.job_type;
    jobTypeCount[jobType] = (jobTypeCount[jobType] || 0) + 1;
  });
  
  // Prepare data for chart
  const data = Object.entries(jobTypeCount).map(([name, value]) => ({ name, value }));
  
  // Colors for different job types
  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Job Type Distribution</CardTitle>
        <CardDescription>Breakdown by employment type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} candidates`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobTypePieChart;
