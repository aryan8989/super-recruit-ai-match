
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useApiKeys } from "@/contexts/ApiKeyContext";

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const { apiKeys, setApiKey } = useApiKeys();
  
  const [openaiKeyInput, setOpenaiKeyInput] = useState(apiKeys.openaiKey);
  const [linkedinKeyInput, setLinkedinKeyInput] = useState(apiKeys.linkedinKey);
  
  const handleSave = () => {
    setApiKey("openaiKey", openaiKeyInput);
    setApiKey("linkedinKey", linkedinKeyInput);
    onClose();
  };
  
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>API Configuration</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="openai-api-key">
              OpenAI API Key <span className="text-red-500">*</span>
            </Label>
            <Input
              id="openai-api-key"
              type="password"
              value={openaiKeyInput}
              onChange={(e) => setOpenaiKeyInput(e.target.value)}
              placeholder="sk-..."
              className="col-span-3"
            />
            <p className="text-xs text-muted-foreground">
              Required for AI search processing. Get your key from{" "}
              <a 
                href="https://platform.openai.com/api-keys" 
                target="_blank" 
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                OpenAI Dashboard
              </a>.
            </p>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="linkedin-api-key">LinkedIn API Key (Optional)</Label>
            <Input
              id="linkedin-api-key"
              type="password"
              value={linkedinKeyInput}
              onChange={(e) => setLinkedinKeyInput(e.target.value)}
              placeholder="Optional: For candidate verification"
              className="col-span-3"
            />
            <p className="text-xs text-muted-foreground">
              Used for additional candidate verification.
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Settings</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
