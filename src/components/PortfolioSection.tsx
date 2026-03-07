import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Eye } from "lucide-react";
import portfolioAdvocacia from "@/assets/portfolio-advocacia.png";
import { useRef, useState } from "react";

const projects = [
  {
    title: "Priscila Amaral Advogada",
    category: "Site Institucional — Advocacia",
    image: portfolioAdvocacia,
    link: "https://priscilaadvprevidenciario.com.br/",
    tech: ["WordPress", "CSS", "SEO"],
  },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-24 md:py-32 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Scanning line */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">
            Nosso trabalho
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Portfólio
          </h2>
        </motion.div>

        <div className="flex justify-center gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* "Em breve mais projetos" */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <motion.div
            className="relative px-8 py-4 rounded-2xl border border-dashed border-primary/30 bg-card/50 backdrop-blur-sm"
            animate={{ borderColor: ["hsl(var(--primary) / 0.2)", "hsl(var(--primary) / 0.5)", "hsl(var(--primary) / 0.2)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <p className="text-muted-foreground text-sm font-medium">
                Mais projetos em breve...
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 25 });
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 25 });
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformPerspective: 1000,
      }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer w-full max-w-lg"
      onClick={() => window.open(project.link, "_blank")}
    >
      {/* Animated glow border */}
      <motion.div
        className="absolute -inset-[2px] rounded-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: isHovered
            ? `radial-gradient(circle at ${glowX.get()}% ${glowY.get()}%, hsl(var(--primary) / 0.6), transparent 60%)`
            : undefined,
        }}
      />
      <div className="absolute -inset-[1px] rounded-2xl overflow-hidden z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <motion.div
          className="absolute inset-0"
          style={{
            background: "conic-gradient(from 0deg, hsl(var(--primary) / 0.5), transparent, hsl(var(--primary) / 0.3), transparent, hsl(var(--primary) / 0.5))",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 bg-card rounded-2xl overflow-hidden">
        {/* Image with parallax-like zoom */}
        <div className="aspect-[3/2] overflow-hidden relative">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
            animate={isHovered ? { scale: 1.08 } : { scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Overlay with reveal animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6"
            initial={false}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Category badge */}
            <motion.span
              className="inline-block text-xs uppercase tracking-widest text-primary font-medium mb-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm w-fit"
              initial={false}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              {project.category}
            </motion.span>

            <motion.h3
              className="font-display text-2xl font-bold text-white mb-3"
              initial={false}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {project.title}
            </motion.h3>

            {/* Tech tags */}
            <motion.div
              className="flex gap-2 mb-4"
              initial={false}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              {project.tech.map((t) => (
                <span key={t} className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/80 backdrop-blur-sm">
                  {t}
                </span>
              ))}
            </motion.div>

            {/* CTA button */}
            <motion.div
              className="flex items-center gap-2 text-sm text-primary font-medium"
              initial={false}
              animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Eye className="w-4 h-4" />
              <span>Ver projeto</span>
              <motion.div
                animate={isHovered ? { x: [0, 4, 0] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ExternalLink className="w-4 h-4" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioSection;
