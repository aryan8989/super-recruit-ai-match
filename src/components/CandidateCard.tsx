
import React, { useState } from "react";
import { Candidate, Project } from "@/types";
import Badge from "./Badge";
import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";

interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="glass-card rounded-lg p-6 transition-all hover:shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-xl">{candidate.name}</h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <Badge label={candidate.role} variant="role" />
            <Badge label={candidate.seniority} variant="seniority" />
            <Badge label={candidate.job_type} variant="job-type" />
          </div>
        </div>
        
        {candidate.match_score !== undefined && (
          <div className="bg-gradient text-white rounded-full h-10 w-10 flex items-center justify-center font-bold">
            {candidate.match_score}
          </div>
        )}
      </div>
      
      <div className="mt-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm text-muted-foreground">Skills:</span>
          <div className="flex flex-wrap gap-1.5">
            {candidate.skills.map((skill, index) => (
              <Badge key={index} label={skill} variant="skill" />
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm text-muted-foreground">Location:</span>
          <Badge label={candidate.location} variant="location" />
        </div>
        
        <div className="mt-1">
          <span className="text-sm text-muted-foreground">Availability:</span>
          <span className="text-sm ml-2">{candidate.availability}</span>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium">Projects ({candidate.projects.length})</h4>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show less" : "Show all"}
          </Button>
        </div>
        
        <div className={`space-y-3 ${expanded ? "" : "max-h-32 overflow-hidden relative"}`}>
          {candidate.projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
          
          {!expanded && candidate.projects.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent"></div>
          )}
        </div>
      </div>
      
      <div className="mt-5 pt-3 border-t flex justify-end">
        <Button>Contact Candidate</Button>
      </div>
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="bg-secondary/50 rounded-md p-3">
      <div className="flex justify-between items-start">
        <h5 className="font-medium">{project.title}</h5>
        <a 
          href={project.link} 
          target="_blank" 
          rel="noreferrer"
          className="text-primary hover:text-primary/80"
        >
          <Link2 className="h-4 w-4" />
        </a>
      </div>
      <p className="text-sm mt-1 text-muted-foreground">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mt-2">
        {project.tools_used.map((tool, index) => (
          <Badge key={index} label={tool} variant="tool" size="sm" />
        ))}
      </div>
    </div>
  );
};

export default CandidateCard;
