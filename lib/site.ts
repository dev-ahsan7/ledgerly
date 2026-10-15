import type { PhotoKey } from "./images";

// Site-wide copy and navigation. Edit text here, not in components.

export const site = {
  name: "Ledgerly",
  // Set NEXT_PUBLIC_SITE_URL for a custom domain; on Vercel the production URL is used automatically.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
  description:
    "Invoices, global payments and automatic tax set-asides for freelancers and small studios. Get paid in 40+ currencies and split every payment into Salary, Tax and Savings.",
  pitch:
    "Get paid from anywhere. Ledgerly sends the invoice, collects the money, and splits it before you can spend it.",
};

export type NavLink = { label: string; href: string };

export const nav = {
  links: [
    { label: "Features", href: "/#features" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
  ] satisfies NavLink[],
  login: { label: "Log in", href: "/contact" },
  cta: { label: "Start free", href: "/pricing#plans" },
};

export const footer = {
  columns: [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/#features" },
        { label: "How it works", href: "/#how-it-works" },
        { label: "Payment split", href: "/#split" },
        { label: "Pricing", href: "/pricing" },
        { label: "Security", href: "/#security" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/blog/why-we-built-ledgerly" },
        { label: "Customers", href: "/#testimonials" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Fee calculator", href: "/pricing#calculator" },
        { label: "FAQ", href: "/#faq" },
        { label: "Help center", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "/legal/privacy" },
        { label: "Terms", href: "/legal/terms" },
      ],
    },
  ],
  newsletter: {
    title: "One email a month",
    body: "Pricing tips, tax dates and product updates for independents. No spam.",
    label: "Email address",
    placeholder: "you@studio.com",
    button: "Subscribe",
    success: "You're on the list. The first issue lands on the 1st.",
    invalid: "Enter a valid email address.",
  },
  social: [
    { label: "X", href: "https://x.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "Instagram", href: "https://www.instagram.com" },
    { label: "YouTube", href: "https://www.youtube.com" },
  ],
  copyright: "Ledgerly is a fictional product. Banking services provided by licensed partners.",
};

export const hero = {
  eyebrow: { tag: "New", text: "Instant payouts in 40 currencies" },
  title: "Get paid from anywhere. Keep more of it.",
  sub: "Invoices, global payments and automatic tax set-asides for freelancers and small studios.",
  primary: { label: "Start free", href: "/pricing#plans" },
  secondary: { label: "See how it works", href: "#how-it-works" },
  trust: "Trusted by 38,000 independents in 120 countries",
  avatars: [
    { initials: "MK", photo: "avatar1" as PhotoKey },
    { initials: "AS", photo: "avatar2" as PhotoKey },
    { initials: "JR", photo: "avatar3" as PhotoKey },
    { initials: "LP", photo: "avatar4" as PhotoKey },
  ],
  invoice: {
    number: "Invoice #1042",
    client: "Brightline Studio",
    issued: "Issued 2 Oct",
    due: "Due 16 Oct",
    lines: [
      { label: "Brand identity system", amount: 3200 },
      { label: "Website design, 6 pages", amount: 1600 },
    ],
    total: 4800,
    currency: "USD",
    stamp: "PAID",
    paidNote: "Paid 4 days early by card",
    chips: [
      { label: "Salary", amount: 2880 },
      { label: "Tax", amount: 1440 },
      { label: "Savings", amount: 480 },
    ],
  },
};

export type LogoMark = "circle" | "rings" | "triangle" | "diamond" | "half" | "bars" | "ring" | "spark";

export const marquee = {
  caption: "Freelancers get paid by teams at",
  // Placeholder companies. Each gets a simple geometric mark, drawn in LogoMarquee.tsx.
  logos: [
    { name: "Northwind", mark: "half" },
    { name: "Halcyon", mark: "rings" },
    { name: "Brightline", mark: "spark" },
    { name: "Copperleaf", mark: "diamond" },
    { name: "Orbital", mark: "ring" },
    { name: "Fieldnote", mark: "bars" },
    { name: "Kestrel & Co", mark: "triangle" },
    { name: "Parallel", mark: "circle" },
  ] satisfies { name: string; mark: LogoMark }[],
};

export type Stat = { value: number; prefix?: string; suffix?: string; from?: number; text: string };

export const problem = {
  label: "Problem",
  title: "Getting paid shouldn't be a second job.",
  sub: "Chasing invoices, losing money in conversion and scrambling at tax time add up to hours every month.",
  stats: [
    { value: 23, suffix: " days", text: "Average wait on an overseas invoice." },
    { value: 6, suffix: "%", text: "Lost to fees and FX on a typical cross-border payment." },
    { prefix: "1 in ", value: 3, from: 9, text: "Freelancers caught short at tax time." },
  ] satisfies Stat[],
};

export const split = {
  label: "Payment split",
  title: "Every payment, sorted the second it lands.",
  sub: "Set your rules once. When a client pays, Ledgerly moves each share to its own pot before the money reaches your spending account.",
  amountLabel: "Incoming payment",
  currencyLabel: "Currency",
  currencies: ["USD", "EUR", "GBP"],
  defaultAmount: 4800,
  min: 500,
  max: 20000,
  step: 100,
  splits: [
    { label: "Salary", percent: 60, hint: "Lands in your everyday account" },
    { label: "Tax", percent: 30, hint: "Held until your tax bill is due" },
    { label: "Savings", percent: 10, hint: "Earns 3.1% interest" },
  ],
  totalLabel: "Total",
  note: "Percentages always add up to 100%. Change one and the others adjust.",
};

export const howItWorks = {
  label: "How it works",
  title: "Three steps. No spreadsheet.",
  sub: "From the first draft to money in the right place, usually inside a week.",
  steps: [
    { title: "Send", text: "Branded invoices in 30 seconds.", detail: "Add a client, pick a currency, hit send. Reminders go out on their own.", time: "30 sec" },
    { title: "Get paid", text: "Clients pay by card, bank or local transfer.", detail: "Local account details in 10 currencies mean clients pay you like a domestic bill.", time: "Same day" },
    { title: "Split", text: "Rules route money to the right pots.", detail: "Salary, Tax and Savings fill up automatically, every time.", time: "Instant" },
  ],
  // Data for the small built-UI panel on each step card.
  visuals: {
    send: {
      to: "Brightline Studio",
      email: "ap@brightline.studio",
      amount: "$4,800.00",
      currency: "USD",
      button: "Send invoice",
      toast: "Sent · reminder in 3 days",
    },
    paid: {
      methods: [
        { label: "Card", note: "Visa, Mastercard, Amex" },
        { label: "Bank transfer", note: "SEPA, ACH, Faster Payments" },
        { label: "Local USD account", note: "Chase ••4821", selected: true },
      ],
      received: "Payment received",
      amount: "+$4,800.00",
    },
    split: [
      { label: "Salary", pct: 60, amount: "$2,880" },
      { label: "Tax", pct: 30, amount: "$1,440" },
      { label: "Savings", pct: 10, amount: "$480" },
    ],
  },
};

export type FeatureMock = "invoices" | "currency" | "pots" | "expenses" | "reports";

export const features = {
  label: "Features",
  title: "Everything between sent and spent.",
  autoAdvanceMs: 5000,
  tabs: [
    {
      id: "invoices",
      label: "Invoices",
      title: "Invoices that get paid on time",
      bullets: [
        "Templates with your logo, terms and payment details",
        "Automatic reminders at 3, 7 and 14 days",
        "See when a client opens the invoice",
      ],
      mock: "invoices" as FeatureMock,
    },
    {
      id: "currency",
      label: "Multi-currency",
      title: "Hold and receive 40+ currencies",
      bullets: [
        "Local account details in USD, EUR, GBP and 7 more",
        "Convert at the mid-market rate plus 0.5%",
        "Keep a balance until the rate suits you",
      ],
      mock: "currency" as FeatureMock,
    },
    {
      id: "pots",
      label: "Tax pots",
      title: "Tax money you can't spend by accident",
      bullets: [
        "Set a percentage or a fixed amount per payment",
        "Reminders before quarterly estimated tax is due",
        "Pots earn 3.1% interest while they wait",
      ],
      mock: "pots" as FeatureMock,
    },
    {
      id: "expenses",
      label: "Expenses",
      title: "Receipts sorted as you spend",
      bullets: [
        "Snap a receipt; amount and merchant fill in",
        "Auto-categorised for your tax return",
        "Bill an expense back to a client in one click",
      ],
      mock: "expenses" as FeatureMock,
    },
    {
      id: "reports",
      label: "Reports",
      title: "Know where the year stands",
      bullets: [
        "Income by client, currency and month",
        "Profit after tax, updated daily",
        "Export to CSV or share with your accountant",
      ],
      mock: "reports" as FeatureMock,
    },
  ],
  mocks: {
    invoices: [
      { id: "#1042", client: "Brightline Studio", amount: "$4,800", status: "Paid" },
      { id: "#1041", client: "Kestrel & Co", amount: "€2,150", status: "Viewed" },
      { id: "#1040", client: "Orbital Labs", amount: "£1,900", status: "Sent" },
      { id: "#1039", client: "Fieldnote", amount: "$760", status: "Paid" },
    ],
    currency: [
      { code: "USD", name: "US dollar", balance: "$12,480.00" },
      { code: "EUR", name: "Euro", balance: "€3,205.40" },
      { code: "GBP", name: "British pound", balance: "£1,118.75" },
      { code: "JPY", name: "Japanese yen", balance: "¥84,000" },
    ],
    pots: [
      { name: "Tax", saved: "$9,120", goal: "$12,000", pct: 76 },
      { name: "Savings", saved: "$3,040", goal: "$5,000", pct: 61 },
      { name: "Equipment", saved: "$640", goal: "$2,400", pct: 27 },
    ],
    expenses: [
      { merchant: "Figma", category: "Software", amount: "$15.00" },
      { merchant: "Coworking day pass", category: "Workspace", amount: "$28.00" },
      { merchant: "Train to client", category: "Travel", amount: "$42.60" },
      { merchant: "Font licence", category: "Software", amount: "$9.99" },
    ],
    reports: {
      caption: "Income, last 6 months",
      total: "$41,860",
      bars: [
        { month: "May", value: 52 },
        { month: "Jun", value: 68 },
        { month: "Jul", value: 44 },
        { month: "Aug", value: 81 },
        { month: "Sep", value: 73 },
        { month: "Oct", value: 95 },
      ],
    },
  },
};

export const audiences = {
  label: "Who it's for",
  title: "Built for people who invoice for a living.",
  usesLabel: "What they use most",
  tabs: [
    {
      id: "designers",
      avatar: "avatar1" as PhotoKey,
      uses: ["Branded invoices", "Card payments", "Tax pots"],
      image: "designer" as PhotoKey,
      label: "Designers",
      metric: "Paid 11 days faster",
      metricNote: "Average across design clients after switching",
      quote: "I used to send a PDF and hope. Now clients pay from a link, and the reminders are polite enough that I don't have to be.",
      name: "Mara Kent",
      role: "Brand designer, Lisbon",
    },
    {
      id: "developers",
      avatar: "avatar2" as PhotoKey,
      uses: ["USD + EUR accounts", "Hold balances", "0.5% FX"],
      image: "developer" as PhotoKey,
      label: "Developers",
      metric: "$1,240 saved on FX",
      metricNote: "In the first year, on USD and EUR contracts",
      quote: "My clients are in three currencies. I hold each balance and convert when I need to, not when the bank decides.",
      name: "Arjun Shah",
      role: "Freelance engineer, Bangalore",
    },
    {
      id: "writers",
      avatar: "avatar3" as PhotoKey,
      uses: ["28% tax pot", "Quarterly reminders", "Expenses"],
      image: "writer" as PhotoKey,
      label: "Writers",
      metric: "0 surprise tax bills",
      metricNote: "Since setting a 28% tax pot",
      quote: "Part of every payment goes into a pot I can't touch. April is boring now, which is exactly what I wanted.",
      name: "Jo Ruiz",
      role: "Copywriter, Austin",
    },
    {
      id: "studios",
      avatar: "avatar4" as PhotoKey,
      uses: ["5 seats", "Approvals", "Accountant export"],
      image: "studio" as PhotoKey,
      label: "Small studios",
      metric: "4 hours back a week",
      metricNote: "On invoicing and reconciliation",
      quote: "Five of us, one shared account, approvals on anything over $2,000. Our accountant gets a clean export every quarter.",
      name: "Lena Park",
      role: "Founder, Parallel Studio",
    },
  ],
};

export const security = {
  label: "Security",
  title: "Built like a bank account, because it is one.",
  line: "Your money sits with licensed banking partners, never with us.",
  badges: [
    { title: "Bank-grade encryption", text: "AES-256 at rest, TLS 1.3 in transit." },
    { title: "Two-factor login", text: "App-based codes or a hardware key." },
    { title: "Licensed banking partners", text: "Funds are held in segregated accounts." },
    { title: "GDPR ready", text: "EU data stays in the EU. Export or delete it any time." },
  ],
};

export const pricingPreview = {
  label: "Pricing",
  title: "Start free. Upgrade when the invoices do.",
  sub: "No setup fees. No minimums. Cancel any time.",
  link: { label: "Compare all plans", href: "/pricing#compare" },
};

export const blogPreview = {
  label: "Blog",
  title: "Notes on getting paid. Five minutes each.",
  sub: "Practical guides on invoicing, currency and tax for people who work for themselves.",
  link: { label: "Read all articles", href: "/blog" },
  count: 3,
};

export const faqSection = {
  label: "FAQ",
  title: "Questions, answered.",
  sub: "Can't find what you need?",
  link: { label: "Contact support", href: "/contact" },
};

export const finalCta = {
  title: "Your next invoice could already be paid.",
  sub: "Setup takes about 4 minutes. No card needed.",
  button: { label: "Start free", href: "/pricing#plans" },
  secondary: { label: "Talk to us", href: "/contact" },
  points: ["Free plan, no time limit", "Cancel any time", "Money held by licensed banks"],
  stamp: "$0 DUE",
  header: "Receipt",
  lines: [
    { label: "Setup fee", value: "$0.00" },
    { label: "Solo plan, monthly", value: "$0.00" },
    { label: "Time to first invoice", value: "30 sec" },
  ],
  total: { label: "Due today", value: "$0.00" },
};

export const contact = {
  title: "Talk to a person.",
  sub: "Questions about fees, a payment that hasn't arrived, or moving your studio over. A person reads every message.",
  formTitle: "Send us a message",
  topics: ["Getting started", "A payment or payout", "Pricing and plans", "Studio accounts", "Something else"],
  fields: {
    name: { label: "Your name", placeholder: "Alex Morgan" },
    email: { label: "Email", placeholder: "alex@studio.com" },
    topic: { label: "Topic", placeholder: "Choose a topic" },
    message: { label: "Message", placeholder: "Tell us what's going on. Include an invoice number if it's about a payment." },
  },
  errors: {
    name: "Enter your name.",
    email: "Enter a valid email address.",
    topic: "Choose a topic.",
    message: "Write at least 20 characters so we can help.",
  },
  submit: "Send message",
  success: {
    title: "Message received",
    sub: "We've logged your message. A reply will reach your inbox soon.",
    reply: "Under 4 hours",
    status: "RECEIVED",
    again: "Send another message",
  },
  cards: [
    { title: "Email", text: "support@ledgerly.example", href: "mailto:support@ledgerly.example", cta: "Write to us" },
    { title: "Help center", text: "Guides on fees, payouts, tax pots and team accounts.", href: "/blog", cta: "Browse guides" },
    { title: "Replies in under 4 hours", text: "Monday to Friday, 07:00–22:00 UTC. Weekend replies within a day.", href: "/#faq", cta: "Read the FAQ" },
  ],
};

export const notFoundCopy = {
  title: "This page never got paid.",
  sub: "It might have moved, or never existed.",
  stamp: "404 · UNPAID",
  receipt: "Receipt #404",
  lines: { page: "Page requested", amount: "Amount found", status: "Status" },
  amount: "$0.00",
  status: "NOT FOUND",
  primary: { label: "Back to home", href: "/" },
  secondary: { label: "Contact support", href: "/contact" },
};
