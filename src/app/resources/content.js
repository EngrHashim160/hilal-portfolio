import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Muhammad",
  lastName: "Hashim",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "AI Engineer",
  avatar: "/profileimg.jpg",
  location: "Ismaila, Swabi, KPK, Pakistan",
  languages: ["English", "Urdu"],
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>Updates on AI engineering, agentic systems, and automation workflows.</>
  ),
};

const social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/EngrHashim160",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/engr-hashim",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:engrhashim160@gmail.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing ${person.name}, an ${person.role} focused on agentic AI, automation, and applied machine learning.`,
  headline: <>AI Engineer</>,
  subline: (
    <>
      I&apos;m Muhammad Hashim, an <InlineCode>AI Engineer</InlineCode> based in{" "}
      <InlineCode>Pakistan</InlineCode> building intelligent agents,
      voice assistants, and end-to-end automation systems.
      <br />
      I work across <InlineCode>LangChain</InlineCode>, <InlineCode>LangGraph</InlineCode>,{" "}
      <InlineCode>LiveKit</InlineCode>, <InlineCode>n8n</InlineCode>, and{" "}
      <InlineCode>OpenClaw</InlineCode> to ship production-grade Generative &amp; Agentic AI.
    </>
  ),
};

const about = {
  label: "About",
  title: "About me",
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I&apos;m Muhammad Hashim, an AI Engineer specializing in Generative AI,
        agentic systems, and automation. I design and ship multi-agent
        architectures, voice assistants, and AI-driven workflows that solve real
        business problems.
        <br />
        <br />
        My work spans LangChain and LangGraph agents, LiveKit/Vapi/Retell voice
        agents, and large-scale automation with n8n, OpenClaw, and Power Automate.
        I&apos;m also experienced with computer vision, NLP, RAG applications, and
        deploying AI services on Docker, Google Cloud Run, and Hostinger VPS with
        full CI/CD.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "AI Data House",
        timeframe: "March 2026 – Present",
        role: "AI Engineer",
        achievements: [
          <>Building applications using Machine Learning, Deep Learning, and Computer Vision.</>,
          <>Developing Generative AI solutions with LangChain and Agentic AI systems with LangGraph.</>,
          <>Creating voice agents with LiveKit, Vapi, and Retell AI for real-time conversations.</>,
          <>Designing automation workflows with Zapier, n8n, and OpenClaw for business operations.</>,
        ],
        images: [],
      },
      {
        company: "Zikra Infotech LLC",
        timeframe: "September 2025 – February 2026",
        role: "Junior AI Engineer",
        achievements: [
          <>Built SaaS applications for the US region using LangChain, LangGraph, and LiveKit.</>,
          <>Developed AI agents tailored to businesses and specialized Medical Practices.</>,
          <>Delivered conversational and voice-based agents for client-facing products.</>,
        ],
        images: [],
      },
      {
        company: "Logic Loomer",
        timeframe: "April 2024 – June 2024",
        role: "AI Intern",
        achievements: [
          <>Completed a 3-month AI internship focused on model training and automation pipelines.</>,
          <>Built RAG applications and conducted exploratory research under senior engineer mentorship.</>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "University of Engineering & Technology, Mardan",
        description: (
          <>BSc Software Engineering | 2021 – 2025 | CGPA: 3.53</>
        ),
      },
      {
        name: "Al-Badar Model School & College",
        description: (
          <>F.Sc (Pre-Engineering) | 2019 – 2021 | Marks: 990/1100</>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "Generative & Agentic AI",
        description: (
          <>
            LangChain, LangGraph, Langfuse, LangGraph Deployment, Agentic AI, RAG, Model Context Protocol (MCP)
          </>
        ),
      },
      {
        title: "Voice & Automation",
        description: <>LiveKit Agents, Vapi, Retell AI, n8n, Zapier, OpenClaw, Hermes, Power Automate</>,
      },
      {
        title: "Machine Learning",
        description: <>Machine Learning, Deep Learning, Computer Vision, NLP, TensorFlow</>,
      },
      {
        title: "Programming & Backend",
        description: <>Python, C, C++, FastAPI, SQL, NoSQL, HTML, CSS, JavaScript</>,
      },
      {
        title: "DevOps & Cloud",
        description: <>Docker, CI/CD, AWS, Google Cloud Run, Hostinger, Claude Code</>,
      },
    ],
  },
};

const blog = {
  label: "Blog",
  title: "Project notes",
  description: `AI, agentic systems, and automation notes from ${person.name}'s recent work`,
};

const work = {
  label: "Work",
  title: "Selected work",
  description: `AI agents, automation systems, and ML projects built by ${person.name}`,
};

const gallery = {
  label: "Gallery",
  title: "Project Gallery",
  description: `Selected screenshots from ${person.name}'s recent AI and automation work`,
  images: [
    {
      src: "/work/outreach-enrollment.jpeg",
      alt: "PSM outreach lead enrollment workflow routing leads to Lemlist campaigns",
      orientation: "horizontal",
    },
    {
      src: "/work/outreach-reply-handler.jpeg",
      alt: "PSM reply handler routing Lemlist webhook events to Airtable and HubSpot",
      orientation: "horizontal",
    },
    {
      src: "/work/blog-creator-agent.jpeg",
      alt: "Blog Creator Agent generating and publishing AI content to WordPress",
      orientation: "horizontal",
    },
    {
      src: "/work/job-scraper-wordpress.jpeg",
      alt: "Job scraper to WordPress n8n workflow with AI rewriting",
      orientation: "horizontal",
    },
    {
      src: "/work/ai-property-assistant.jpeg",
      alt: "AI Property Assistant routing between weather API and Supabase database",
      orientation: "horizontal",
    },
    {
      src: "/work/ats-resume-screener.jpeg",
      alt: "N8N ATS resume screener parsing and scoring candidates",
      orientation: "horizontal",
    },
    {
      src: "/work/whatsapp-receipt-processing.jpeg",
      alt: "WhatsApp receipt processing workflow with AI extraction via GreenAPI",
      orientation: "horizontal",
    },
    {
      src: "/work/clone-catalogue-image.jpeg",
      alt: "AI catalogue image generation pipeline using Replicate and Google Drive",
      orientation: "horizontal",
    },
    {
      src: "/work/crm-lead-processing.jpeg",
      alt: "CRM lead engagement automation generating AI replies via Email and SMS",
      orientation: "horizontal",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
