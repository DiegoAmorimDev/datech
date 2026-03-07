import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Code2, Lightbulb, Target } from "lucide-react";
import diegoPhoto from "@/assets/diego-amorim.jpeg";
import { useRef, useState, useEffect } from "react";

const techOrbitItems = [
  { label: "React", angle: 0 },
  { label: ".NET", angle: 60 },
  { label: "TypeScript", angle: 120 },
  { label: "SQL", angle: 180 },
  { label: "Docker", angle: 240 },
  { label: "Azure", angle: 300 },
];

const AboutSection = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouseOnCard, setMouseOnCard] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 200, damping: 30 });
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 30 });
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setMouseOnCard(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Particle system
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number }[]>([]);
  
  useEffect(() => {
    const pts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 3,
    }));
    setParticles(pts);
  }, []);

  return (
    <section id="sobre" className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Floating particles background */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-primary/30"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() > 0.5 ? 15 : -15, 0],
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Interactive 3D Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative flex items-center justify-center"
          >
            {/* Orbiting tech labels */}
            <div className="absolute w-[340px] h-[340px] md:w-[420px] md:h-[420px]">
              <motion.div
                className="w-full h-full relative"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                {techOrbitItems.map((item, i) => {
                  const rad = (item.angle * Math.PI) / 180;
                  const radius = 50;
                  const x = 50 + radius * Math.cos(rad);
                  const y = 50 + radius * Math.sin(rad);
                  return (
                    <motion.div
                      key={item.label}
                      className="absolute"
                      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="bg-card border border-primary/30 text-primary text-xs font-medium px-3 py-1.5 rounded-full shadow-lg shadow-primary/10 backdrop-blur-sm whitespace-nowrap"
                      >
                        {item.label}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Orbit ring */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <motion.circle
                  cx="50" cy="50" r="48"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="0.3"
                  strokeDasharray="4 4"
                  opacity={0.3}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "50% 50%" }}
                />
              </svg>
            </div>

            {/* 3D Tilt Card */}
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setMouseOnCard(true)}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX: mouseOnCard ? rotateX : 0,
                rotateY: mouseOnCard ? rotateY : 0,
                transformPerspective: 800,
              }}
              className="relative z-10 w-64 h-64 md:w-72 md:h-72 cursor-pointer"
            >
              {/* Glow effect */}
              <motion.div
                className="absolute -inset-1 rounded-3xl opacity-0 transition-opacity duration-300"
                style={{
                  background: mouseOnCard
                    ? `radial-gradient(circle at ${glowX.get()}% ${glowY.get()}%, hsl(var(--primary) / 0.4), transparent 60%)`
                    : undefined,
                  opacity: mouseOnCard ? 0.8 : 0,
                }}
              />

              {/* Animated border */}
              <div className="absolute -inset-[2px] rounded-3xl overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: "conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)), transparent, hsl(var(--primary)))",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Card content */}
              <div className="relative w-full h-full rounded-3xl bg-card flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />

                {/* Pulsing rings behind photo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full border border-primary/20"
                      style={{ width: `${50 + i * 20}%`, height: `${50 + i * 20}%` }}
                      animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
                      transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  ))}
                </div>

                <div className="text-center z-10 p-6">
                  <motion.div
                    className="w-28 h-28 md:w-32 md:h-32 mx-auto mb-4 rounded-full overflow-hidden relative"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Spinning border on photo */}
                    <motion.div
                      className="absolute -inset-[2px] rounded-full"
                      style={{
                        background: "conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--accent)), transparent, hsl(var(--primary)))",
                      }}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-[2px] rounded-full overflow-hidden">
                      <img src={diegoPhoto} alt="Diego Amorim" className="w-full h-full object-cover" />
                    </div>
                  </motion.div>
                  <motion.h3
                    className="font-display text-xl md:text-2xl font-bold text-foreground"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    Diego Amorim
                  </motion.h3>
                  <motion.p
                    className="text-primary font-medium mt-1 text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    Fundador & Arquiteto de Software
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Quem somos</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">Sobre a DATECH</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              A DATECH nasceu da paixão por tecnologia e inovação. Liderada por
              <strong className="text-foreground"> Diego Amorim</strong>, desenvolvedor e arquiteto de software, nossa
              missão é criar soluções digitais que transformam negócios e conectam pessoas.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Com experiência em diversas tecnologias e metodologias modernas, entregamos projetos que combinam design
              sofisticado, performance excepcional e código de qualidade.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: Code2, label: "Código Limpo", desc: "Qualidade e manutenibilidade" },
                { icon: Lightbulb, label: "Inovação", desc: "Soluções criativas" },
                { icon: Target, label: "Resultado", desc: "Foco em conversão" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 30, rotateX: -30 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 150 }}
                  whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.2 } }}
                  className="text-center p-4 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm cursor-pointer group"
                >
                  <motion.div
                    className="relative mx-auto mb-3 w-12 h-12 flex items-center justify-center"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="absolute inset-0 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors" />
                    <item.icon className="h-6 w-6 text-primary relative z-10" />
                  </motion.div>
                  <h4 className="font-display font-semibold text-foreground text-sm">{item.label}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
