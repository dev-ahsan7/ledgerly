"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useRef, useState, type FormEvent } from "react";
import { contact } from "@/lib/site";
import { ReceiptCard, ReceiptDivider } from "@/components/ui/ReceiptCard";
import { LineItem } from "@/components/ui/LineItem";
import { Button } from "@/components/ui/Button";
import { Stamp } from "@/components/ui/Stamp";
import { cn } from "@/lib/format";

type Values = { name: string; email: string; topic: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const empty: Values = { name: "", email: "", topic: "", message: "" };

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = contact.errors.name;
  if (!EMAIL_RE.test(v.email.trim())) e.email = contact.errors.email;
  if (!v.topic) e.topic = contact.errors.topic;
  if (v.message.trim().length < 20) e.message = contact.errors.message;
  return e;
}

export function ContactForm() {
  const id = useId();
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [ticket, setTicket] = useState<{ no: string; time: string; values: Values } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const f = contact.fields;

  function update<K extends keyof Values>(key: K, value: string) {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key]) setErrors(validate(next));
  }

  function blur(key: keyof Values) {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(values));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, topic: true, message: true });
    const firstBad = (Object.keys(found) as (keyof Values)[])[0];
    if (firstBad) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }
    const now = new Date();
    setTicket({
      no: `LG-${String(Math.floor(100000 + Math.random() * 900000))}`,
      time: now.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }),
      values,
    });
    requestAnimationFrame(() => successRef.current?.focus());
  }

  function reset() {
    setValues(empty);
    setErrors({});
    setTouched({});
    setTicket(null);
  }

  const err = (k: keyof Values) => (touched[k] ? errors[k] : undefined);
  const fieldProps = (k: keyof Values) => ({
    id: `${id}-${k}`,
    name: k,
    value: values[k],
    onBlur: () => blur(k),
    "aria-invalid": !!err(k),
    "aria-describedby": err(k) ? `${id}-${k}-err` : undefined,
    className: cn("input mt-2", err(k) && "border-danger"),
  });
  const ErrorText = ({ k }: { k: keyof Values }) =>
    err(k) ? (
      <p id={`${id}-${k}-err`} className="mt-2 text-sm text-danger">
        {err(k)}
      </p>
    ) : null;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {ticket ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          ref={successRef}
          tabIndex={-1}
          role="status"
          className="outline-none"
        >
          <ReceiptCard innerClassName="p-8 md:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Ticket {ticket.no}</p>
                <h2 className="mt-2 font-display text-3xl font-heading tracking-tight">{contact.success.title}</h2>
              </div>
              <Stamp delay={0.3} rotate={-10} className="mt-2 shrink-0">
                {contact.success.status}
              </Stamp>
            </div>
            <p className="mt-3 text-muted">{contact.success.sub}</p>
            <ReceiptDivider className="my-6" />
            <div className="space-y-3">
              <LineItem label="From" value={ticket.values.name} mono={false} />
              <LineItem label="Reply to" value={ticket.values.email} mono={false} />
              <LineItem label="Topic" value={ticket.values.topic} mono={false} />
              <LineItem label="Received" value={ticket.time} />
            </div>
            <ReceiptDivider className="my-6" />
            <LineItem strong label="Expected reply" value={contact.success.reply} />
            <Button variant="secondary" className="mt-8" onClick={reset}>
              {contact.success.again}
            </Button>
          </ReceiptCard>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          ref={formRef}
          noValidate
          onSubmit={onSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -8 }}
          className="card space-y-5 p-6 md:p-8"
          aria-labelledby={`${id}-title`}
        >
          <h2 id={`${id}-title`} className="text-xl font-semibold">
            {contact.formTitle}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor={`${id}-name`} className="text-sm font-medium">
                {f.name.label}
              </label>
              <input {...fieldProps("name")} autoComplete="name" placeholder={f.name.placeholder} onChange={(e) => update("name", e.target.value)} />
              <ErrorText k="name" />
            </div>
            <div>
              <label htmlFor={`${id}-email`} className="text-sm font-medium">
                {f.email.label}
              </label>
              <input
                {...fieldProps("email")}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder={f.email.placeholder}
                onChange={(e) => update("email", e.target.value)}
              />
              <ErrorText k="email" />
            </div>
          </div>
          <div>
            <label htmlFor={`${id}-topic`} className="text-sm font-medium">
              {f.topic.label}
            </label>
            <select {...fieldProps("topic")} onChange={(e) => update("topic", e.target.value)}>
              <option value="" disabled>
                {f.topic.placeholder}
              </option>
              {contact.topics.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <ErrorText k="topic" />
          </div>
          <div>
            <label htmlFor={`${id}-message`} className="text-sm font-medium">
              {f.message.label}
            </label>
            <textarea
              {...fieldProps("message")}
              rows={6}
              placeholder={f.message.placeholder}
              onChange={(e) => update("message", e.target.value)}
            />
            <ErrorText k="message" />
          </div>
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            {contact.submit}
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
