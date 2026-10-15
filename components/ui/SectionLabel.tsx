import { cn, pad2 } from "@/lib/format";
import { Title } from "./Title";

type Tone = "default" | "inverse";
type Props = { index?: number; children: React.ReactNode; className?: string; tone?: Tone };

/** Section eyebrow: a small tag with the section number in a filled square, then the name. */
export function SectionLabel({ index, children, className, tone = "default" }: Props) {
  const inverse = tone === "inverse";
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-pill border py-1 pl-1 pr-3 text-[13px] font-medium",
        inverse ? "border-inverse-ink/15 bg-inverse-ink/5 text-inverse-ink" : "border-line bg-surface text-ink",
        index === undefined && "pl-3",
        className,
      )}
    >
      {index !== undefined && (
        <span
          className={cn(
            "grid h-5 min-w-5 place-items-center rounded-sm px-1 font-mono text-[10px] tabular",
            inverse ? "bg-inverse-ink text-inverse" : "bg-ink text-bg",
          )}
        >
          {pad2(index)}
        </span>
      )}
      <span>{children}</span>
    </p>
  );
}

type HeaderProps = {
  index?: number;
  label: string;
  title: string;
  sub?: string;
  align?: "left" | "center";
  tone?: Tone;
  className?: string;
  titleId?: string;
};

export function SectionHeader({ index, label, title, sub, align = "left", tone = "default", className, titleId }: HeaderProps) {
  const inverse = tone === "inverse";
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <SectionLabel index={index} tone={tone}>
        {label}
      </SectionLabel>
      <h2 id={titleId} className={cn("h2 mt-5", inverse && "[&_.title-muted]:text-inverse-muted")}>
        <Title text={title} />
      </h2>
      {sub && <p className={cn("lead mt-4 max-w-xl", align === "center" && "mx-auto", inverse && "text-inverse-muted")}>{sub}</p>}
    </div>
  );
}
