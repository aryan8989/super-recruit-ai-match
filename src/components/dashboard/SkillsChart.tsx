
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { candidates } from "@/data/candidates";

const SkillsChart = () => {
  // Process candidates data to extract skills and count occurrences
  const skillsCount: Record<string, number> = {};
  
  candidates.forEach(candidate => {
    candidate.skills.forEach(skill => {
      skillsCount[skill] = (skillsCount[skill] || 0) + 1;
    });
  });
  
  // Transform into chart data
  const chartData = Object.entries(skillsCount)
    .map(([skill, count]) => ({ skill, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Top Skills</CardTitle>
        <CardDescription>Distribution of skills across talent pool</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="skill" 
                angle={-45}
                textAnchor="end"
                height={60}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} candidates`, 'Count']}
                labelFormatter={(label) => `Skill: ${label}`}
              />
              <Bar dataKey="count" fill="#8884d8" className="fill-primary" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsChart;
