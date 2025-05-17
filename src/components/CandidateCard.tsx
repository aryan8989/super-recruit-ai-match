
import React, { useState } from "react";
import { Candidate, Project } from "@/types";
import Badge from "./Badge";
import { Button } from "@/components/ui/button";
import { Link2, ChevronDown, ChevronUp, Info } from "lucide-react";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@/components/ui/hover-card";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  const [expanded, setExpanded] = useState(false);
  const { toast } = useToast();

  const handleContactCandidate = () => {
    toast({
      title: "Contact initiated",
      description: `A personalized AI-generated message has been sent to ${candidate.name}.`,
    });
  };

  const handleVerifyInfo = () => {
    toast({
      title: "Background verification",
      description: "AI is verifying candidate information and generating screening questions.",
    });
    
    // Simulate verification process
    setTimeout(() => {
      toast({
        title: "Verification complete",
        description: "Candidate information verified. Screening questions generated.",
      });
    }, 2000);
  };

  return (
    <div className="glass-card rounded-lg p-6 transition-all hover:shadow-lg backdrop-blur-lg bg-white/40 border border-white/30">
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
            className="gap-1"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Show less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Show all
              </>
            )}
          </Button>
        </div>
        
        <div className={`space-y-3 ${expanded ? "" : "max-h-32 overflow-hidden relative"}`}>
          {candidate.projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
          
          {!expanded && candidate.projects.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/90 to-transparent"></div>
          )}
        </div>
      </div>
      
      <div className="mt-5 pt-3 border-t flex justify-between items-center">
        <HoverCard>
          <HoverCardTrigger>
            <Button variant="ghost" size="sm" className="gap-1">
              <Info className="h-4 w-4" />
              Verify Info
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div>
              <h4 className="font-medium mb-1">AI-Powered Verification</h4>
              <p className="text-sm text-muted-foreground">
                Automatically verify candidate information and generate personalized screening questions.
              </p>
              <Button 
                size="sm" 
                variant="outline" 
                className="mt-2"
                onClick={handleVerifyInfo}
              >
                Run verification
              </Button>
            </div>
          </HoverCardContent>
        </HoverCard>
        
        <Button onClick={handleContactCandidate}>Contact Candidate</Button>
      </div>
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Card className="bg-white/70 border border-white/30">
      <CardContent className="p-4">
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
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="mt-2 w-full text-sm flex items-center justify-center gap-1"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show less" : "View project details"}
          {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </Button>
        
        {expanded && (
          <div className="mt-2 pt-2 border-t border-border/50 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-xs text-muted-foreground">Duration:</span>
                <p>3 months</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Role:</span>
                <p>Lead Creator</p>
              </div>
              <div className="col-span-2">
                <span className="text-xs text-muted-foreground">Outcomes:</span>
                <p>Increased client engagement by 45% and reduced production time by 30%</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
