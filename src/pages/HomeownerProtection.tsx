import { useState, useEffect, CSSProperties } from "react";
import { useToast } from "@/hooks/use-toast";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";
import { submitForm } from "@/lib/formSubmit";
import { SEOHead } from "@/components/seo";

type InterestKey = "trust" | "mortgage" | "retirement";

const INTERESTS: {
  key: InterestKey;
  label: string;
  note?: string;
  paths: string[];
}[] = [
  {
    key: "trust",
    label: "Protecting my home & assets",
    note: "Living Trust",
    paths: ["m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M9 22V12h6v10"],
  },
  {
    key: "mortgage",
    label: "Mortgage Protection",
    paths: ["M22 12a10.06 10.06 0 0 0-20 0Z", "M12 12v8a2 2 0 0 0 4 0", "M12 2v1"],
  },
  {
    key: "retirement",
    label: "Retirement & Income Planning",
    paths: ["M22 7 13.5 15.5 8.5 10.5 2 17", "M16 7h6v6"],
  },
];

const NAVY = "#1E3A5F";
const GOLD = "#C9A84C";
const GOLD_BRIGHT = "#E4B548";
const TEXT = "#283845";
const MUTED = "#65728A";
const BORDER = "#D8DEE7";
const ERR = "#EF4444";

const inputStyle = (hasErr: boolean): CSSProperties => ({
  width: "100%",
  boxSizing: "border-box",
  fontFamily: "inherit",
  fontSize: 15,
  padding: "12px 14px",
  border: `1.5px solid ${hasErr ? ERR : BORDER}`,
  borderRadius: 10,
  background: "#FFFFFF",
  color: TEXT,
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
});

const labelStyle: CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: NAVY,
};

const errStyle: CSSProperties = { fontSize: 12.5, color: ERR };

const formatPhone = (v: string) => {
  const d = (v || "").replace(/\D/g, "").slice(0, 10);
  if (d.length > 6) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  if (d.length > 3) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  if (d.length) return `(${d}`;
  return "";
};

