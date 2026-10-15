import type { PhotoKey } from "./images";

export const categories = ["All", "Getting paid", "Taxes", "Pricing your work"] as const;
export type Category = Exclude<(typeof categories)[number], "All">;

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; title: string; text: string }
  | { type: "table"; head: [string, string]; rows: [string, string][] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  author: { name: string; role: string; initials: string };
  date: string; // ISO
  readTime: number; // minutes
  featured?: boolean;
  cover: { label: string; amount: string };
  image: PhotoKey;
  body: Block[];
};

export const blogCopy = {
  title: "Notes on getting paid",
  sub: "Practical guides on invoicing, currency and tax for people who work for themselves.",
  filterLabel: "Filter posts by category",
  featured: "Featured",
  empty: "No posts in this category yet.",
  related: "Keep reading",
  back: "All posts",
  newsletter: {
    title: "Get the next one by email",
    body: "One email a month with a new guide and the tax dates coming up. Unsubscribe in one click.",
  },
};

export const posts: Post[] = [
  {
    slug: "get-paid-faster-on-overseas-invoices",
    title: "Seven changes that get overseas invoices paid faster",
    excerpt: "The average international invoice takes 23 days to clear. Most of that delay is fixable before you hit send.",
    category: "Getting paid",
    author: { name: "Mara Kent", role: "Contributor, brand designer", initials: "MK" },
    date: "2026-09-18",
    readTime: 6,
    featured: true,
    cover: { label: "Days to paid", amount: "23 → 9" },
    image: "overseas",
    body: [
      { type: "p", text: "When a client in another country owes you money, three things slow it down: the invoice sits unread, the payment method is awkward for them, and the transfer itself takes days. You control more of this than it seems." },
      { type: "h2", text: "1. Agree payment terms before the work starts" },
      { type: "p", text: "Put the terms in the proposal, not the invoice. Net 14 is reasonable for most freelance work. If a client's finance team insists on Net 45, ask for a 30–50% deposit up front." },
      { type: "h2", text: "2. Invoice in the client's currency" },
      { type: "p", text: "A US client paying a USD invoice from a US bank account is a domestic payment for them. A EUR invoice is a foreign wire that needs approval. Use local account details so the client pays you the way they pay everyone else." },
      { type: "callout", title: "Rule of thumb", text: "If your client has to fill in a SWIFT code, the invoice will take at least a week longer." },
      { type: "h2", text: "3. Send it to the person who pays" },
      { type: "p", text: "Your contact is often not the person who releases payment. Ask for the accounts payable email and copy both." },
      { type: "h2", text: "4. Make the due date a date" },
      { type: "p", text: "\"Due on receipt\" gets ignored. \"Due 16 October\" gets put in a calendar." },
      { type: "h2", text: "5–7. Remind, offer a card option, and follow up once by name" },
      { type: "ul", items: ["Automatic reminders at 3, 7 and 14 days remove the awkwardness.", "A card option lets small clients pay in a minute, even if you absorb a fee.", "After 14 days, one short personal email beats a fourth automated one."] },
      { type: "quote", text: "The fastest invoice is the one that looks like every other bill the client pays that week.", cite: "Mara Kent" },
    ],
  },
  {
    slug: "how-much-to-set-aside-for-tax",
    title: "How much of each payment should you set aside for tax?",
    excerpt: "A simple way to pick a percentage, check it each quarter and stop dreading April.",
    category: "Taxes",
    author: { name: "Jo Ruiz", role: "Contributor, copywriter", initials: "JR" },
    date: "2026-09-04",
    readTime: 5,
    cover: { label: "Tax pot", amount: "28%" },
    image: "tax",
    body: [
      { type: "p", text: "There's no universal number, but there is a reliable way to find yours. You need last year's total tax bill and last year's gross income." },
      { type: "h2", text: "Start with your effective rate" },
      { type: "p", text: "Divide the total tax you paid by your gross freelance income. If you paid $14,000 on $56,000, your effective rate was 25%. Add 3–5 points as a buffer for growth and you have your starting percentage." },
      { type: "table", head: ["Gross income", "Typical set-aside"], rows: [["Under $40,000", "20–25%"], ["$40,000–$100,000", "25–30%"], ["Over $100,000", "30–35%"]] },
      { type: "callout", title: "This isn't tax advice", text: "These ranges are common starting points. An accountant who knows your situation will give you a better number." },
      { type: "h2", text: "Check it every quarter" },
      { type: "p", text: "When you pay estimated tax, compare it to what's in your pot. More than enough? Lower the percentage by a point. Short? Raise it now, not in April." },
      { type: "ul", items: ["Keep the pot in a separate account you don't see daily.", "Move the money the moment a payment lands, not at month end.", "Let it earn interest while it waits."] },
    ],
  },
  {
    slug: "raising-your-rates-without-losing-clients",
    title: "Raising your rates without losing your best clients",
    excerpt: "A script, a timeline and the numbers to check before you send the email.",
    category: "Pricing your work",
    author: { name: "Lena Park", role: "Founder, Parallel Studio", initials: "LP" },
    date: "2026-08-21",
    readTime: 7,
    cover: { label: "New day rate", amount: "+15%" },
    image: "rates",
    body: [
      { type: "p", text: "Most freelancers raise rates too rarely and by too little. A yearly increase of 8–15% is normal, and clients who value your work expect it." },
      { type: "h2", text: "Do the maths first" },
      { type: "p", text: "If you raise prices by 15% and lose one client in ten, you earn more and work less. Write down what each client paid last year before deciding who gets the new rate first." },
      { type: "h2", text: "Give 60 days' notice" },
      { type: "p", text: "Tell existing clients two months ahead, in writing, with the date the new rate starts. New clients get the new rate immediately." },
      { type: "quote", text: "Short, specific and without apology. That's the whole script.", cite: "Lena Park" },
      { type: "ol", items: ["Thank them for the work so far.", "State the new rate and the start date.", "Offer to lock the current rate for any project signed before that date."] },
    ],
  },
  {
    slug: "fx-fees-explained",
    title: "Where your money goes when a client pays in another currency",
    excerpt: "The mid-market rate, the markup and the flat fees, with a real $5,000 example.",
    category: "Getting paid",
    author: { name: "Arjun Shah", role: "Contributor, engineer", initials: "AS" },
    date: "2026-08-07",
    readTime: 4,
    cover: { label: "Lost to FX", amount: "$312" },
    image: "fx",
    body: [
      { type: "p", text: "A $5,000 payment converted to euros through a typical high-street bank loses about 6% before it reaches you. Here's where it goes." },
      { type: "table", head: ["Cost", "Typical bank"], rows: [["Sending bank wire fee", "$25"], ["Intermediary bank fee", "$15"], ["Receiving fee", "$12"], ["Exchange rate markup (5.2%)", "$260"], ["Total lost", "$312"]] },
      { type: "h2", text: "The markup is the big one" },
      { type: "p", text: "Flat fees are visible. The markup hides in the exchange rate. Compare the rate you were given to the mid-market rate on the same day to see it." },
      { type: "callout", title: "Quick check", text: "Search \"USD to EUR\" at the time of payment and compare it to the rate on your statement." },
    ],
  },
  {
    slug: "quarterly-tax-checklist-for-freelancers",
    title: "A 20-minute quarterly tax checklist for freelancers",
    excerpt: "Four times a year, block out twenty minutes and run through this list.",
    category: "Taxes",
    author: { name: "Jo Ruiz", role: "Contributor, copywriter", initials: "JR" },
    date: "2026-07-24",
    readTime: 3,
    cover: { label: "Next deadline", amount: "15 Jan" },
    image: "checklist",
    body: [
      { type: "p", text: "A short routine every quarter beats a long weekend every April." },
      { type: "ol", items: ["Export income for the quarter by client.", "Match every expense to a receipt.", "Compare your tax pot to your estimated bill.", "Pay estimated tax if it applies to you.", "Adjust your set-aside percentage if needed."] },
      { type: "callout", title: "Tip", text: "Put the four deadlines in your calendar now, with a reminder a week before each." },
    ],
  },
  {
    slug: "why-we-built-ledgerly",
    title: "Why we built Ledgerly",
    excerpt: "Three freelancers, one shared spreadsheet and a tax bill nobody saw coming.",
    category: "Pricing your work",
    author: { name: "The Ledgerly team", role: "Team", initials: "LT" },
    date: "2026-07-10",
    readTime: 4,
    cover: { label: "Founded", amount: "2023" },
    image: "team",
    body: [
      { type: "p", text: "Ledgerly started as a spreadsheet three of us shared while freelancing for clients in the US, Germany and Japan. It tracked who owed what, in which currency, and how much we'd need for tax." },
      { type: "p", text: "The spreadsheet worked until it didn't. One quarter, a delayed payment and a bad exchange rate left one of us short on a tax bill." },
      { type: "h2", text: "What we wanted instead" },
      { type: "ul", items: ["Invoices clients could pay like a local bill.", "Balances in the currencies we were actually paid in.", "Tax money moved aside before we could spend it."] },
      { type: "p", text: "That's still the whole product. Everything else is there to make those three things faster." },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function getRelated(slug: string, count = 3) {
  const post = getPost(slug);
  const others = posts.filter((p) => p.slug !== slug);
  if (!post) return others.slice(0, count);
  const same = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...same, ...rest].slice(0, count);
}

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
