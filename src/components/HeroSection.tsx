import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import NotebookAnimation from "@/components/NotebookAnimation";

const HeroSection = () => {
  const handleCTA = () => {
    document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" });
  };

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

      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6"
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
                transition={{
                  delay: 0.3 + i * 0.12,
                  duration: 0.7,
                  type: "spring",
                  stiffness: 120,
                  damping: 12,
                }}
                className={i < 2 ? "text-primary inline-block" : "text-foreground inline-block"}
              >
                {letter}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Transformamos ideias em experiências digitais extraordinárias.
            Sites, sistemas e soluções web sob medida para o seu negócio.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              onClick={handleCTA}
              className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground px-8 py-6 text-base font-semibold rounded-full shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
            >
              Fale Conosco
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
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

        {/* Notebook opening animation */}
        <NotebookAnimation />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
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
