
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import CandidateCard from "@/components/CandidateCard";
import { candidates } from "@/data/candidates";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Candidate, SearchQuery } from "@/types";
import { matchCandidates, parseQueryWithAI } from "@/lib/search";
import { useApiKeys } from "@/contexts/ApiKeyContext";
import { useToast } from "@/components/ui/use-toast";
import SettingsModal from "@/components/SettingsModal";

const Home = () => {
  const [searchResults, setSearchResults] = useState<Candidate[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [parsedQuery, setParsedQuery] = useState<SearchQuery | null>(null);
  const { apiKeys, isConfigured } = useApiKeys();
  const { toast } = useToast();
  
  const handleSearch = async (query: string) => {
    if (!isConfigured) {
      setShowSettings(true);
      return;
    }
    
    setIsSearching(true);
    setHasSearched(true);
    
    try {
      // Process query with AI
      const parsedSearchQuery = await parseQueryWithAI(query, apiKeys.openaiKey);
      setParsedQuery(parsedSearchQuery);
      
      // Match candidates based on parsed query
      const matchedCandidates = matchCandidates(candidates, parsedSearchQuery);
      setSearchResults(matchedCandidates);
      
      if (matchedCandidates.length === 0) {
        toast({
          title: "No matching candidates found",
          description: "Try a different search query or expanding your criteria.",
        });
      }
    } catch (error) {
      toast({
        title: "Search error",
        description: "There was an error processing your search. Please check your API key.",
        variant: "destructive",
      });
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        <div className="container py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient text-transparent bg-clip-text inline-block">
              Find the perfect AI talent
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Use natural language to search for professionals with specific skills, tools, and project experience
            </p>
          </div>
          
          <div className="mb-12">
            <SearchBar onSearch={handleSearch} isSearching={isSearching} />
          </div>
          
          {!isConfigured && !hasSearched && (
            <div className="text-center p-8 rounded-lg border-2 border-dashed border-muted-foreground/20 max-w-md mx-auto">
              <h2 className="font-medium text-lg mb-2">Set up API keys to get started</h2>
              <p className="text-muted-foreground mb-4">
                Configure your OpenAI API key to enable AI-powered talent matching
              </p>
              <Button onClick={() => setShowSettings(true)} className="gap-2">
                <Settings className="h-4 w-4" />
                Open Settings
              </Button>
            </div>
          )}
          
          {parsedQuery && (
            <div className="mb-8">
              <div className="bg-muted p-4 rounded-lg">
                <h2 className="text-lg font-medium mb-2">Search criteria understood:</h2>
                <div className="grid gap-2 grid-cols-1 md:grid-cols-3">
                  <div>
                    <span className="text-sm text-muted-foreground">Role:</span>
                    <p className="font-medium">{parsedQuery.role || "Any"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Skills:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {parsedQuery.skills.length > 0 ? (
                        parsedQuery.skills.map((skill, index) => (
                          <span key={index} className="text-sm font-medium bg-secondary px-2 py-0.5 rounded">
                            {skill}
                          </span>
                        ))
                      ) : (
                        <p className="text-sm">Any</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Job Type:</span>
                    <p className="font-medium">{parsedQuery.job_type || "Any"}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {hasSearched && searchResults.length > 0 && (
            <>
              <h2 className="text-2xl font-bold mb-6">
                {searchResults.length} matching candidate{searchResults.length !== 1 ? 's' : ''} found
              </h2>
              
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {searchResults.map((candidate) => (
                  <CandidateCard key={candidate.id} candidate={candidate} />
                ))}
              </div>
            </>
          )}
          
          {hasSearched && searchResults.length === 0 && !isSearching && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-2">No matching candidates found</h2>
              <p className="text-muted-foreground mb-6">
                Try a different search query or expanding your criteria
              </p>
              <Button onClick={() => setHasSearched(false)} variant="outline">
                Reset Search
              </Button>
            </div>
          )}
        </div>
      </main>
      
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
};

export default Home;
