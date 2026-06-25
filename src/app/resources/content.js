import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Hilal",
  lastName: "Ahmad",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "AI Automation Engineer",
  avatar: "/profileimg.jpg",
  location: "Frankfurt, Worms, Germany",
  languages: ["English"],
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>Updates on AI automation, n8n workflows, and agentic systems that save businesses hours every week.</>
  ),
};

const social = [
  {
    name: "Upwork",
    icon: "upwork",
    link: "https://www.upwork.com/freelancers/~014b1feb586ed92c3a?mp_source=share",
  },
  {
    name: "Email",
    icon: "email",
    link: "https://mail.google.com/mail/?view=cm&fs=1&to=hilal96ahmad@gmail.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing ${person.name}, an ${person.role} who builds intelligent automation and AI agents that handle lead generation, outreach, CRM, and content operations for businesses.`,
  headline: (
    <>
      I automate the work
      <br />
      that slows businesses down
    </>
  ),
  subline: (
    <>
      I&apos;m <strong>Hilal Ahmad</strong> — an AI Automation Engineer who turns repetitive,
      manual tasks into reliable systems that run themselves.
      <br />
      <br />
      I design intelligent automation and AI agents that handle lead generation, outreach, CRM,
      and content operations end to end — so your team can stop doing busywork and{" "}
      <strong>save hours every week</strong>.
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
    display: true,
    link: "https://cal.com/hilal-ahmad-xerchg",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I&apos;m Hilal Ahmad, an AI Automation Engineer who helps businesses replace
        manual, repetitive work with reliable automated systems. I&apos;ve delivered
        turnkey automation for 15+ SMB clients — orchestrating cross-platform workflows
        in n8n, Zapier, and Make.com to sync CRMs, help desks, and marketing tools.
        <br />
        <br />
        I specialize in GHL and HubSpot automation, custom API and webhook integrations
        that cut manual data entry by up to 90%, and AI agents — from RAG chatbots to
        VAPI and GPT-powered voice agents for 24/7 lead qualification and support. I also
        train teams, having coached 50+ professionals on end-to-end business automation.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Tech Solute",
        timeframe: "January 2022 – Present",
        role: "AI Automation Engineer",
        achievements: [
          <>Designing and implementing AI-powered automation solutions to streamline business operations and improve efficiency.</>,
          <>Building workflow automation, AI agents, and chatbot integrations for process optimization.</>,
          <>Developing custom API integrations and leveraging Generative AI to automate repetitive tasks and enhance productivity.</>,
        ],
        images: [],
      },
      {
        company: "Softlare",
        timeframe: "September 2017 – December 2021",
        role: "AI Engineer",
        achievements: [
          <>Designed and developed AI-driven applications using Machine Learning, Deep Learning, NLP, Computer Vision, and Generative AI.</>,
          <>Responsible for model development, deployment, optimization, and AI integration across software solutions.</>,
        ],
        images: [],
      },
      {
        company: "Self-Employed",
        timeframe: "Freelance",
        role: "Freelance Automation Consultant",
        achievements: [
          <>Designed and delivered turnkey GHL &amp; HubSpot automation solutions for 15+ SMB clients.</>,
          <>Orchestrated cross-platform workflows in n8n, Zapier &amp; Make.com to sync CRMs, help desks &amp; marketing tools.</>,
          <>Built custom APIs &amp; webhooks to integrate legacy systems, reducing manual data entry by 90%.</>,
          <>Deployed VAPI voice agents and GPT-powered AI agents for 24/7 lead qualification and support.</>,
        ],
        images: [],
      },
      {
        company: "Tech Academy",
        timeframe: "Workshops",
        role: "Automation Trainer & Workshop Leader",
        achievements: [
          <>Developed and taught a 5-week &ldquo;End-to-End Business Automation&rdquo; bootcamp covering GHL, n8n, Zapier &amp; Make.com.</>,
          <>Created hands-on labs for RAG (Pinecone + Django) chatbots, ManyChat bots, and Google Apps Script automations.</>,
          <>Coached 50+ participants on APIs, webhooks, and AI agent deployment — 90% reported immediate productivity gains.</>,
          <>Authored training materials and video tutorials that remain a core resource for ongoing student support.</>,
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
        name: "Technische Universität Darmstadt",
        description: (
          <>Bachelor of Engineering (BEng), Computer Science | 2014 – 2017</>
        ),
      },
    ],
  },
  certifications: {
    display: true,
    title: "Certifications",
    items: [
      {
        name: "OpenClaw AI Systems Implementation Specialist",
        description: <>Coursera · Issued February 2026</>,
      },
      {
        name: "Docker Mastery: with Kubernetes + Swarm from a Docker Captain",
        description: <>Udemy · Issued April 2024</>,
      },
      {
        name: "Certified AI Automation & Agent Architect",
        description: <>iSkills · Issued March 2022</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "Workflow Automation",
        description: (
          <>
            n8n, OpenClaw, Zapier, Power Automate, Make, webhooks, scheduled & event-driven workflows, API integrations
          </>
        ),
      },
      {
        title: "AI Agents & Orchestration",
        description: (
          <>
            LangChain, LangGraph, Langfuse, Agentic AI, multi-agent systems, RAG, Model Context Protocol (MCP)
          </>
        ),
      },
      {
        title: "Voice Automation",
        description: <>LiveKit Agents, Vapi, Retell AI, Deepgram, automated calls & conversational agents</>,
      },
      {
        title: "Integrations & Tools",
        description: <>Airtable, HubSpot, GoHighLevel, WordPress, Slack, Google Workspace, WhatsApp, Telegram, Lemlist, Apollo</>,
      },
      {
        title: "Machine Learning",
        description: <>Machine Learning, Deep Learning, Computer Vision, NLP, TensorFlow</>,
      },
      {
        title: "Programming & DevOps",
        description: <>Python, FastAPI, SQL, NoSQL, JavaScript, Docker, CI/CD, AWS, Google Cloud Run, Hostinger</>,
      },
    ],
  },
};

const blog = {
  label: "Blog",
  title: "Automation notes",
  description: `Automation, n8n workflows, and AI agent notes from ${person.name}'s recent work`,
};

const work = {
  label: "Work",
  title: "Selected automation work",
  description: `Automation systems, AI agents, and workflow integrations built by ${person.name}`,
};

const gallery = {
  label: "Gallery",
  title: "Automation Gallery",
  description: `Real n8n and automation workflow screenshots from ${person.name}'s recent projects`,
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
