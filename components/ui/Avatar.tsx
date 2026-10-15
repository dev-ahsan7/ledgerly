import Image from "next/image";
import { photos, photoSrc, type PhotoKey } from "@/lib/images";
import { cn } from "@/lib/format";

const tones = ["bg-pot-1 text-accent-ink", "bg-pot-2 text-accent-ink", "bg-pot-3 text-ink", "bg-surface-2 text-ink"];
const px = { sm: 32, md: 40, lg: 48, xl: 56 } as const;

type Props = {
  initials: string;
  index?: number;
  size?: keyof typeof px;
  className?: string;
  label?: string;
  /** Profile photo; falls back to initials when absent. */
  photo?: PhotoKey;
};

/** Round avatar: profile photo when given, otherwise initials. Decorative unless a label is given. */
export function Avatar({ initials, index = 0, size = "md", className, label, photo }: Props) {
  const sizeClass =
    size === "sm" ? "h-8 w-8 text-[11px]" : size === "lg" ? "h-12 w-12 text-sm" : size === "xl" ? "h-14 w-14 text-base" : "h-10 w-10 text-xs";
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn(
        "relative inline-grid shrink-0 place-items-center overflow-hidden rounded-full font-semibold ring-2 ring-bg",
        sizeClass,
        !photo && tones[index % tones.length],
        className,
      )}
    >
      {photo ? (
        <Image src={photoSrc(photo, true)} alt={label ? photos[photo].alt : ""} fill sizes={`${px[size]}px`} className="object-cover" />
      ) : (
        initials
      )}
    </span>
  );
}
