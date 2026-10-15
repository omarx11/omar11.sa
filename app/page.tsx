import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { author, profiles } from "@/app/config/meta";
import { databases, frameworks, langs, styles } from "@/app/config/skills";

import GithubCal, { GithubCalSkeleton } from "./components/content/GithubCal";
import Projects, { ProjectsSkeleton } from "./components/content/Projects";
import { Heading } from "./components/ui/Heading";

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
      knowsAbout: [...langs, ...frameworks, ...styles, ...databases].map(
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
      <Heading emoji="🖥️" name="Projects" sId="#projects" />
      <p className="group relative mt-4 max-w-max text-neutral-400">
        {`Here's`} all of my personal projects that {`I've`} worked on. You can
        support me by starring! ⭐
      </p>
      {/* Each GitHub section streams in on its own; the page never waits. */}
      <Suspense fallback={<ProjectsSkeleton />}>
        <Projects />
      </Suspense>
      <div className="mt-6 flex justify-center">
        <Link
          className="group inline-flex items-center justify-center gap-1 rounded-md bg-neutral-800 px-6 py-2 text-neutral-200 hover:underline"
          href={`${author.github}?tab=repositories`}
          target="_blank"
        >
          view all projects{" "}
          <svg
            aria-hidden={true}
            className="text-neutral-400"
            height="1.2rem"
            viewBox="0 0 24 24"
            width="1.2rem"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.365 5.636h-7.071m7.07 0v7.071m0-7.07L5.638 18.363"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </Link>
      </div>
      <Suspense fallback={<GithubCalSkeleton />}>
        <GithubCal />
      </Suspense>
    </>
  );
}
