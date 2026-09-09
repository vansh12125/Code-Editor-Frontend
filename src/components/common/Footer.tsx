import { Link } from "react-router-dom";
export default function Footer() {
  const sections = [
    { title: "Platform", links: ["Community", "FAQs", "Projects", "Tags"] },
    { title: "Company", links: ["About", "Careers", "Brand Kit", "Contacts"] },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Matrix"],
    },
  ];
  return (
    <footer className="w-full relative z-10 border-t border-white/4 bg-black/30 backdrop-blur-md text-left font-sans mt-auto text-white select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-16">
          <div className="col-span-2 md:col-span-1 flex flex-col space-y-4">
            <Link
              to="/"
              className="font-bold tracking-tight text-sm text-white"
            >
              CodeSpace<span className="text-gray-400 font-light">*</span>
            </Link>
            <p className="text-xs text-white leading-relaxed max-w-xs">
              A powerful online IDE.
            </p>
          </div>
          {sections.map((section, idx) => (
            <div key={idx} className="flex flex-col space-y-3">
              <span className="text-[10px] uppercase tracking-widest font-mono font-semibold text-white">
                {section.title}
              </span>
              <div className="flex flex-col space-y-2 text-xs ">
                {section.links.map((link) => (
                  <Link
                    key={link}
                    to={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-white/80  hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/4 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono ">
          <div>
            &copy; {new Date().getFullYear()} CodeSpace Labs Inc. All server
            protocols active.
          </div>
          <div className="flex space-x-6">
            <a
              href="https://github.com/vansh12125"
              className="text-white/80 transition hover:text-white"
              target="_blank"
            >
              GITHUB
            </a>
            <a
              href="https://leetcode.com/u/Vansh_12125/"
              className="text-white/80 transition hover:text-white"
              target="_blank"
            >
              LEETCODE
            </a>
            <a
              href="#x"
              className="text-white/80 transition hover:text-white"
              target="_blank"
            >
              X / TWITTER
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
