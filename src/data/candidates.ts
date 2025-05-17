
import { Candidate } from "../types";

export const candidates: Candidate[] = [
  {
    id: "1",
    name: "Jane Doe",
    role: "AI Video Editor",
    skills: ["RunwayML", "After Effects", "Deforum"],
    location: "Remote",
    experience_years: 5,
    job_type: "Freelance",
    seniority: "Senior",
    availability: "Immediate",
    projects: [
      {
        title: "AI Short Film",
        description: "Created a 2-min narrative video using RunwayML Gen-2 and custom voiceover tools",
        tools_used: ["RunwayML", "Final Cut Pro", "ElevenLabs"],
        link: "https://example.com/ai-film"
      },
      {
        title: "Motion Graphics for YouTube Channel",
        description: "Animated intros using Deforum + After Effects for a tech influencer's YouTube series",
        tools_used: ["Deforum", "After Effects"],
        link: "https://example.com/motion-yt"
      }
    ]
  },
  {
    id: "2",
    name: "John Smith",
    role: "AI Motion Designer",
    skills: ["Deforum", "RunwayML", "Cinema 4D"],
    location: "New York, USA",
    experience_years: 4,
    job_type: "Contract",
    seniority: "Mid",
    availability: "2 weeks notice",
    projects: [
      {
        title: "AI-Generated Music Video",
        description: "Created stylized animated sequences using Deforum + After Effects for a hip-hop artist.",
        tools_used: ["Deforum", "After Effects", "Ableton"],
        link: "https://example.com/music-ai"
      }
    ]
  },
  {
    id: "3",
    name: "Alisha Verma",
    role: "Generative AI Artist",
    skills: ["Midjourney", "Photoshop", "Figma"],
    location: "Remote",
    experience_years: 3,
    job_type: "Freelance",
    seniority: "Junior",
    availability: "Immediate",
    projects: [
      {
        title: "Brand Campaign for Startup",
        description: "Designed 100+ generative images using Midjourney for a tech branding campaign.",
        tools_used: ["Midjourney", "Photoshop"],
        link: "https://example.com/branding-ai"
      }
    ]
  },
  {
    id: "4",
    name: "Michael Chen",
    role: "3D AI Designer",
    skills: ["Blender", "RunwayML", "Unity"],
    location: "San Francisco, USA",
    experience_years: 7,
    job_type: "Full-Time",
    seniority: "Senior",
    availability: "1 month notice",
    projects: [
      {
        title: "AI-Powered Virtual World",
        description: "Created a virtual environment with AI-generated textures and landscapes for a VR experience.",
        tools_used: ["Blender", "RunwayML", "Unity"],
        link: "https://example.com/ai-vr-world"
      },
      {
        title: "Product Visualization Tool",
        description: "Built a tool that generates 3D product visualizations from simple text prompts.",
        tools_used: ["Blender", "Python", "Stable Diffusion"],
        link: "https://example.com/product-viz"
      }
    ]
  },
  {
    id: "5",
    name: "Sarah Johnson",
    role: "AI UX Designer",
    skills: ["Figma", "Midjourney", "Framer"],
    location: "Remote",
    experience_years: 4,
    job_type: "Contract",
    seniority: "Mid",
    availability: "Immediate",
    projects: [
      {
        title: "AI-Assisted Design System",
        description: "Created a Figma plugin that generates UI components based on design system rules.",
        tools_used: ["Figma", "JavaScript", "OpenAI API"],
        link: "https://example.com/ai-design-system"
      }
    ]
  }
];
