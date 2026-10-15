import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { Heading } from "@/app/components/ui/Heading";
import { author } from "@/app/config/meta";

const LAST_UPDATED = "October 15, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `What ${author.siteName} collects, why, and how to have it deleted.`,
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy",
    description: `What ${author.siteName} collects, why, and how to have it deleted.`,
    url: `${author.siteUrl}/privacy-policy`,
    images: [{ url: author.ogImage }],
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Heading
        emoji="🔒"
        name="Privacy Policy"
        sId="#privacy"
        title={`Last updated: ${LAST_UPDATED}`}
      />
      <article
        className="mt-8 w-full max-w-3xl space-y-8 text-neutral-400 leading-relaxed"
        id="privacy"
      >
        <p className="border-emerald-900 border-l-4 bg-gradient-to-r from-stone-900 py-2 pl-4">
          {author.siteName} is the personal website of {author.fullName}. You
          can browse every page without an account. This policy explains the
          small amount of data the site handles, which is only needed for the
          guestbook and the AI assistant. The site does not sell data, show ads,
          or use tracking cookies.
        </p>

        <Section title="Signing in to the guestbook">
          <p>
            To post in the guestbook you sign in with Google or GitHub. Your
            password is never shared with this site. From your account, the site
            receives:
          </p>
          <List
            items={[
              "Your name and profile picture, shown next to your comments.",
              "Your email address and whether it is verified, used only to identify your account and to match comments you wrote before this site changed sign-in providers. It is never displayed or used to contact you.",
              "A unique account ID from Google or GitHub, and the sign-in tokens they issue. The tokens are kept by the sign-in service and are not used to access anything else in your Google or GitHub account.",
            ]}
          />
          <p>
            Only basic profile permissions are requested: Google&apos;s{" "}
            <code>openid</code>, <code>email</code> and <code>profile</code>,
            and GitHub&apos;s <code>read:user</code> and <code>user:email</code>
            . The site cannot read your emails, files, repositories, or
            contacts.
          </p>
          <p>
            Use of information received from Google APIs will adhere to the{" "}
            <ExternalLink href="https://developers.google.com/terms/api-services-user-data-policy">
              Google API Services User Data Policy
            </ExternalLink>
            , including the Limited Use requirements.
          </p>
        </Section>

        <Section title="Guestbook comments">
          <p>
            When you post a comment, its text is stored together with your name,
            profile picture, account ID, and the time you posted it. Comments
            are public: anyone visiting the guestbook can read them. You can
            delete your own comments at any time with the delete button next to
            them.
          </p>
        </Section>

        <Section title="AI assistant">
          <p>
            Messages you send to the AI assistant are forwarded to{" "}
            <ExternalLink href="https://openai.com/policies/api-data-usage-policies">
              OpenAI
            </ExternalLink>{" "}
            to generate a reply. The conversation is also saved with a random ID
            created for your visit (shown in the assistant window), so{" "}
            {author.name} can review how the assistant is used and improve it.
            Conversations are not linked to your guestbook account, your name,
            or your email. Please don&apos;t share personal or sensitive
            information in the chat.
          </p>
        </Section>

        <Section title="Cookies">
          <p>The site only sets cookies it needs to work:</p>
          <List
            items={[
              "Sign-in cookies (names starting with __Secure-neon-auth) keep you signed in to the guestbook. They are removed when you sign out.",
              `An "onlineState" cookie that stores ${author.name}'s current Discord status, so the AI assistant can answer questions about it. It contains nothing about you.`,
            ]}
          />
        </Section>

        <Section title="Analytics and server logs">
          <p>
            The site uses{" "}
            <ExternalLink href="https://vercel.com/docs/analytics/privacy-policy">
              Vercel Web Analytics
            </ExternalLink>{" "}
            to count page views. It doesn&apos;t use cookies and doesn&apos;t
            identify individual visitors. Like any web host, Vercel briefly
            keeps standard request logs (such as IP address and browser type) to
            run and secure the site.
          </p>
        </Section>

        <Section title="Services that process data">
          <List
            items={[
              <>
                <strong className="text-neutral-300">Vercel</strong>: hosting,
                request logs and analytics.
              </>,
              <>
                <strong className="text-neutral-300">Neon</strong>: the database
                and sign-in service, hosted in the EU (Frankfurt). It stores
                your account details, guestbook comments, and AI assistant
                conversations.
              </>,
              <>
                <strong className="text-neutral-300">Google and GitHub</strong>:
                sign-in, if you choose to sign in.
              </>,
              <>
                <strong className="text-neutral-300">OpenAI</strong>: generates
                the AI assistant&apos;s replies.
              </>,
              <>
                <strong className="text-neutral-300">
                  Lanyard, Steam, and GitHub
                </strong>
                : your browser loads {author.name}&apos;s live Discord status,
                game artwork, and profile pictures directly from these services,
                which can see your IP address as with any web request.
              </>,
            ]}
          />
          <p>Your data is never sold or shared for advertising.</p>
        </Section>

        <Section title="How long data is kept">
          <p>
            Your account and comments are kept until you delete them or ask for
            them to be deleted. AI assistant conversations are kept until{" "}
            {author.name} removes them or you ask for yours to be deleted.
          </p>
        </Section>

        <Section title="Your choices and rights">
          <p>
            You can delete your guestbook comments yourself. To see, correct, or
            delete any other data, including your whole account or an AI
            assistant conversation (include its ID), email{" "}
            <ExternalLink href={`mailto:${author.email}`}>
              {author.email}
            </ExternalLink>
            . Requests are handled within 30 days. You can also remove this
            site&apos;s access from your{" "}
            <ExternalLink href="https://myaccount.google.com/connections">
              Google account
            </ExternalLink>{" "}
            or{" "}
            <ExternalLink href="https://github.com/settings/applications">
              GitHub settings
            </ExternalLink>{" "}
            at any time.
          </p>
        </Section>

        <Section title="Children">
          <p>
            This site is not directed at children under 13, and it does not
            knowingly collect their data.
          </p>
        </Section>

        <Section title="Changes and contact">
          <p>
            If this policy changes, the date at the top of this page will be
            updated. Questions? Email{" "}
            <ExternalLink href={`mailto:${author.email}`}>
              {author.email}
            </ExternalLink>
            . You can also read the site&apos;s{" "}
            <Link
              className="text-emerald-500 underline-offset-2 hover:underline"
              href="/license"
            >
              license
            </Link>
            .
          </p>
        </Section>
      </article>
    </>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-bold text-lg text-neutral-200">
        <span className="text-emerald-500">#</span> {title}
      </h2>
      {children}
    </section>
  );
}

function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-6 marker:text-emerald-700">
      {items.map((item, i) => (
        // Static content: the index is a stable key.
        // biome-ignore lint/suspicious/noArrayIndexKey: static list
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <a
      className="text-emerald-500 underline-offset-2 hover:underline"
      href={href}
      {...(external && { rel: "noopener noreferrer", target: "_blank" })}
    >
      {children}
    </a>
  );
}
