
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
  },
  {
    id: "6",
    name: "Diego Martinez",
    role: "Generative AI Developer",
    skills: ["PyTorch", "TensorFlow", "DALL-E", "Stable Diffusion"],
    location: "Berlin, Germany",
    experience_years: 6,
    job_type: "Full-Time",
    seniority: "Senior",
    availability: "3 weeks notice",
    projects: [
      {
        title: "Custom Generative Model",
        description: "Built a specialized image generation model for architectural visualization using PyTorch and fine-tuning techniques.",
        tools_used: ["PyTorch", "CUDA", "Docker"],
        link: "https://example.com/gen-arch"
      },
      {
        title: "AI Content Creation Suite",
        description: "Developed a web application that allows users to generate and edit multimedia content through natural language prompts.",
        tools_used: ["React", "Flask", "CLIP", "Stable Diffusion"],
        link: "https://example.com/ai-content-suite"
      }
    ]
  },
  {
    id: "7",
    name: "Emma Wilson",
    role: "AI Video Production Specialist",
    skills: ["RunwayML", "After Effects", "Premiere Pro", "DaVinci Resolve"],
    location: "Los Angeles, USA",
    experience_years: 8,
    job_type: "Freelance",
    seniority: "Senior",
    availability: "Immediate",
    projects: [
      {
        title: "AI-Enhanced Documentary",
        description: "Used RunwayML to restore and enhance archival footage for an award-winning historical documentary.",
        tools_used: ["RunwayML", "DaVinci Resolve", "Premiere Pro"],
        link: "https://example.com/ai-documentary"
      },
      {
        title: "Virtual Production Pipeline",
        description: "Implemented an AI-driven virtual production workflow for a streaming series, reducing on-location filming needs.",
        tools_used: ["Unreal Engine", "RunwayML", "Adobe CC"],
        link: "https://example.com/virtual-production"
      }
    ]
  },
  {
    id: "8",
    name: "Akira Tanaka",
    role: "3D Animation Director",
    skills: ["Blender", "Stable Diffusion", "Character Animation", "Houdini"],
    location: "Tokyo, Japan",
    experience_years: 10,
    job_type: "Contract",
    seniority: "Lead",
    availability: "2 months notice",
    projects: [
      {
        title: "AI-Generated Anime Series",
        description: "Directed a short anime series where backgrounds and effects were generated using Stable Diffusion with custom models.",
        tools_used: ["Blender", "Stable Diffusion", "After Effects"],
        link: "https://example.com/ai-anime"
      },
      {
        title: "Procedural Character System",
        description: "Developed a system for generating and animating characters with diverse appearances using AI and procedural techniques.",
        tools_used: ["Houdini", "Python", "Custom ML Models"],
        link: "https://example.com/proc-characters"
      }
    ]
  },
  {
    id: "9",
    name: "Olivia Kim",
    role: "AI Fashion Designer",
    skills: ["Midjourney", "Photoshop", "CLO 3D", "Fashion Design"],
    location: "Paris, France",
    experience_years: 7,
    job_type: "Full-Time",
    seniority: "Senior",
    availability: "Immediate",
    projects: [
      {
        title: "AI Fashion Collection",
        description: "Designed a complete fashion collection using Midjourney for concept generation and pattern creation.",
        tools_used: ["Midjourney", "Photoshop", "CLO 3D"],
        link: "https://example.com/ai-fashion"
      },
      {
        title: "Virtual Runway Experience",
        description: "Created an interactive virtual runway show featuring AI-designed garments and virtual models.",
        tools_used: ["Unity", "Midjourney", "Motion Capture"],
        link: "https://example.com/vr-runway"
      }
    ]
  },
  {
    id: "10",
    name: "Marcus Johnson",
    role: "AI Music Producer",
    skills: ["Suno AI", "Ableton Live", "Logic Pro", "Sound Design"],
    location: "Remote",
    experience_years: 5,
    job_type: "Freelance",
    seniority: "Mid",
    availability: "Immediate",
    projects: [
      {
        title: "AI-Human Collaborative Album",
        description: "Produced an experimental music album combining AI-generated compositions with human musicians and vocalists.",
        tools_used: ["Suno AI", "Logic Pro", "Pro Tools"],
        link: "https://example.com/ai-album"
      },
      {
        title: "Adaptive Game Soundtrack",
        description: "Developed a system for generating adaptive music in real-time based on player actions in a video game.",
        tools_used: ["Unreal Engine", "FMOD", "Custom AI Models"],
        link: "https://example.com/adaptive-music"
      }
    ]
  },
  {
    id: "11",
    name: "Sophia Rodriguez",
    role: "Prompt Engineer",
    skills: ["ChatGPT", "DALL-E", "Midjourney", "Prompt Design"],
    location: "Remote",
    experience_years: 3,
    job_type: "Contract",
    seniority: "Mid",
    availability: "Immediate",
    projects: [
      {
        title: "Brand Voice Development",
        description: "Crafted custom prompt systems for multiple brands to maintain consistent AI-generated content across platforms.",
        tools_used: ["ChatGPT", "Claude", "Custom Tools"],
        link: "https://example.com/ai-brand-voice"
      },
      {
        title: "Visual Identity System",
        description: "Developed prompt frameworks for generating consistent visual assets across campaigns using multiple AI image generators.",
        tools_used: ["DALL-E", "Midjourney", "Photoshop"],
        link: "https://example.com/visual-system"
      }
    ]
  },
  {
    id: "12",
    name: "Ryan Patel",
    role: "Creative Technologist",
    skills: ["TouchDesigner", "RunwayML", "Processing", "Installation Art"],
    location: "London, UK",
    experience_years: 9,
    job_type: "Freelance",
    seniority: "Senior",
    availability: "2 weeks notice",
    projects: [
      {
        title: "Interactive AI Installation",
        description: "Created a large-scale interactive installation using generative AI that responds to visitor movements and sounds.",
        tools_used: ["TouchDesigner", "RunwayML", "Custom Hardware"],
        link: "https://example.com/ai-installation"
      },
      {
        title: "Real-time Visual Performance",
        description: "Developed a system for live visual performances using AI-generated content responding to music and performer gestures.",
        tools_used: ["TouchDesigner", "Stable Diffusion", "MIDI Controllers"],
        link: "https://example.com/ai-visuals"
      }
    ]
  }
];
