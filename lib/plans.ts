export type BillingPeriod = "monthly" | "yearly";

export type Plan = {
  id: "solo" | "pro" | "studio";
  name: string;
  monthly: number;
  blurb: string;
  fxFee: number; // percent of converted volume
  /** The three numbers that matter most, shown as receipt rows. */
  keys: { label: string; value: string }[];
  /** Heading above the feature list, e.g. "Everything in Solo, plus". */
  includesLabel: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
  badge?: string;
};

export const plans: Plan[] = [
  {
    id: "solo",
    name: "Solo",
    monthly: 0,
    blurb: "For your first international clients.",
    fxFee: 1,
    keys: [
      { label: "FX fee", value: "1%" },
      { label: "Currency accounts", value: "1" },
      { label: "Invoices", value: "5 / mo" },
    ],
    includesLabel: "Includes",
    features: ["Card and bank payments", "Branded invoice templates", "1 split rule", "Quarterly tax reminders"],
    cta: { label: "Start free", href: "/contact" },
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 12,
    blurb: "For full-time freelancers.",
    fxFee: 0.5,
    keys: [
      { label: "FX fee", value: "0.5%" },
      { label: "Currency accounts", value: "10" },
      { label: "Invoices", value: "Unlimited" },
    ],
    includesLabel: "Everything in Solo, plus",
    features: ["Tax pots and unlimited split rules", "Automatic reminders", "Recurring invoices", "Instant payouts", "3.1% interest on pots"],
    cta: { label: "Start 30-day trial", href: "/contact" },
    featured: true,
    badge: "Most popular",
  },
  {
    id: "studio",
    name: "Studio",
    monthly: 29,
    blurb: "For small teams sharing one account.",
    fxFee: 0.4,
    keys: [
      { label: "FX fee", value: "0.4%" },
      { label: "Seats", value: "5" },
      { label: "Invoices", value: "Unlimited" },
    ],
    includesLabel: "Everything in Pro, plus",
    features: ["Approvals before sending", "Roles and permissions", "Accountant access and exports", "Priority support, under 1 hour"],
    cta: { label: "Start 30-day trial", href: "/contact" },
  },
];

/** Shown once under the plan cards instead of repeating in every card. */
export const everyPlan = {
  label: "Every plan includes",
  items: ["Card, bank and local transfers", "Funds held by licensed banks", "Two-factor login", "Cancel any time"],
};

export const pricingCopy = {
  toggleLabel: "Billing period",
  monthly: "Monthly",
  yearly: "Yearly",
  yearlyNote: "2 months free",
  perMonth: "/mo",
  free: "Free forever",
  billedYearly: (total: number) => `Billed $${total} yearly`,
  billedMonthly: "Billed monthly",
  save: (amount: number) => `Save $${amount} a year`,
};

/** Yearly billing charges 10 months for 12. Returns the effective monthly price. */
export function priceFor(plan: Plan, period: BillingPeriod) {
  if (period === "monthly") return { perMonth: plan.monthly, yearlyTotal: plan.monthly * 12 };
  const yearlyTotal = plan.monthly * 10;
  return { perMonth: Math.round((yearlyTotal / 12) * 100) / 100, yearlyTotal };
}

export const pricingPage = {
  title: "Simple pricing. No surprise fees.",
  sub: "Every plan includes card, bank and local transfers. You only pay a conversion fee when money changes currency.",
  compareTitle: "Compare all plans",
  compareSub: "Everything in each plan, side by side.",
  scrollHint: "Scroll sideways to see all plans",
  calculatorTitle: "What would you pay?",
  calculatorSub: "Enter what you invoice in a typical month. We'll show the plan price plus FX fees on each plan.",
};

export type Cell = boolean | string;
export type ComparisonGroup = { group: string; rows: { label: string; values: [Cell, Cell, Cell] }[] };

export const comparison: ComparisonGroup[] = [
  {
    group: "Invoicing",
    rows: [
      { label: "Invoices per month", values: ["5", "Unlimited", "Unlimited"] },
      { label: "Branded templates", values: [true, true, true] },
      { label: "Automatic reminders", values: [false, true, true] },
      { label: "Recurring invoices", values: [false, true, true] },
      { label: "Approvals before sending", values: [false, false, true] },
    ],
  },
  {
    group: "Payments",
    rows: [
      { label: "Card, bank and local transfer", values: [true, true, true] },
      { label: "Currency accounts", values: ["1", "10", "10"] },
      { label: "FX fee", values: ["1%", "0.5%", "0.4%"] },
      { label: "Instant payouts", values: [false, true, true] },
    ],
  },
  {
    group: "Tax and savings",
    rows: [
      { label: "Split rules", values: ["1 rule", "Unlimited", "Unlimited"] },
      { label: "Tax pots", values: [false, true, true] },
      { label: "Interest on pots", values: [false, "3.1%", "3.1%"] },
      { label: "Quarterly tax reminders", values: [true, true, true] },
    ],
  },
  {
    group: "Team",
    rows: [
      { label: "Seats", values: ["1", "1", "5"] },
      { label: "Roles and permissions", values: [false, false, true] },
      { label: "Reports and exports", values: ["CSV", "CSV", "CSV + accountant access"] },
      { label: "Support", values: ["Email", "Email", "Priority, under 1 hour"] },
    ],
  },
];

export const calculator = {
  amountLabel: "Monthly invoiced amount",
  currencyLabel: "Paid in",
  currencies: ["USD", "EUR", "GBP"],
  defaultAmount: 6000,
  rows: { plan: "Plan price", fx: "FX fees", total: "Total per month" },
  note: "Assumes the full amount is converted once, with monthly billing. Card payments add the card network fee, which your client pays.",
  best: "Lowest cost",
};
