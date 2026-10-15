/**
 * Two-tone headline: the first sentence in ink, anything after it muted.
 * "Getting paid shouldn't be a second job." stays one tone;
 * "Three steps. No spreadsheet." renders "No spreadsheet." in grey.
 */
export function Title({ text }: { text: string }) {
  const match = text.match(/^(.+?[.!?])\s+(.+)$/);
  if (!match) return <>{text}</>;
  return (
    <>
      {match[1]} <span className="title-muted">{match[2]}</span>
    </>
  );
}
