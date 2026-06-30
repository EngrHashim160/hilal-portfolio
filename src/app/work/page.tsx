import { notFound } from "next/navigation";
import { getPosts } from "@/app/utils/utils";
import { Column, Heading, Text } from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";
import { baseURL, routes } from "@/app/resources";
import { person, work } from "@/app/resources/content";

// Project categories rendered as labeled sections so clients can quickly tell
// which platform each project was built on.
const categories: { tag: string; title: string; subtitle: string }[] = [
  {
    tag: "n8n",
    title: "n8n Automations",
    subtitle: "AI-powered workflows and agents built in n8n",
  },
  {
    tag: "Make.com",
    title: "Make.com Automations",
    subtitle: "Production scenarios with multi-branch routers and integrations",
  },
  {
    tag: "AI & Agents",
    title: "AI Agents & Applications",
    subtitle: "Agentic systems, voice agents, and applied AI projects",
  },
];

export async function generateMetadata() {
  if (!routes["/work"]) {
    return {};
  }

  const title = work.title;
  const description = work.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/work/`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Work() {
  if (!routes["/work"]) {
    notFound();
  }

  let allProjects = getPosts(["src", "app", "work", "projects"]);

  return (
    <Column maxWidth="m">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            headline: work.title,
            description: work.description,
            url: `https://${baseURL}/projects`,
            image: `${baseURL}/og?title=Design%20Projects`,
            author: {
              "@type": "Person",
              name: person.name,
            },
            hasPart: allProjects.map((project) => ({
              "@type": "CreativeWork",
              headline: project.metadata.title,
              description: project.metadata.summary,
              url: `https://${baseURL}/projects/${project.slug}`,
              image: `${baseURL}/${project.metadata.image}`,
            })),
          }),
        }}
      />
      <Column fillWidth gap="xl">
        {categories.map((cat) => (
          <Column key={cat.tag} fillWidth gap="m">
            <Column gap="4" paddingX="l">
              <Heading as="h2" variant="display-strong-xs">
                {cat.title}
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {cat.subtitle}
              </Text>
            </Column>
            <Projects category={cat.tag} />
          </Column>
        ))}
      </Column>
    </Column>
  );
}
