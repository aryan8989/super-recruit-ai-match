
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mic, Search, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useApiKeys } from "@/contexts/ApiKeyContext";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

// Fix TypeScript errors with proper type declaration
interface SpeechRecognitionEvent extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

// Define SpeechRecognition interface
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: Event) => void;
  onend: (event: Event) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isSearching }) => {
  const [query, setQuery] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();
  const { isConfigured } = useApiKeys();
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Fix TypeScript errors with proper type checking
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognitionConstructor = (window as any).SpeechRecognition || 
                                           (window as any).webkitSpeechRecognition;
      
      recognitionRef.current = new SpeechRecognitionConstructor() as SpeechRecognition;
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";
      
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsRecording(false);
      };
      
      recognitionRef.current.onerror = () => {
        toast({
          title: "Voice recognition error",
          description: "Could not process voice input. Please try again or type your search.",
          variant: "destructive",
        });
        setIsRecording(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [toast]);
  
  const handleVoiceSearch = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Voice recognition not supported",
        description: "Your browser does not support voice recognition.",
        variant: "destructive",
      });
      return;
    }
    
    setIsRecording(true);
    recognitionRef.current.start();
    
    // Safety timeout
    setTimeout(() => {
      if (isRecording && recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }, 10000);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isSearching && isConfigured) {
      onSearch(query.trim());
    } else if (!isConfigured) {
      toast({
        title: "API Key Required",
        description: "Please configure your API key in settings first",
        variant: "destructive",
      });
    } else if (!query.trim()) {
      toast({
        title: "Empty Search",
        description: "Please enter a search query",
        variant: "destructive",
      });
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  
  const placeholderText = isConfigured 
    ? "e.g., 'Looking for a senior AI designer with Midjourney experience...'"
    : "Please configure API key in settings first";

  return (
    <form 
      onSubmit={handleSubmit}
      className="relative w-full max-w-3xl mx-auto"
    >
      <div className="relative flex items-center">
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholderText}
          className="pr-24 h-14 text-base bg-white/70 backdrop-blur-sm border-white/20 shadow-lg"
          disabled={!isConfigured || isSearching}
        />
        
        <div className="absolute right-1 flex space-x-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleVoiceSearch}
            disabled={!isConfigured || isSearching || isRecording}
            className={isRecording ? "text-primary animate-pulse" : ""}
          >
            <Mic className="h-4 w-4" />
          </Button>
          
          <Button
            type="submit"
            disabled={!query.trim() || !isConfigured || isSearching}
            className="gap-2"
          >
            {isSearching ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Search
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
