import { Link } from "react-router-dom";
import { MdEmojiFoodBeverage } from "react-icons/md";
import { FaGlobe, FaChevronRight } from "react-icons/fa";

function About() {
  return (
    <div className="bg-brand-milk min-h-screen p-6 px-4 md:px-16 pt-28 pb-20 flex flex-col items-center">
      {/* Brand Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-amber bg-brand-amber/10 px-3.5 py-1.5 rounded-full mb-3">
          Our Story & Spirit
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-espresso tracking-tight">
          About The Cafe
        </h1>
        <p className="text-brand-mocha mt-3 text-sm md:text-base font-medium leading-relaxed">
          Learn about our commitment to culinary excellence, high-quality ingredients, and the creative minds behind the experience.
        </p>
      </div>

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Card 1: Our Commitment */}
        <div className="bg-white rounded-md p-6 md:p-8 border border-brand-sand/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <div className="p-3 rounded-md bg-brand-amber/10 text-brand-amber w-fit mb-6">
              <MdEmojiFoodBeverage size={28} />
            </div>
            <h2 className="font-display text-2xl font-semibold text-brand-espresso mb-4">
              The Breakfast Place
            </h2>
            <div className="space-y-4 text-sm md:text-base text-brand-mocha font-medium leading-relaxed">
              <p>
                Welcome to <span className="font-bold text-brand-espresso">The Breakfast Place</span>! Here, you can explore our delicious menu, discover organic promotions, and learn more about our commitment to delivering the ultimate morning experience.
              </p>
              <p>
                We pride ourselves on using organic, farm-fresh ingredients to create comforting culinary breakfasts that not only taste spectacular but also bring loved ones together.
              </p>
              <p>
                We aim to provide a seamless, visual online dining experience so you can enjoy your morning favorites with minimal hassle.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-brand-sand/40 flex items-center justify-between">
            <span className="text-xs font-semibold text-brand-mocha/60 italic">
              Est. 2026
            </span>
          </div>
        </div>

        {/* Card 2: Developer Profile Card */}
        <div className="bg-white rounded-md p-6 md:p-8 border border-brand-sand/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <div className="w-20 h-20 rounded-md overflow-hidden border border-brand-sand shadow-sm mb-6">
              <img
                src="https://www.whoisblxck.xyz/me.png"
                alt="Mubarak Odetunde"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <h2 className="font-display text-2xl font-semibold text-brand-espresso mb-4">
              Meet the Developer
            </h2>
            <div className="space-y-4 text-sm md:text-base text-brand-mocha font-medium leading-relaxed">
              <p>
                Hi, I'm <span className="font-bold text-brand-espresso">Mubarak Odetunde</span> — a developer who enjoys building playful, interactive things for the web.
              </p>
              <p>
                The Breakfast Place is one of those things: a small breakfast shop where you stack your own sandwich in 3D, built with React and react-three-fiber.
              </p>
              <p>
                If you'd like to see more of what I make, my portfolio is just below.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-brand-sand/40">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.whoisblxck.xyz"
              className="w-full flex items-center justify-center gap-2 bg-brand-espresso hover:bg-brand-amber text-white py-3.5 px-6 rounded-md font-bold transition-all duration-300 shadow-md shadow-brand-espresso/10 hover:shadow-none text-sm group"
            >
              <span>Visit Portfolio</span>
              <FaGlobe size={14} className="opacity-85" />
              <FaChevronRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
