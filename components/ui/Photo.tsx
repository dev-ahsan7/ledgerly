import Image from "next/image";
import { photos, photoSrc, type PhotoKey } from "@/lib/images";
import { cn } from "@/lib/format";

type Props = {
  name: PhotoKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Decorative photos get an empty alt so screen readers skip them. */
  decorative?: boolean;
};

/** Stock photo that fills its (relative, sized) parent. */
export function Photo({ name, className, sizes = "(min-width: 1100px) 50vw, 100vw", priority, decorative }: Props) {
  return (
    <Image
      src={photoSrc(name)}
      alt={decorative ? "" : photos[name].alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn("object-cover", className)}
    />
  );
}
