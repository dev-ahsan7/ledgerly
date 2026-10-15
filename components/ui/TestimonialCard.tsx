import { Avatar } from "./Avatar";
import type { Testimonial } from "@/lib/testimonials";
import { cn } from "@/lib/format";

type Props = Testimonial & { index?: number; className?: string };

export function TestimonialCard({ quote, name, role, initials, photo, index = 0, className }: Props) {
  return (
    <figure className={cn("card flex h-full flex-col justify-between p-6", className)}>
      <blockquote className="text-base leading-relaxed">
        <p>&ldquo;{quote}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <Avatar initials={initials} photo={photo} index={index} size="md" />
        <span className="text-sm">
          <span className="block font-medium">{name}</span>
          <span className="block text-muted">{role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
