
import React from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SkillsChart from "@/components/dashboard/SkillsChart";
import JobTypePieChart from "@/components/dashboard/JobTypePieChart";
import SenioritySummary from "@/components/dashboard/SenioritySummary";
import { candidates } from "@/data/candidates";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Talent Pool Insights</h1>
          <p className="text-muted-foreground">Analytics and trends for your candidate pipeline</p>
        </div>
        
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Candidates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{candidates.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Available Immediately</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {candidates.filter(c => c.availability.toLowerCase().includes("immediate")).length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {candidates.reduce((sum, candidate) => sum + candidate.projects.length, 0)}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <SkillsChart />
          
          <div className="grid gap-6 grid-cols-1">
            <JobTypePieChart />
            <SenioritySummary />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
