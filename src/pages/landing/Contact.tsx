import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  MessageSquare,
  Send,
  GitBranch,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setError("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmitted(true);
    } catch {
      setError("Failed to send your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full select-none overflow-x-hidden text-white">
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
        }}
      />
      <div className="fixed inset-0 -z-10 bg-black/50" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.6)_100%)]" />

      <div className="flex min-h-screen items-center justify-center px-4 pb-8 pt-20 sm:px-6">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/20 bg-black/25 shadow-2xl backdrop-blur-xl lg:grid-cols-12">
          <div className="flex flex-col justify-between border-b border-white/10 p-7 sm:p-9 lg:col-span-5 lg:border-b-0 lg:border-r">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-md">
                <Sparkles size={12} className="text-white/70" />
                <span>Get in touch</span>
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Let's talk code.
              </h1>

              <p className="mt-3 text-sm leading-relaxed text-white/65">
                Have questions about the platform, feedback on our runtimes, or
                need assistance with your workspace? We’re always listening.
              </p>

              <div className="mt-8 space-y-3.5">
                <div className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-md">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-white/50">
                      Direct Email
                    </p>
                    <a
                      href="mailto:support@codespace.dev"
                      className="block truncate text-sm font-medium text-white transition hover:text-white/80"
                    >
                      vanshsahu9838@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-md">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white">
                    <MessageSquare size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-white/50">
                      Community Discord
                    </p>
                    <p className="truncate text-sm font-medium text-white">
                      discord.gg/codespace
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-md">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white">
                    <GitBranch size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-white/50">
                      Open Source
                    </p>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noreferrer"
                      className="block truncate text-sm font-medium text-white transition hover:text-white/80"
                    >
                      github.com/codespace
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs text-white/45">
              <Clock size={14} />
              <span>Typical response time: under 24 hours</span>
            </div>
          </div>

          <div className="flex items-center justify-center p-7 sm:p-9 lg:col-span-7">
            <div className="w-full">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Send a message
                </h2>
                <p className="mt-1 text-sm text-white/60">
                  Fill in the details below and we will get back to you shortly.
                </p>
              </div>

              {submitted ? (
                <div className="mt-6 flex flex-col items-center rounded-2xl border border-white/15 bg-white/5 p-8 text-center backdrop-blur-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    Message Sent
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/65">
                    Thank you for reaching out. We have received your inquiry
                    and will respond via email as soon as possible.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="mt-6 rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10 active:scale-[0.99]"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="mt-6 space-y-3.5" onSubmit={handleSubmit}>
                  {error && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-xs text-red-400">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1.5 block text-sm font-medium text-white/80"
                      >
                        Name <span className="text-white/40">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ada Lovelace"
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-1 focus:ring-white/20 autofill:[transition:background-color_5000000s_ease-in-out_0s] autofill:[-webkit-text-fill-color:white]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-sm font-medium text-white/80"
                      >
                        Email <span className="text-white/40">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ada@example.com"
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-1 focus:ring-white/20 autofill:[transition:background-color_5000000s_ease-in-out_0s] autofill:[-webkit-text-fill-color:white]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-1.5 block text-sm font-medium text-white/80"
                    >
                      Inquiry Type
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full appearance-none rounded-xl border border-white/15 bg-[#141414] px-4 py-2.5 text-sm text-white outline-none transition focus:border-white/40 focus:ring-1 focus:ring-white/20"
                      >
                        <option
                          value=""
                          className="bg-neutral-900 text-white/50"
                        >
                          Select a subject...
                        </option>
                        <option
                          value="general"
                          className="bg-neutral-900 text-white"
                        >
                          General Inquiry
                        </option>
                        <option
                          value="feedback"
                          className="bg-neutral-900 text-white"
                        >
                          Feature Request & Feedback
                        </option>
                        <option
                          value="bug"
                          className="bg-neutral-900 text-white"
                        >
                          Bug Report / Runtime Issue
                        </option>
                        <option
                          value="partnership"
                          className="bg-neutral-900 text-white"
                        >
                          Collaboration / Enterprise
                        </option>
                        <option
                          value="other"
                          className="bg-neutral-900 text-white"
                        >
                          Other
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-sm font-medium text-white/80"
                    >
                      Message <span className="text-white/40">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us what you are working on or what you need..."
                      className="w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm leading-relaxed text-white outline-none transition placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-1 focus:ring-white/20"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-neutral-950 shadow-lg transition hover:bg-neutral-200 active:scale-[0.99] disabled:opacity-50"
                  >
                    <span>{loading ? "Sending..." : "Send Message"}</span>
                    <Send size={15} />
                  </button>
                </form>
              )}

              <p className="mt-4 text-center text-xs text-white/50">
                Looking to get started immediately?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-white hover:underline"
                >
                  Create workspace
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
