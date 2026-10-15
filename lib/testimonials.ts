import type { PhotoKey } from "./images";

export type Testimonial = { quote: string; name: string; role: string; initials: string; photo: PhotoKey };

export const testimonialsCopy = {
  label: "Customers",
  title: "Less admin. More invoices paid.",
  rowLabel: "More customer stories",
};

export const featuredTestimonial = {
  quote:
    "I invoice clients in four countries. Ledgerly is the first tool where I don't open a spreadsheet afterwards. The tax pot alone paid for the subscription in the first quarter.",
  name: "Sofia Lindqvist",
  role: "Motion designer, Stockholm",
  initials: "SL",
  photo: "sofia" as PhotoKey,
  metric: "$18,400",
  metricLabel: "set aside for tax in 2025, automatically",
  stats: [
    { value: "$18,400", label: "Set aside for tax in 2025" },
    { value: "4", label: "Currencies paid in" },
    { value: "9 days", label: "Average time to paid" },
  ],
};

export const testimonials: Testimonial[] = [
  { quote: "Clients in the US pay me through a local account number. No more $35 wire fees disappearing.", name: "Tomás Oliveira", role: "Developer, Porto", initials: "TO", photo: "tomas" },
  { quote: "Reminders do the awkward part. My average wait went from five weeks to under two.", name: "Priya Nair", role: "Illustrator, Pune", initials: "PN", photo: "priya" },
  { quote: "Approvals mean nobody on the team sends an invoice with the wrong rate again.", name: "Daniel Okafor", role: "Studio lead, Lagos", initials: "DO", photo: "daniel" },
  { quote: "The split happens before I see the money, so I don't spend the tax by accident.", name: "Hannah Becker", role: "Photographer, Berlin", initials: "HB", photo: "hannah" },
  { quote: "Holding euros until the rate is decent has saved me more than the plan costs.", name: "Lucas Moreau", role: "UX writer, Montréal", initials: "LM", photo: "lucas" },
  { quote: "Our accountant asked what changed. The quarterly export is the answer.", name: "Grace Liu", role: "Co-founder, Fieldnote", initials: "GL", photo: "grace" },
];
