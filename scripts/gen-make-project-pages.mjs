import { writeFileSync } from "node:fs";
import { join } from "node:path";

const DIR = "src/app/work/projects";

// Each Make.com workflow becomes its own project card (tag: "Make.com"),
// shown directly in the Work page's Make.com section like the n8n projects.
const projects = [
  {
    slug: "make-master-flow-stripe-event-router",
    title: "Make.com — Stripe Event Router",
    date: "2026-06-25",
    image: "/work/make-master-flow-stripe.png",
    summary:
      "A 75-module Make.com Stripe webhook orchestrator that routes every subscription lifecycle event through nested branches — syncing Airtable, AWeber, and SuiteDash.",
    body: `A central **Stripe webhook orchestrator** built in Make.com with 75 modules — the flagship scenario.

It receives Stripe events, verifies them with HTTP calls, looks up the customer in Airtable, then routes through nested routers to handle each subscription lifecycle event — creating and updating Airtable records and keeping subscribers in sync across AWeber and SuiteDash.

**Apps:** Stripe, Airtable, AWeber, SuiteDash, HTTP, webhooks, multi-branch routers.`,
  },
  {
    slug: "make-ppd-subscription",
    title: "Make.com — PPD Subscription Manager",
    date: "2026-06-24",
    image: "/work/make-ppd-subscription.png",
    summary:
      "A 59-module Make.com subscription manager using nested routers to branch by subscription state and keep Airtable data consistent.",
    body: `A **subscription management** scenario built in Make.com with 59 modules.

A webhook triggers nested routers that branch by subscription state, making HTTP calls and reading, updating, creating, and upserting Airtable records to keep subscription data consistent across every scenario.

**Apps:** Airtable, HTTP, webhooks, nested routers, iterators.`,
  },
  {
    slug: "make-suitedash-api-metadata",
    title: "Make.com — SuiteDash to Stripe Sync",
    date: "2026-06-23",
    image: "/work/make-suitedash-api-metadata.png",
    summary:
      "A scheduled Make.com scenario that keeps billing data in sync between SuiteDash and Stripe via the secure SuiteDash API.",
    body: `Keeps **billing data in sync between SuiteDash and Stripe**.

On a schedule it lists SuiteDash contacts, calls the secure SuiteDash API for contact metadata, searches for the matching Stripe customer, and updates that customer's record so billing always reflects the latest contact data.

**Apps:** SuiteDash, Stripe, HTTP.`,
  },
  {
    slug: "make-aweber-engagement-tracking",
    title: "Make.com — AWeber Engagement Tracking",
    date: "2026-06-22",
    image: "/work/make-aweber-engagement-tracking.png",
    summary:
      "A Make.com scenario that tracks AWeber subscriber engagement and routes subscribers through a three-way branch to update tags by activity level.",
    body: `Monitors **subscriber engagement in AWeber**.

It finds subscribers, reads their activity, then routes them through a three-way branch — no activity 90+ days, 60–89 days, and active in 30 days — to update their tags and fields based on how engaged they are.

**Apps:** AWeber, routers.`,
  },
  {
    slug: "make-pet-profile-report",
    title: "Make.com — PET Profile Report",
    date: "2026-06-21",
    image: "/work/make-pet-profile-report.png",
    summary:
      "A Make.com scenario that generates pet profile reports from webhook data, parsing fields and storing structured records in Airtable.",
    body: `Generates **pet profile reports** from incoming data.

A custom webhook fetches the SuiteDash contact, then a router parses fields with a text parser and stores structured records in Airtable across two report types.

**Apps:** Webhooks, SuiteDash, text parser, Airtable, routers.`,
  },
  {
    slug: "make-pagefly-shopify-blog",
    title: "Make.com — PageFly Story to Shopify Blog",
    date: "2026-06-20",
    image: "/work/make-pagefly-shopify-blog.png",
    summary:
      "A Make.com scenario that turns Tally form submissions into published Shopify blog articles automatically.",
    body: `Turns **form submissions into blog posts**.

A new Tally form response triggers an HTTP file download and publishes a fresh Shopify blog article automatically.

**Apps:** Tally, HTTP, Shopify.`,
  },
  {
    slug: "make-daily-sending-messages",
    title: "Make.com — Daily Messaging Engine",
    date: "2026-06-12",
    image: "/work/make-daily-sending-messages.svg",
    summary:
      "A scheduled Make.com messaging engine that sends personalized email via SendGrid and logs every send back to Airtable.",
    body: `A scheduled **daily messaging engine**.

It pulls recipients from Airtable, routes them, loops with iterators, downloads attachments, sends personalized email through SendGrid, and logs every send back to Airtable with status tracking.

**Apps:** Airtable, SendGrid, HTTP, routers, iterators, aggregators.

> The diagram below is generated from the actual Make.com blueprint.`,
  },
  {
    slug: "make-daily-mail",
    title: "Make.com — Daily Mail with Imagery",
    date: "2026-06-11",
    image: "/work/make-daily-mail.svg",
    summary:
      "A daily Make.com email scenario that hosts imagery on Cloudinary and marks Airtable records as sent so nobody is emailed twice.",
    body: `A **daily email with hosted imagery**.

It reads recipients from Airtable, fetches an image over HTTP and uploads it to Cloudinary, aggregates the data, sends the mail, and marks each record as sent so nobody is emailed twice.

**Apps:** Airtable, Cloudinary, HTTP, aggregators, iterators.

> The diagram below is generated from the actual Make.com blueprint.`,
  },
  {
    slug: "make-activate-deactivate-whatsapp",
    title: "Make.com — WhatsApp Subscriber Toggle",
    date: "2026-06-10",
    image: "/work/make-activate-deactivate-whatsapp-for-subscribers.svg",
    summary:
      "A Make.com scenario that toggles a subscriber's WhatsApp status in Airtable from an incoming webhook.",
    body: `Toggles a subscriber's **WhatsApp status**.

A webhook looks the subscriber up in Airtable and flips their WhatsApp subscription on or off.

**Apps:** Webhooks, Airtable.

> The diagram below is generated from the actual Make.com blueprint.`,
  },
  {
    slug: "make-add-subscriber-klaviyo",
    title: "Make.com — SuiteDash to Klaviyo Sync",
    date: "2026-06-09",
    image: "/work/make-add-subscriber.svg",
    summary:
      "A Make.com scenario that pushes new SuiteDash subscribers straight into a Klaviyo list via webhook.",
    body: `Syncs **new subscribers between platforms**.

A webhook pushes a new SuiteDash subscriber straight into a Klaviyo list.

**Apps:** Webhooks, Klaviyo.

> The diagram below is generated from the actual Make.com blueprint.`,
  },
  {
    slug: "make-adds-new-subscriber-airtable",
    title: "Make.com — SuiteDash to Airtable Sync",
    date: "2026-06-08",
    image: "/work/make-adds-new-subcriber-to-airtable.svg",
    summary:
      "A Make.com scenario that reads SuiteDash contacts and creates matching records in Airtable to keep contacts in sync.",
    body: `Keeps **contacts in sync**.

It reads SuiteDash contacts and creates matching records in Airtable.

**Apps:** SuiteDash, Airtable.

> The diagram below is generated from the actual Make.com blueprint.`,
  },
];

for (const p of projects) {
  const mdx = `---
title: "${p.title}"
publishedAt: "${p.date}"
tag: "Make.com"
summary: "${p.summary}"
images:
  - "${p.image}"
---

${p.body}
`;
  writeFileSync(join(DIR, `${p.slug}.mdx`), mdx, "utf8");
  console.log("wrote", p.slug + ".mdx");
}
console.log(`\nGenerated ${projects.length} Make.com project pages.`);
