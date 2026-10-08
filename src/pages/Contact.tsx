import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowUpRight, Check, Copy, Mail, MapPin, Send } from "lucide-react";
import { PageHeading } from "../components/ui/PageHeading";
import { Reveal } from "../components/ui/Reveal";
import { ExternalLink } from "../components/ui/Links";
import { profile } from "../data/profile";
import { contactEndpoint, sendContactMessage } from "../lib/contact";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Contact() {
  usePageMeta(
    "Contact",
    "Contact Prakhar Shrivastava in Sonepat, India, for projects and conversations about full-stack development.",
  );
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error" | "email"
  >("idle");
  const [feedback, setFeedback] = useState("");
  const [mailLink, setMailLink] = useState("");
  const [copied, setCopied] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const message = {
      name: String(data.get("name")).trim(),
      email: String(data.get("email")).trim(),
      subject: String(data.get("subject")).trim(),
      message: String(data.get("message")).trim(),
    };
    if (Object.values(message).some((value) => !value)) {
      setStatus("error");
      setFeedback("Please complete every field.");
      return;
    }
    if (!contactEndpoint) {
      setMailLink(
        `mailto:${profile.email}?subject=${encodeURIComponent(message.subject)}&body=${encodeURIComponent(`Name: ${message.name}\nReply to: ${message.email}\n\n${message.message}`)}`,
      );
      setStatus("email");
      setFeedback(
        "Your email draft is ready. Open your email app to review and send it. Nothing has been sent from this website.",
      );
      return;
    }
    setStatus("sending");
    setFeedback("Submitting your message…");
    try {
      await sendContactMessage(message);
      setStatus("success");
      setFeedback(
        "Your message was submitted successfully. Thank you for getting in touch.",
      );
      form.reset();
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Unable to submit. Please email me directly.",
      );
    }
  }
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      setFeedback(
        "Copy was unavailable. You can select the email address or open the email link.",
      );
      setStatus("error");
    }
  }
  return (
    <>
      <PageHeading
        label="04 / CONTACT"
        title="Good things start"
        accent="with a conversation."
        description="Have a project in mind, an opportunity to share, or a question about my work? Get in touch."
      />
      <section className="cream-section section">
        <div className="container contact-grid">
          <Reveal className="contact-details">
            <p className="eyebrow">LET'S CONNECT</p>
            <h2>
              Say hello<span className="text-crimson">.</span>
            </h2>
            <div className="contact-method">
              <Mail size={21} />
              <div>
                <span>EMAIL</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
              <button
                aria-label={
                  copied ? "Email address copied" : "Copy email address"
                }
                title={copied ? "Copied" : "Copy email"}
                onClick={copyEmail}
              >
                {copied ? <Check size={17} /> : <Copy size={17} />}
              </button>
            </div>
            <div className="contact-method">
              <MapPin size={21} />
              <div>
                <span>BASED IN</span>
                <p>{profile.location}</p>
              </div>
            </div>
            <div className="contact-social">
              <p className="eyebrow">ELSEWHERE ON THE INTERNET</p>
              <ExternalLink href={profile.github}>GitHub</ExternalLink>
              <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
              <ExternalLink href={profile.twitter}>X / Twitter</ExternalLink>
            </div>
            <p className="copy-status" aria-live="polite">
              {copied ? "Email address copied." : ""}
            </p>
          </Reveal>
          <Reveal>
            <form className="contact-form" onSubmit={submit}>
              <div className="form-row">
                <label>
                  Your name
                  <input
                    name="name"
                    autoComplete="name"
                    placeholder="Alex Morgan"
                    required
                    maxLength={100}
                  />
                </label>
                <label>
                  Email address
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="alex@example.com"
                    required
                    maxLength={254}
                  />
                </label>
              </div>
              <label>
                Subject
                <input
                  name="subject"
                  placeholder="What would you like to talk about?"
                  required
                  maxLength={200}
                />
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  placeholder="Tell me a little about it…"
                  required
                  rows={5}
                  maxLength={5000}
                />
              </label>
              <p className="form-note" id="form-note">
                {contactEndpoint
                  ? "Your message will be submitted through the contact service."
                  : "This form prepares an email draft for you to review and send in your email app."}
              </p>
              <button
                className="button button-primary"
                type="submit"
                disabled={status === "sending"}
                aria-describedby="form-note"
              >
                {status === "sending" ? "Sending…" : "Send message"}
                <Send size={16} />
              </button>
              <div
                className={`form-feedback ${status === "error" ? "is-error" : ""}`}
                role="status"
                aria-live="polite"
              >
                {feedback}
                {status === "email" && (
                  <a className="text-link mt-3" href={mailLink}>
                    Open email app
                    <ArrowUpRight size={17} />
                  </a>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
