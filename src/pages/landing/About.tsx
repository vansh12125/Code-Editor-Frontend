import { Link } from "react-router-dom";
import {
  Code2,
  Play,
  Layers,
  Cpu,
  ArrowRight,
  Sparkles,
  Users2,
  Share2,
  Circle,
  Workflow,
  Globe2,
  ShieldCheck,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="group relative flex flex-col justify-between rounded-2xl border border-white/15 bg-black/30 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-black/40">
    <div>
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition group-hover:scale-105 group-hover:border-white/30 group-hover:bg-white/10">
        {icon}
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/65">{description}</p>
    </div>
  </div>
);

const techStack = [
  "React",
  "TypeScript",
  "Vite",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "Prisma",
  "PostgreSQL",
  "WebSockets",
];

const roadmapItems = [
  {
    icon: <Users2 size={18} />,
    title: "Real-time Collaboration",
    description: "Multi-user live editing, paired sessions, and instant peer sharing.",
  },
  {
    icon: <Globe2 size={18} />,
    title: "Extended Language Runtimes",
    description: "Expanded execution engines covering wider systems and script languages.",
  },
  {
    icon: <Circle size={18} />,
    title: "Scalable Sandboxed Execution",
    description: "Isolated cloud micro-containers for predictable run speeds and security.",
  },
  {
    icon: <Share2 size={18} />,
    title: "One-Click Project Sharing",
    description: "Instant shareable URLs with live preview and reproducible environments.",
  },
  {
    icon: <Workflow size={18} />,
    title: "Custom Developer Workspaces",
    description: "Persistent disk storage, tailored configurations, and custom dependencies.",
  },
  {
    icon: <ShieldCheck size={18} />,
    title: "Cloud-First Workflows",
    description: "Integrated secret management, continuous deployment, and git synchronizations.",
  },
];

const About = () => {
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

      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-36 lg:px-8">
        <section className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3.5 py-1 text-xs font-medium text-white/80 backdrop-blur-md">
            <Sparkles size={13} className="text-white/70" />
            <span>About CodeSpace</span>
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Built for developers who just want to code.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            CodeSpace strips away local environment overhead and delivers a clean,
            resilient browser workspace where you can build, run, and scale projects
            without friction.
          </p>
        </section>

        <section className="mt-24">
          <div className="rounded-3xl border border-white/15 bg-black/30 p-8 backdrop-blur-xl sm:p-12">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/50">
                Our Purpose
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Why CodeSpace?
              </h2>

              <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/70 sm:text-base">
                <p>
                  Setting up local development environments has evolved into a chore.
                  Installing heavy runtimes, configuring tooling pipelines, fighting broken
                  dependencies, and reconciling cross-platform discrepancies consume valuable
                  time that should belong to creative engineering.
                </p>
                <p>
                  CodeSpace exists to invert that reality. We provide a single online
                  destination where any developer can jump in, write code immediately, and
                  inspect execution output without touching machine configuration files or
                  waiting on package managers.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <div className="mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/50">
              Platform
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              What we build
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Code2 size={22} />}
              title="Code"
              description="Write and organize your codebase cleanly in a streamlined, syntax-aware web editor."
            />
            <FeatureCard
              icon={<Play size={22} />}
              title="Run"
              description="Execute scripts and monitor console output without depending entirely on a local machine runtime."
            />
            <FeatureCard
              icon={<Layers size={22} />}
              title="Manage"
              description="Organize multi-file projects, switch contexts smoothly, and track work in a unified workspace."
            />
            <FeatureCard
              icon={<Cpu size={22} />}
              title="Scale"
              description="Constructed atop modular services engineered to expand alongside real-time collaboration and tooling."
            />
          </div>
        </section>

        <section className="mt-24">
          <div className="flex flex-col items-center justify-center rounded-3xl border border-white/15 bg-black/35 px-6 py-14 text-center backdrop-blur-xl sm:px-12 sm:py-20">
            <h2 className="max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              "Less setup. More building."
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
              Developer tools should step out of the way. We eliminate configuration fatigue
              so you can dedicate your focus to problem-solving, crafting algorithms, and
              shipping software.
            </p>
          </div>
        </section>

        <section className="mt-24">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/50">
              Stack
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Under the hood
            </h2>
            <p className="mt-2 text-sm text-white/65">
              Constructed with a modern, type-safe full stack designed for stability and fast execution loops.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {techStack.map((tech) => (
              <div
                key={tech}
                className="flex items-center rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-medium text-white/90 backdrop-blur-md transition hover:border-white/30 hover:bg-white/10"
              >
                {tech}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <div className="mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/50">
              Roadmap
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Future vision
            </h2>
            <p className="mt-2 text-sm text-white/65">
              CodeSpace is evolving toward an integrated cloud software delivery environment.
              Here is where the platform is heading:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {roadmapItems.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/15 bg-black/25 p-5 backdrop-blur-xl transition hover:border-white/30 hover:bg-black/35"
              >
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white">
                  {item.icon}
                </div>
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/60">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-28">
          <div className="flex flex-col items-center rounded-3xl border border-white/20 bg-black/30 px-6 py-12 text-center shadow-2xl backdrop-blur-2xl sm:px-12 sm:py-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to build?
            </h2>
            <p className="mt-2 text-sm text-white/65 sm:text-base">
              Create your workspace and start coding.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-neutral-950 shadow-lg transition hover:bg-neutral-200 active:scale-[0.99]"
              >
                <span>Get Started</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/signin"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10 active:scale-[0.99]"
              >
                Sign In
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;