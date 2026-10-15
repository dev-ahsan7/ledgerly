"use client";

import { useId, useState, type FormEvent } from "react";
import { footer } from "@/lib/site";
import { ArrowRightIcon, CheckIcon } from "./Icons";
import { cn } from "@/lib/format";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Client-only newsletter signup with a fake success state. */
export function NewsletterForm({ className }: { className?: string }) {
  const copy = footer.newsletter;
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError(copy.invalid);
      return;
    }
    setError("");
    setDone(true);
  }

  if (done) {
    return (
      <p role="status" className={cn("flex items-center gap-2 rounded border border-line bg-surface px-4 py-3 text-sm", className)}>
        <CheckIcon width={18} height={18} />
        {copy.success}
      </p>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className={className}>
      <label htmlFor={`${id}-email`} className="sr-only">
        {copy.label}
      </label>
      <div className="flex gap-2">
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder={copy.placeholder}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className="input min-w-0 flex-1"
        />
        <button
          type="submit"
          className="inline-flex h-[46px] shrink-0 items-center gap-2 rounded bg-accent px-4 text-sm font-medium text-accent-ink hover:bg-accent/85"
        >
          {copy.button}
          <ArrowRightIcon width={16} height={16} />
        </button>
      </div>
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-2 text-sm text-danger">
          {error}
        </p>
      )}
    </form>
  );
}
