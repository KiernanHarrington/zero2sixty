"use client";

import { useState, type FormEvent } from "react";

const INSTAGRAM = "https://www.instagram.com/rotorpros_braking/";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-20">
      <header className="text-center mb-14">
        <p className="kicker">We&apos;re Here</p>
        <h1 className="headline text-5xl sm:text-6xl mt-3">Contact Us</h1>
        <p className="mt-4 text-muted max-w-xl mx-auto">
          Fitment questions, build advice, or order help — talk to a real human
          who actually drives.
        </p>
      </header>

      <div className="grid md:grid-cols-5 gap-10">
        {/* form */}
        <div className="md:col-span-3">
          {sent ? (
            <div className="panel cut-corner p-10 text-center">
              <div className="w-16 h-16 mx-auto grid place-items-center bg-blue text-white text-2xl cut-corner glow">
                ✓
              </div>
              <h2 className="headline text-3xl mt-6">Message Sent</h2>
              <p className="mt-3 text-muted">
                Thanks for reaching out. We&apos;ll get back to you within one
                business day.
              </p>
              <button
                onClick={() => setSent(false)}
                className="btn btn-ghost mt-7"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="panel cut-corner p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Name">
                  <input required name="name" className="field" autoComplete="name" />
                </Field>
                <Field label="Email">
                  <input
                    required
                    type="email"
                    name="email"
                    className="field"
                    autoComplete="email"
                  />
                </Field>
              </div>
              <Field label="Vehicle (optional)">
                <input
                  name="vehicle"
                  className="field"
                  placeholder="Year / Make / Model"
                />
              </Field>
              <Field label="How can we help?">
                <textarea
                  required
                  name="message"
                  rows={5}
                  className="field resize-none"
                  placeholder="Tell us about your build or question…"
                />
              </Field>
              <button type="submit" className="btn btn-primary w-full">
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* info */}
        <aside className="md:col-span-2 space-y-4">
          <InfoCard title="Email" value="support@zero2sixty.com" href="mailto:support@zero2sixty.com" />
          <InfoCard title="Phone" value="(555) 026-0600" href="tel:+15550260600" />
          <InfoCard
            title="Instagram"
            value="@rotorpros_braking"
            href={INSTAGRAM}
            external
          />
          <div className="panel cut-corner p-6">
            <h3 className="text-xs uppercase tracking-widest text-muted mb-2">
              Hours
            </h3>
            <p className="text-sm leading-relaxed">
              Mon–Fri · 8:00–18:00
              <br />
              Sat · 9:00–14:00
              <br />
              <span className="text-muted">Sun · Track day 🏁</span>
            </p>
          </div>
          <div className="panel cut-corner p-6">
            <h3 className="text-xs uppercase tracking-widest text-muted mb-2">
              Workshop
            </h3>
            <p className="text-sm leading-relaxed">
              60 Apex Drive
              <br />
              Brake City, CA 90060
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-muted mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}

function InfoCard({
  title,
  value,
  href,
  external,
}: {
  title: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="panel cut-corner p-6 block group hover:border-blue-bright transition-colors"
    >
      <h3 className="text-xs uppercase tracking-widest text-muted mb-2">
        {title}
      </h3>
      <p className="font-display text-xl group-hover:text-blue-bright transition-colors">
        {value}
      </p>
    </a>
  );
}
