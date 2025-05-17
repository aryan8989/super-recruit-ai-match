
import { Candidate, SearchQuery } from "../types";

export function matchCandidates(candidates: Candidate[], query: SearchQuery): Candidate[] {
  return candidates.map(candidate => {
    let score = 0;
    
    // Role match - case insensitive
    if (query.role && candidate.role.toLowerCase().includes(query.role.toLowerCase())) {
      score += 15;
    }
    
    // Skills match - case insensitive
    if (query.skills && query.skills.length > 0) {
      query.skills.forEach(skill => {
        if (candidate.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))) {
          score += 10;
        }
        
        // Check if skills are mentioned in project tools
        candidate.projects.forEach(project => {
          if (project.tools_used.some(tool => tool.toLowerCase().includes(skill.toLowerCase()))) {
            score += 10;
          }
          
          // Check if skills are mentioned in project descriptions
          if (project.description.toLowerCase().includes(skill.toLowerCase())) {
            score += 5;
          }
        });
      });
    }
    
    // Location match - case insensitive
    if (query.location && candidate.location.toLowerCase().includes(query.location.toLowerCase())) {
      score += 10;
    }
    
    // Job type match - case insensitive
    if (query.job_type && candidate.job_type.toLowerCase().includes(query.job_type.toLowerCase())) {
      score += 10;
    }
    
    // Seniority match - case insensitive
    if (query.seniority && candidate.seniority.toLowerCase().includes(query.seniority.toLowerCase())) {
      score += 5;
    }
    
    // Notes keywords match in projects
    if (query.notes) {
      const keywords = query.notes.toLowerCase().split(" ");
      candidate.projects.forEach(project => {
        keywords.forEach(keyword => {
          if (keyword.length > 3 && project.description.toLowerCase().includes(keyword)) {
            score += 2;
          }
        });
      });
    }
    
    return {
      ...candidate,
      match_score: score
    };
  }).filter(candidate => candidate.match_score > 0)
    .sort((a, b) => (b.match_score || 0) - (a.match_score || 0));
}

export async function parseQueryWithAI(query: string, apiKey: string): Promise<SearchQuery> {
  try {
    if (!apiKey) {
      throw new Error("API key is required");
    }
    
    const systemPrompt = `You are an AI recruiter assistant. Given a plain-English hiring request, extract structured data. Output JSON with: role, skills (as a list), location, job_type (full-time, part-time, freelance, contract), seniority, and notes. Prioritize keywords related to tools, methods, and project types.`;
    
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: query,
            },
          ],
          temperature: 0.1,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("OpenAI API error:", errorData);
        throw new Error(errorData.error?.message || "Failed to parse query");
      }

      const data = await response.json();
      console.log("OpenAI API response:", data);
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error("Invalid response from OpenAI API");
      }

      const parsedResponse = JSON.parse(data.choices[0].message.content);
      
      return {
        role: parsedResponse.role || "",
        skills: parsedResponse.skills || [],
        location: parsedResponse.location || "",
        job_type: parsedResponse.job_type || "",
        seniority: parsedResponse.seniority || "",
        notes: parsedResponse.notes || "",
      };
    } catch (apiError) {
      console.error("API call error:", apiError);
      throw apiError;
    }
  } catch (error) {
    console.error("Error parsing query with AI:", error);
    
    // Fallback parsing - more robust
    const fallbackQuery = {
      role: "",
      skills: [] as string[],
      location: "",
      job_type: "",
      seniority: "",
      notes: query, // Keep original query in notes for keyword matching
    };
    
    // Basic keyword extraction
    const queryLower = query.toLowerCase();
    
    // Extract role
    if (queryLower.includes("developer")) fallbackQuery.role = "Developer";
    else if (queryLower.includes("designer")) fallbackQuery.role = "Designer";
    else if (queryLower.includes("editor")) fallbackQuery.role = "Editor";
    else if (queryLower.includes("artist")) fallbackQuery.role = "Artist";
    
    // Extract skills - look for common AI tools
    const potentialSkills = ["midjourney", "runway", "runwayml", "deforum", "stable diffusion", "blender", "after effects", "photoshop", "figma", "ai", "3d", "video", "design"];
    fallbackQuery.skills = potentialSkills.filter(skill => queryLower.includes(skill.toLowerCase()));
    
    // Extract location
    if (queryLower.includes("remote")) fallbackQuery.location = "Remote";
    
    // Extract job type
    if (queryLower.includes("freelance")) fallbackQuery.job_type = "Freelance";
    else if (queryLower.includes("contract")) fallbackQuery.job_type = "Contract";
    else if (queryLower.includes("full-time") || queryLower.includes("full time")) fallbackQuery.job_type = "Full-Time";
    else if (queryLower.includes("part-time") || queryLower.includes("part time")) fallbackQuery.job_type = "Part-Time";
    
    // Extract seniority
    if (queryLower.includes("senior")) fallbackQuery.seniority = "Senior";
    else if (queryLower.includes("junior")) fallbackQuery.seniority = "Junior";
    else if (queryLower.includes("mid")) fallbackQuery.seniority = "Mid";
    
    return fallbackQuery;
  }
}
