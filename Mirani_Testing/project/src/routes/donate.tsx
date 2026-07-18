import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { campaigns } from "@/lib/site-data";
import { Lock, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — Mirani Foundation" },
      { name: "description", content: "Support our work in health, education and social justice. Secure payment via Razorpay." },
      { property: "og:title", content: "Donate to Mirani Foundation" },
      { property: "og:url", content: "/donate" },
    ],
    links: [{ rel: "canonical", href: "/donate" }],
  }),
  component: DonatePage,
});

const PRESETS = [500, 1000, 2500, 5000];

function DonatePage() {
  const [amount, setAmount] = useState<number>(1000);
  const [custom, setCustom] = useState("");
  const [campaign, setCampaign] = useState("General fund");
  const [anon, setAnon] = useState(false);
  const [createAcct, setCreateAcct] = useState(false);
  const [done, setDone] = useState(false);

  const finalAmount = custom ? Number(custom) : amount;

  return (
    <SiteLayout>
      <section className="bg-cream section-y">
        <div className="container-mirani grid lg:grid-cols-[1.1fr_1fr] gap-10 items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-on-light dark:text-brand cb:text-brand">
              Donate
            </p>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold text-ink leading-tight">
              Your gift becomes a medical camp, a classroom, a courtroom.
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Every rupee is tracked and reported. Every donor receives a receipt. Every donation is 80G tax-exempt.
            </p>
            <ul className="mt-8 space-y-3 text-ink">
              {[
                "₹500 pays for one health checkup camp slot",
                "₹2,500 keeps a Learning Lamps scholar in school for a month",
                "₹5,000 funds a full women's legal literacy workshop",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-on-light dark:text-brand cb:text-brand mt-0.5 shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-card border border-border p-8 shadow-sm">
            {done ? (
              <div className="text-center py-10">
                <div className="mx-auto w-14 h-14 rounded-full bg-brand/15 text-brand-on-light dark:text-brand cb:text-brand flex items-center justify-center">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h2 className="mt-4 text-2xl font-bold text-ink">Thank you!</h2>
                <p className="mt-2 text-muted-foreground text-sm">
                  Your donation of ₹{finalAmount.toLocaleString()} has been received. A receipt is on its way to your email.
                </p>
                <button onClick={() => setDone(false)} className="mt-6 btn-outline-ink btn-outline-ink-hover">
                  Make another donation
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setDone(true);
                }}
                className="grid gap-5"
              >
                <div>
                  <label className="text-sm font-semibold text-ink">Choose an amount</label>
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {PRESETS.map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => {
                          setAmount(a);
                          setCustom("");
                        }}
                        className={`rounded-lg border py-3 text-sm font-semibold transition-colors ${
                          amount === a && !custom
                            ? "bg-brand-on-light text-white border-brand-on-light"
                            : "border-border text-ink hover:border-ink"
                        }`}
                      >
                        ₹{a.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={custom}
                    onChange={(e) => setCustom(e.target.value)}
                    placeholder="Or enter a custom amount"
                    min={100}
                    className="mt-3 w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-ink">Direct your donation</label>
                  <select
                    value={campaign}
                    onChange={(e) => setCampaign(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:border-brand"
                  >
                    <option>General fund</option>
                    {campaigns.map((c) => (
                      <option key={c.slug}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-3">
                  <input type="text" placeholder="Full name" required className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
                  <input type="email" placeholder="Email" required className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
                  <input type="tel" placeholder="Phone (10 digits)" pattern="[6-9][0-9]{9}" required className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
                </div>

                <label className="flex items-start gap-3 text-sm text-ink">
                  <input type="checkbox" checked={anon} onChange={(e) => setAnon(e.target.checked)} className="mt-0.5 accent-brand" />
                  <span>Make this an anonymous donation (name will not appear in any public listing).</span>
                </label>
                <label className="flex items-start gap-3 text-sm text-ink">
                  <input type="checkbox" checked={createAcct} onChange={(e) => setCreateAcct(e.target.checked)} className="mt-0.5 accent-brand" />
                  <span>Create an account so I can track my donation history.</span>
                </label>

                <button type="submit" className="btn-brand btn-brand-hover w-full text-base">
                  Donate ₹{(finalAmount || 0).toLocaleString()}
                </button>
                <p className="text-xs text-muted-foreground text-center inline-flex items-center justify-center gap-1.5">
                  <Lock className="h-3 w-3" /> Secure payment via Razorpay · 80G tax-exempt
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