const HomeownerProtection = () => {
  const { toast } = useToast();
  const { honeypotProps, isBot, honeypotValue } = useHoneypot();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [interests, setInterests] = useState<Record<InterestKey, boolean>>({
    trust: false,
    mortgage: false,
    retirement: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [shaking, setShaking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [hidden, setHidden] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    referral_partner: "",
    lead_source: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setHidden({
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_content: params.get("utm_content") || "",
      referral_partner: params.get("referral_partner") || "",
      lead_source: params.get("lead_source") || "",
    });
  }, []);

  const clearErr = (k: string) =>
    setErrors((prev) => {
      if (!prev[k]) return prev;
      const { [k]: _drop, ...rest } = prev;
      return rest;
    });

  const toggleInterest = (k: InterestKey) => {
    setInterests((s) => ({ ...s, [k]: !s[k] }));
    clearErr("interests");
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(email.trim()))
      e.email = "Please enter a valid email address.";
    if (phone.replace(/\D/g, "").length < 10)
      e.phone = "Please enter a 10-digit phone number.";
    if (!interests.trust && !interests.mortgage && !interests.retirement)
      e.interests = "Please choose at least one topic.";
    if (!consent)
      e.consent =
        "Please check the box above so a licensed advisor can reach out.";
    return e;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (submitting || submitted) return;
    if (isBot()) {
      setSubmitted(true);
      return;
    }
    const eMap = validate();
    if (Object.keys(eMap).length) {
      setErrors(eMap);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      return;
    }
    setSubmitting(true);
    try {
      const selected = INTERESTS.filter((i) => interests[i.key]);
      const interestLabels = selected.map((i) => i.label);
      const parts = name.trim().split(/\s+/);
      const firstName = parts[0] || "";
      const lastName = parts.slice(1).join(" ") || "";

      const notes = [
        `Interests: ${interestLabels.join(", ")}`,
        hidden.referral_partner ? `Referral Partner: ${hidden.referral_partner}` : null,
        hidden.lead_source ? `Lead Source: ${hidden.lead_source}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      const response = await submitForm({
        form_name: "Homeowner Protection Squeeze",
        first_name: firstName,
        last_name: lastName,
        email: email.trim(),
        phone,
        notes,
        advisor_slug: "mariah-lorenzen",
        advisor_email: "mariah@tfainsuranceadvisors.com",
        tags: ["Homeowner Protection", ...interestLabels],
        interest_category: interestLabels.join(", "),
        utm_source: hidden.utm_source || undefined,
        utm_medium: hidden.utm_medium || undefined,
        utm_campaign: hidden.utm_campaign || undefined,
        utm_content: hidden.utm_content || undefined,
        honeypot: honeypotValue,
      });

      if (!response.ok) throw new Error(response.error);
      setSubmitted(true);
    } catch (err) {
      console.error("Homeowner Protection submit error:", err);
      toast({
        title: "Submission Error",
        description: "Please try again or call (888) 350-5396.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="A Quick Financial Checkup for Homeowners | The Financial Architects"
        description="A short, no-cost review with a licensed TFA advisor — trust, mortgage protection, and retirement planning for homeowners."
        noIndex
      />
      <style>{`
        @keyframes tfaFadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @keyframes tfaShake { 10%,90% { transform: translateX(-1px); } 20%,80% { transform: translateX(2px); } 30%,50%,70% { transform: translateX(-3px); } 40%,60% { transform: translateX(3px); } }
        @keyframes tfaPop { 0% { transform: scale(0.4); opacity: 0; } 70% { transform: scale(1.08); } 100% { transform: scale(1); opacity: 1; } }
        .tfa-hp input:focus { border-color: ${GOLD} !important; box-shadow: 0 0 0 3px rgba(201,168,76,0.20); }
        .tfa-hp-cta { transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
        .tfa-hp-cta:hover:not(:disabled) { background: ${NAVY} !important; color: #FFFFFF !important; box-shadow: 0 0 25px rgba(228,181,72,0.45); transform: scale(1.02); }
        .tfa-hp-cta:active:not(:disabled) { transform: scale(0.99); }
        .tfa-hp a:hover { color: ${GOLD} !important; }
      `}</style>
      <div
        className="tfa-hp"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "#FAFAFA",
          color: TEXT,
          fontFamily:
            "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {/* Logo strip */}
        <header
          style={{
            background: "#FFFFFF",
            borderBottom: "1px solid #E5E9EF",
            padding: "14px 20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src="/images/tfa-stacked-logo.png"
            alt="The Financial Architects"
            style={{ height: 46, width: "auto" }}
          />
        </header>

        {/* Hero */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
            padding: "clamp(36px, 7vw, 60px) 24px 128px",
            background: `linear-gradient(135deg, ${NAVY} 0%, #3D5A80 52%, ${NAVY} 100%)`,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -90,
              left: -70,
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: "rgba(228,181,72,0.16)",
              filter: "blur(96px)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -110,
              right: -60,
              width: 340,
              height: 340,
              borderRadius: "50%",
              background: "rgba(228,181,72,0.13)",
              filter: "blur(96px)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: 680,
              margin: "0 auto",
              animation: "tfaFadeUp 0.5s cubic-bezier(0.4,0,0.2,1) both",
            }}
          >
            <p
              style={{
                margin: "0 0 14px",
                fontSize: 12.5,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: GOLD,
              }}
            >
              For Homeowners
            </p>
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(30px, 6vw, 46px)",
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
              }}
            >
              A Quick Financial Checkup
              <span style={{ display: "block", color: GOLD, marginTop: "0.08em" }}>
                for Homeowners.
              </span>
            </h1>
            <p
              style={{
                margin: "14px auto 0",
                maxWidth: 540,
                fontSize: "clamp(15.5px, 2.5vw, 18px)",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.72)",
              }}
            >
              A short, no-cost review with a licensed advisor — so the rest of your
              plan is as solid as your home.
            </p>
          </div>
        </section>

        {/* Form card */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "min(620px, calc(100% - 32px))",
            margin: "-88px auto 0",
            animation: "tfaFadeUp 0.55s cubic-bezier(0.4,0,0.2,1) 0.05s both",
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #E5E9EF",
              borderRadius: 20,
              boxShadow:
                "0 24px 48px rgba(30,58,95,0.14), 0 6px 12px rgba(30,58,95,0.06)",
              padding: "clamp(22px, 5vw, 36px)",
              animation: shaking
                ? "tfaShake 0.45s cubic-bezier(0.36,0.07,0.19,0.97) both"
                : "none",
            }}
          >
            {submitted ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "26px 8px 18px",
                  animation: "tfaFadeUp 0.4s cubic-bezier(0.4,0,0.2,1) both",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 999,
                    margin: "0 auto 18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(201,168,76,0.14)",
                    color: NAVY,
                    animation:
                      "tfaPop 0.5s cubic-bezier(0.68,-0.55,0.265,1.55) both",
                  }}
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: 22,
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    color: NAVY,
                  }}
                >
                  Thanks — request received.
                </h3>
                <p
                  style={{
                    margin: "10px auto 0",
                    maxWidth: 400,
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: MUTED,
                  }}
                >
                  A licensed advisor will reach out within 1 business day.
                </p>
              </div>
            ) : (
              <>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 21,
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    color: NAVY,
                  }}
                >
                  Get your free review
                </h2>
                <p
                  style={{
                    margin: "6px 0 0",
                    fontSize: 14,
                    lineHeight: 1.55,
                    color: MUTED,
                  }}
                >
                  Tell us how to reach you — it takes less than a minute.
                </p>

                <form
                  onSubmit={onSubmit}
                  noValidate
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    marginTop: 22,
                  }}
                >
                  <input {...honeypotProps} className={honeypotClassName} />

                  {/* Name */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label htmlFor="tfa-name" style={labelStyle}>
                      Full name
                    </label>
                    <input
                      id="tfa-name"
                      type="text"
                      autoComplete="name"
                      placeholder="First and last name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        clearErr("name");
                      }}
                      style={inputStyle(!!errors.name)}
                    />
                    {errors.name && <span style={errStyle}>{errors.name}</span>}
                  </div>

                  {/* Email + Phone */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: 16,
                    }}
                  >
                    <div
                      style={{ display: "flex", flexDirection: "column", gap: 6 }}
                    >
                      <label htmlFor="tfa-email" style={labelStyle}>
                        Email
                      </label>
                      <input
                        id="tfa-email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          clearErr("email");
                        }}
                        style={inputStyle(!!errors.email)}
                      />
                      {errors.email && (
                        <span style={errStyle}>{errors.email}</span>
                      )}
                    </div>
                    <div
                      style={{ display: "flex", flexDirection: "column", gap: 6 }}
                    >
                      <label htmlFor="tfa-phone" style={labelStyle}>
                        Phone
                      </label>
                      <input
                        id="tfa-phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="(555) 123-4567"
                        value={phone}
                        onChange={(e) => {
                          setPhone(formatPhone(e.target.value));
                          clearErr("phone");
                        }}
                        style={inputStyle(!!errors.phone)}
                      />
                      {errors.phone && (
                        <span style={errStyle}>{errors.phone}</span>
                      )}
                    </div>
                  </div>

                  {/* Interests */}
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 10 }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 8,
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{ fontSize: 13, fontWeight: 600, color: NAVY }}
                      >
                        What would you like help with?
                      </span>
                      <span style={{ fontSize: 12, color: "#98A2B3" }}>
                        Select all that apply
                      </span>
                    </div>
                    {INTERESTS.map((row) => {
                      const sel = interests[row.key];
                      return (
                        <button
                          type="button"
                          key={row.key}
                          aria-pressed={sel}
                          onClick={() => toggleInterest(row.key)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            width: "100%",
                            textAlign: "left",
                            padding: "13px 14px",
                            borderRadius: 12,
                            cursor: "pointer",
                            font: "inherit",
                            background: sel
                              ? "rgba(201,168,76,0.07)"
                              : "#FFFFFF",
                            border: `1.5px solid ${
                              sel
                                ? "rgba(201,168,76,0.65)"
                                : errors.interests
                                ? ERR
                                : BORDER
                            }`,
                            transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                          }}
                        >
                          <span
                            style={{
                              flex: "none",
                              width: 40,
                              height: 40,
                              borderRadius: 999,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: sel ? GOLD : "rgba(201,168,76,0.12)",
                              color: sel ? "#1A2744" : GOLD,
                              transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                            }}
                          >
                            <svg
                              width="19"
                              height="19"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              {row.paths.map((d, i) => (
                                <path key={i} d={d} />
                              ))}
                            </svg>
                          </span>
                          <span
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 1,
                              minWidth: 0,
                            }}
                          >
                            <span
                              style={{
                                fontSize: 15,
                                fontWeight: 600,
                                color: NAVY,
                                lineHeight: 1.3,
                              }}
                            >
                              {row.label}
                            </span>
                            {row.note && (
                              <span style={{ fontSize: 12.5, color: MUTED }}>
                                {row.note}
                              </span>
                            )}
                          </span>
                          <span
                            style={{
                              flex: "none",
                              width: 22,
                              height: 22,
                              borderRadius: 6,
                              marginLeft: "auto",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: sel ? NAVY : "#FFFFFF",
                              border: `1.5px solid ${sel ? NAVY : "#C9CFDA"}`,
                              color: "#FFFFFF",
                              transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                            }}
                          >
                            {sel && (
                              <svg
                                width="13"
                                height="13"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                            )}
                          </span>
                        </button>
                      );
                    })}
                    {errors.interests && (
                      <span style={errStyle}>{errors.interests}</span>
                    )}
                  </div>

                  {/* Consent */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      marginTop: 2,
                    }}
                  >
                    <div
                      style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
                    >
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={consent}
                        aria-label="Consent to be contacted"
                        onClick={() => {
                          setConsent((c) => !c);
                          clearErr("consent");
                        }}
                        style={{
                          flex: "none",
                          width: 20,
                          height: 20,
                          borderRadius: 6,
                          marginTop: 1,
                          padding: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          background: consent ? NAVY : "#FFFFFF",
                          border: `1.5px solid ${
                            consent ? NAVY : errors.consent ? ERR : "#C9CFDA"
                          }`,
                          color: "#FFFFFF",
                          transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                        }}
                      >
                        {consent && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        )}
                      </button>
                      <label
                        onClick={() => {
                          setConsent((c) => !c);
                          clearErr("consent");
                        }}
                        style={{
                          fontSize: 12.5,
                          lineHeight: 1.55,
                          color: MUTED,
                          cursor: "pointer",
                          userSelect: "none",
                        }}
                      >
                        By submitting, I agree to be contacted by a licensed TFA
                        representative by phone, text, or email about the topics
                        selected above, including by automated means. Consent is
                        not a condition of purchase.
                      </label>
                    </div>
                    {errors.consent && (
                      <span style={{ ...errStyle, paddingLeft: 30 }}>
                        {errors.consent}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="tfa-hp-cta"
                    style={{
                      width: "100%",
                      border: "none",
                      cursor: submitting ? "default" : "pointer",
                      fontFamily: "inherit",
                      fontSize: 16,
                      fontWeight: 700,
                      letterSpacing: "0.01em",
                      padding: "16px 24px",
                      borderRadius: 999,
                      background: GOLD_BRIGHT,
                      color: "#1A2744",
                      boxShadow: "0 4px 12px rgba(30,58,95,0.08)",
                      marginTop: 4,
                      opacity: submitting ? 0.7 : 1,
                    }}
                  >
                    {submitting ? "Sending…" : "Get My Free Review"}
                  </button>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 7,
                      fontSize: 12.5,
                      color: MUTED,
                      textAlign: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={GOLD}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                    </svg>
                    <span>
                      Licensed professionals · No obligation · Completely
                      confidential
                    </span>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>

        <footer
          style={{
            marginTop: "auto",
            padding: "48px 24px 30px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 12,
              lineHeight: 1.7,
              color: "#98A2B3",
            }}
          >
            © {new Date().getFullYear()} The Financial Architects ·{" "}
            <a
              href="https://tfawealthplanning.com/privacy-policy"
              target="_blank"
              rel="noopener"
              style={{
                color: MUTED,
                textDecoration: "underline",
                textUnderlineOffset: 2,
              }}
            >
              Privacy Policy
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};

export default HomeownerProtection;