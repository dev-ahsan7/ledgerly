export type LegalDoc = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
};

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy",
    title: "Privacy policy",
    description: "What data Ledgerly collects, why, and how you can control it.",
    updated: "2026-09-01",
    sections: [
      {
        heading: "Who we are",
        body: [
          "Ledgerly is a fictional product used for demonstration. This policy is sample text and does not create any legal obligation.",
          "In this example, Ledgerly is the controller of personal data processed through the website and app.",
        ],
      },
      {
        heading: "What we collect",
        body: [
          "Account details you give us: name, email, business name and country.",
          "Payment information needed to send and receive money, processed by our licensed banking partners.",
          "Usage data such as pages visited and features used, collected only with your consent where required.",
        ],
      },
      {
        heading: "How we use it",
        body: [
          "To run your account, process payments, prevent fraud and meet legal requirements such as identity checks.",
          "To send service emails. Marketing emails are opt-in and every one has an unsubscribe link.",
        ],
      },
      {
        heading: "Where it's stored",
        body: ["Data for EU and UK customers is stored in the EU. Transfers outside the EU use standard contractual clauses."],
      },
      {
        heading: "Your rights",
        body: [
          "You can access, correct, export or delete your data from Settings, or by writing to privacy@ledgerly.example.",
          "Some records, such as transaction history, must be kept for a set period by law even after you close your account.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of service",
    description: "The agreement between you and Ledgerly when you use the product.",
    updated: "2026-09-01",
    sections: [
      {
        heading: "About these terms",
        body: [
          "Ledgerly is a fictional product used for demonstration. These terms are sample text and do not form a contract.",
        ],
      },
      {
        heading: "Your account",
        body: [
          "You must be 18 or older and use Ledgerly for business purposes. You're responsible for keeping your login and second factor secure.",
        ],
      },
      {
        heading: "Fees",
        body: [
          "Plan prices and FX fees are listed on the pricing page. We'll give you at least 30 days' notice before any price change.",
        ],
      },
      {
        heading: "Money in your account",
        body: [
          "Funds are held by licensed banking partners in segregated accounts. Ledgerly does not lend or invest your balance.",
        ],
      },
      {
        heading: "Ending the agreement",
        body: [
          "You can close your account at any time from Settings. We may close accounts used for fraud or prohibited activity, with notice where the law allows.",
        ],
      },
    ],
  },
];

export function getLegalDoc(slug: string) {
  return legalDocs.find((d) => d.slug === slug);
}
