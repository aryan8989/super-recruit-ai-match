
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import CandidateCard from "@/components/CandidateCard";
import { candidates } from "@/data/candidates";
import { Button } from "@/components/ui/button";
import { Settings, ChevronRight } from "lucide-react";
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

  // Example searches shown at the bottom of the page
  const exampleSearches = [
    "Looking for a senior generative AI video editor with experience using RunwayML or Deforum, open to freelance gigs.",
    "Need a mid-level designer who knows Midjourney well and can work remotely on contract",
    "Looking for a 3D animator with Blender experience"
  ];

  const handleExampleClick = (example: string) => {
    const searchElement = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (searchElement) {
      searchElement.value = example;
      searchElement.focus();
      // Also update the state
      const event = new Event('input', { bubbles: true });
      searchElement.dispatchEvent(event);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-600 to-indigo-500 animate-gradient-x">
      <Navbar />
      
      <main className="flex-1">
        <div className="container py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-white">
              AI-Powered Talent Search
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Find the perfect candidate using natural language search. Describe who you're
              looking for and let AI do the matching.
            </p>
          </div>
          
          <div className="mb-12">
            <SearchBar onSearch={handleSearch} isSearching={isSearching} />
          </div>
          
          {!isConfigured && !hasSearched && (
            <div className="text-center p-8 rounded-lg border border-white/20 backdrop-blur-sm bg-white/10 max-w-md mx-auto">
              <h2 className="font-medium text-lg mb-2 text-white">Set up API keys to get started</h2>
              <p className="text-white/80 mb-4">
                Configure your OpenAI API key to enable AI-powered talent matching
              </p>
              <Button onClick={() => setShowSettings(true)} className="gap-2 bg-white/20 hover:bg-white/30 text-white">
                <Settings className="h-4 w-4" />
                Open Settings
              </Button>
            </div>
          )}
          
          {parsedQuery && (
            <div className="mb-8">
              <div className="backdrop-blur-sm bg-white/20 p-4 rounded-lg border border-white/20">
                <h2 className="text-lg font-medium mb-2 text-white">Search criteria understood:</h2>
                <div className="grid gap-2 grid-cols-1 md:grid-cols-3">
                  <div>
                    <span className="text-sm text-white/70">Role:</span>
                    <p className="font-medium text-white">{parsedQuery.role || "Any"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-white/70">Skills:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {parsedQuery.skills.length > 0 ? (
                        parsedQuery.skills.map((skill, index) => (
                          <span key={index} className="text-sm font-medium bg-white/30 backdrop-blur-sm text-white px-2 py-0.5 rounded">
                            {skill}
                          </span>
                        ))
                      ) : (
                        <p className="text-sm text-white">Any</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-white/70">Job Type:</span>
                    <p className="font-medium text-white">{parsedQuery.job_type || "Any"}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {hasSearched && searchResults.length > 0 && (
            <>
              <h2 className="text-2xl font-bold mb-6 text-white">
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
              <h2 className="text-2xl font-bold mb-2 text-white">No matching candidates found</h2>
              <p className="text-white/80 mb-6">
                Try a different search query or expanding your criteria
              </p>
              <Button onClick={() => setHasSearched(false)} variant="outline" className="bg-white/20 hover:bg-white/30 text-white">
                Reset Search
              </Button>
            </div>
          )}

          {!hasSearched && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6 text-center text-white">Try example searches:</h2>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                {exampleSearches.map((example, index) => (
                  <div 
                    key={index}
                    className="cursor-pointer backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 p-6 rounded-lg transition-all"
                    onClick={() => handleExampleClick(example)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-white mb-1">Example search:</h3>
                        <p className="text-white/80">"{example}"</p>
                      </div>
                      <Button size="sm" variant="ghost" className="text-white">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
};

export default Home;
