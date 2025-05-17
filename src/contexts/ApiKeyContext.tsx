
import React, { createContext, useState, useContext, useEffect } from "react";
import { ApiKeys } from "../types";

interface ApiKeyContextType {
  apiKeys: ApiKeys;
  setApiKey: (keyType: keyof ApiKeys, value: string) => void;
  isConfigured: boolean;
}

const defaultApiKeys: ApiKeys = {
  openaiKey: "",
  linkedinKey: "",
};

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const ApiKeyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apiKeys, setApiKeys] = useState<ApiKeys>(defaultApiKeys);

  useEffect(() => {
    // Load API keys from localStorage on mount
    const savedOpenAiKey = localStorage.getItem("openai_api_key");
    const savedLinkedinKey = localStorage.getItem("linkedin_api_key");
    
    if (savedOpenAiKey || savedLinkedinKey) {
      setApiKeys({
        openaiKey: savedOpenAiKey || "",
        linkedinKey: savedLinkedinKey || "",
      });
    }
  }, []);

  const setApiKey = (keyType: keyof ApiKeys, value: string) => {
    setApiKeys(prev => {
      const updated = { ...prev, [keyType]: value };
      
      // Save to localStorage
      localStorage.setItem(`${keyType === "openaiKey" ? "openai" : "linkedin"}_api_key`, value);
      
      return updated;
    });
  };

  // Check if at least OpenAI key is configured
  const isConfigured = !!apiKeys.openaiKey;

  return (
    <ApiKeyContext.Provider value={{ apiKeys, setApiKey, isConfigured }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKeys = () => {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error("useApiKeys must be used within a ApiKeyProvider");
  }
  return context;
};
