// Stock photography. All photos are from Unsplash (free licence, not Unsplash+)
// and are served from Unsplash's CDN, as their guidelines ask.
// To swap a photo, change its `id` (the "photo-…" part of an images.unsplash.com URL).

export type Photo = {
  id: string;
  alt: string;
  credit: { name: string; username: string };
};

export const photos = {
  hero: {
    id: "photo-1496181133206-80ce9b88a853",
    alt: "Laptop on a wooden desk with a small plant",
    credit: { name: "Kari Shea", username: "karishea" },
  },
  designer: {
    id: "photo-1572044162444-ad60f128bdea",
    alt: "Designer working on a drawing tablet next to colour swatches",
    credit: { name: "Theme Photos", username: "themephotos" },
  },
  developer: {
    id: "photo-1508830524289-0adcbe822b40",
    alt: "Laptop showing code on a desk",
    credit: { name: "AltumCode", username: "altumcode" },
  },
  writer: {
    id: "photo-1462642109801-4ac2971a3a51",
    alt: "Fountain pen resting on a lined notebook",
    credit: { name: "Aaron Burden", username: "aaronburden" },
  },
  studio: {
    id: "photo-1603202662747-00e33e7d1468",
    alt: "Small team meeting around a table in a studio",
    credit: { name: "Cherrydeck", username: "cherrydeck" },
  },
  overseas: {
    id: "photo-1768793096346-6d84e93e4195",
    alt: "Person working on a laptop by an airport window at sunrise",
    credit: { name: "Daniel Gomez", username: "naturelensephotographer" },
  },
  tax: {
    id: "photo-1709880945165-d2208c6ad2ec",
    alt: "Calculator and receipts on a desk next to a laptop",
    credit: { name: "Jakub Żerdzicki", username: "jakubzerdzicki" },
  },
  rates: {
    id: "photo-1710362921917-2e33bb342a23",
    alt: "Two people talking over coffee at a wooden table",
    credit: { name: "Phil Desforges", username: "storybyphil" },
  },
  fx: {
    id: "photo-1621280336935-ed7cae618aac",
    alt: "Pile of euro banknotes in different denominations",
    credit: { name: "Ibrahim Boran", username: "ibrahimboran" },
  },
  checklist: {
    id: "photo-1632772998001-cc9bf6f7c852",
    alt: "Monthly planner with two pens",
    credit: { name: "2H Media", username: "2hmedia" },
  },
  team: {
    id: "photo-1553028826-f4804a6dba3b",
    alt: "Team working around a long wooden table",
    credit: { name: "CoWomen", username: "cowomen" },
  },
  // Portraits for testimonials and the hero trust row. The names and quotes on the
  // site are fictional placeholders; replace with real customers before launch.
  sofia: { id: "photo-1627161683077-e34782c24d81", alt: "Portrait of Sofia Lindqvist", credit: { name: "Clay Elliot", username: "ibidsy" } },
  tomas: { id: "photo-1500648767791-00dcc994a43e", alt: "Portrait of Tomás Oliveira", credit: { name: "Jurica Koletić", username: "juricakoletic" } },
  priya: { id: "photo-1581065178047-8ee15951ede6", alt: "Portrait of Priya Nair", credit: { name: "Annika Palmari", username: "palmariannika" } },
  daniel: { id: "photo-1595211877493-41a4e5f236b3", alt: "Portrait of Daniel Okafor", credit: { name: "Ryan Hoffman", username: "ryanhoffman007" } },
  hannah: { id: "photo-1701096374092-bb70915fdc5c", alt: "Portrait of Hannah Becker", credit: { name: "Troy Spoelma", username: "spoelee4" } },
  lucas: { id: "photo-1560250097-0b93528c311a", alt: "Portrait of Lucas Moreau", credit: { name: "LinkedIn Sales Solutions", username: "linkedinsalesnavigator" } },
  grace: { id: "photo-1573497019940-1c28c88b4f3e", alt: "Portrait of Grace Liu", credit: { name: "Christina @ wocintechchat.com", username: "wocintechchat" } },
  avatar1: { id: "photo-1494790108377-be9c29b29330", alt: "Ledgerly customer", credit: { name: "Michael Dam", username: "michaeldam" } },
  avatar2: { id: "photo-1705645930353-0e335311ef20", alt: "Ledgerly customer", credit: { name: "Danny Postma", username: "dannypostma" } },
  avatar3: { id: "photo-1573496358961-3c82861ab8f4", alt: "Ledgerly customer", credit: { name: "Christina @ wocintechchat.com", username: "wocintechchat" } },
  avatar4: { id: "photo-1507003211169-0a1dd7228f2d", alt: "Ledgerly customer", credit: { name: "Joseph Gonzalez", username: "miracletwentyone" } },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

/** Base CDN URL; next/image adds width and quality. */
export function photoSrc(key: PhotoKey, faces = false) {
  return `https://images.unsplash.com/${photos[key].id}?auto=format&fit=crop${faces ? "&crop=faces&ar=1:1" : ""}`;
}

export function creditUrl(username: string) {
  return `https://unsplash.com/@${username}?utm_source=ledgerly&utm_medium=referral`;
}
