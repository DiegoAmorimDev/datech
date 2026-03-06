import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import InteractiveNotebook from "./InteractiveNotebook";
import InteractiveTerminal from "./InteractiveTerminal";

const HeroSection = () => {
  const handleCTA = () => {
    document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" });
  };

  // Animated line that draws under the subtitle
  const pathLength = useMotionValue(0);

  // Typewriter effect for subtitle
  const fullText = "Transformamos ideias em experiências digitais extraordinárias.";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setDisplayText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        animate(pathLength, 1, { duration: 0.8, ease: "easeInOut" });
      }
    }, 35);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
      </div>

      {/* Interactive notebook background element */}
      <InteractiveNotebook />
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-primary/40"
          style={{
            top: `${20 + i * 12}%`,
            left: `${10 + i * 15}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, i % 2 === 0 ? 15 : -15, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-sm uppercase text-muted-foreground mb-6"
          >
            Desenvolvimento Web & Sistemas
          </motion.p>

          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6 flex items-center justify-center overflow-hidden">
            {["D", "A", "T", "E", "C", "H"].map((letter, i) => (
              <motion.span
                key={letter + i}
                initial={{
                  opacity: 0,
                  y: i % 2 === 0 ? -80 : 80,
                  x: (i - 2.5) * 40,
                  rotate: (i - 2.5) * 15,
                  scale: 0.3,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  x: 0,
                  rotate: 0,
                  scale: 1,
                }}
                whileHover={{
                  scale: 1.2,
                  y: -10,
                  color: "hsl(199, 89%, 60%)",
                  transition: { type: "spring", stiffness: 300, damping: 10 },
                }}
                transition={{
                  delay: 0.3 + i * 0.12,
                  duration: 0.7,
                  type: "spring",
                  stiffness: 120,
                  damping: 12,
                }}
                className={`${i < 2 ? "text-primary" : "text-foreground"} inline-block cursor-default`}
              >
                {letter}
              </motion.span>
            ))}
          </h1>

          {/* Typewriter subtitle with animated underline */}
          <div className="relative max-w-2xl mx-auto mb-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-lg md:text-xl text-muted-foreground min-h-[2em]"
            >
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-primary"
              >
                |
              </motion.span>
            </motion.p>
            <svg className="w-full h-1 mt-2" viewBox="0 0 400 2">
              <motion.line
                x1="50"
                y1="1"
                x2="350"
                y2="1"
                stroke="hsl(199, 89%, 60%)"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ pathLength }}
                opacity={0.4}
              />
            </svg>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 0.6 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Sites, sistemas e soluções web sob medida para o seu negócio.
          </motion.p>

          {/* Animated buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                size="lg"
                onClick={handleCTA}
                className="relative bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground px-8 py-6 text-base font-semibold rounded-full shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 overflow-hidden group"
              >
                {/* Shine sweep effect */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  animate={{ x: ["-200%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                />
                <span className="relative z-10 flex items-center">
                  Fale Conosco
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.span>
                </span>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-6 text-base rounded-full border-border hover:border-primary hover:text-primary transition-all"
              >
                Ver Projetos
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
