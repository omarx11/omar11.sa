import type { Metadata } from "next";
import { Suspense } from "react";

import Activity, { ActivitySkeleton } from "@/components/home/Activity";
import GithubCalendar, {
  GithubCalendarSkeleton,
} from "@/components/home/GithubCalendar";
import Projects, { ProjectsSkeleton } from "@/components/home/Projects";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { Heading } from "@/components/ui/Heading";
import { author, profiles } from "@/config/meta";
import { databases, frameworks, languages, styles } from "@/config/skills";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const SITE = author.siteUrl;

// schema.org structured data: who this site is about (Google's ProfilePage).
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: author.siteName,
      inLanguage: "en",
      publisher: { "@id": `${SITE}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE}/#profile`,
      url: SITE,
      name: `${author.fullName} — ${author.jobTitle}`,
      isPartOf: { "@id": `${SITE}/#website` },
      mainEntity: { "@id": `${SITE}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE}/#person`,
      name: author.fullName,
      url: SITE,
      image: `${SITE}${author.avatar}`,
      jobTitle: author.jobTitle,
      description: author.description,
      email: `mailto:${author.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: author.city,
        addressCountry: "SA",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Technical and Vocational Training Corporation",
      },
      knowsAbout: [...languages, ...frameworks, ...styles, ...databases].map(
        (skill) => skill.name,
      ),
      sameAs: profiles,
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        // Escape "<" so the JSON can't close the script tag (per Next.js docs).
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static, escaped JSON-LD
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
      <Heading anchor="projects" emoji="🖥️" title="Projects" />
      {/* Each GitHub section streams in on its own; the page never waits.
          The projects bring their own pager and "view all" link. */}
      <ProjectsSection
        activity={
          <Suspense fallback={<ActivitySkeleton />}>
            <Activity />
          </Suspense>
        }
        activityIntro="What I've been building lately on GitHub, month by month."
        intro={
          <>
            {`Here's`} all of the projects {`I've`} worked on, my own and for
            others. You can support me by starring! ⭐
          </>
        }
        projects={
          <Suspense fallback={<ProjectsSkeleton />}>
            <Projects />
          </Suspense>
        }
      />
      <Suspense fallback={<GithubCalendarSkeleton />}>
        <GithubCalendar />
      </Suspense>
    </>
  );
}
