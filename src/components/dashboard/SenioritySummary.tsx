
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { candidates } from "@/data/candidates";

const SenioritySummary = () => {
  // Count candidates by seniority level
  const seniorityCounts: Record<string, number> = {};
  candidates.forEach(candidate => {
    const level = candidate.seniority;
    seniorityCounts[level] = (seniorityCounts[level] || 0) + 1;
  });
  
  // Create summary data
  const summaryData = [
    { level: "Junior", count: seniorityCounts["Junior"] || 0, color: "bg-amber-500" },
    { level: "Mid", count: seniorityCounts["Mid"] || 0, color: "bg-blue-500" },
    { level: "Senior", count: seniorityCounts["Senior"] || 0, color: "bg-purple-500" },
    { level: "Lead", count: seniorityCounts["Lead"] || 0, color: "bg-green-500" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seniority Levels</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {summaryData.map(item => (
            <div key={item.level} className="flex items-center">
              <div className="w-20 text-sm">{item.level}</div>
              <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full ${item.color}`} 
                  style={{ 
                    width: `${(item.count / candidates.length) * 100}%`,
                    minWidth: item.count ? "2rem" : "0"
                  }}
                ></div>
              </div>
              <div className="w-12 text-right text-sm">{item.count}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SenioritySummary;
