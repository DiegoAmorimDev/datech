import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useRef, useCallback } from "react";

const codeLines = [
  { text: "using Microsoft.AspNetCore;", color: "hsl(199, 89%, 60%)", indent: 0 },
  { text: "", color: "transparent", indent: 0 },
  { text: "namespace DaTech.Web;", color: "hsl(280, 70%, 65%)", indent: 0 },
  { text: "", color: "transparent", indent: 0 },
  { text: "public class Startup", color: "hsl(140, 60%, 55%)", indent: 0 },
  { text: "{", color: "hsl(280, 70%, 65%)", indent: 0 },
  { text: "public void Configure()", color: "hsl(199, 89%, 60%)", indent: 1 },
  { text: "{", color: "hsl(280, 70%, 65%)", indent: 1 },
  { text: "app.UseRouting();", color: "hsl(35, 90%, 60%)", indent: 2 },
  { text: "app.UseAuthorization();", color: "hsl(35, 90%, 60%)", indent: 2 },
  { text: "app.MapControllers();", color: "hsl(350, 70%, 60%)", indent: 2 },
  { text: "}", color: "hsl(280, 70%, 65%)", indent: 1 },
  { text: "", color: "transparent", indent: 0 },
  { text: "public void Run()", color: "hsl(199, 89%, 60%)", indent: 1 },
  { text: "=> Host.CreateDefault()", color: "hsl(140, 60%, 55%)", indent: 2 },
  { text: "  .Build().Run();", color: "hsl(140, 60%, 55%)", indent: 2 },
  { text: "}", color: "hsl(280, 70%, 65%)", indent: 0 },
];

const InteractiveNotebook = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useTransform(mouseY, [-200, 200], [3, -3]);
  const rotateY = useTransform(mouseX, [-300, 300], [-3, 3]);
  const glowX = useTransform(mouseX, [-300, 300], [20, 80]);
  const glowY = useTransform(mouseY, [-200, 200], [20, 80]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setHoveredLine(null); }}
      className="absolute -z-5 hidden lg:block"
      style={{
        rotateX,
        rotateY,
        perspective: 1000,
        right: "5%",
        top: "15%",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.75, scale: 1 }}
      whileHover={{ opacity: 0.85, scale: 1.02 }}
      transition={{ duration: 1, delay: 2 }}
    >
      {/* Notebook frame */}
      <div className="relative w-[340px] rounded-xl border border-border/40 bg-[hsl(215,35%,12%)] backdrop-blur-sm shadow-2xl overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/30">
          <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-[hsl(35,90%,60%)]/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-[hsl(140,60%,55%)]/60" />
          <span className="ml-2 text-[10px] text-muted-foreground/50 font-mono">Startup.cs</span>
        </div>

        {/* Code area */}
        <div className="p-3 font-mono text-[11px] leading-relaxed relative">
          {/* Mouse glow */}
          {isHovered && (
            <motion.div
              className="absolute w-32 h-32 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, hsl(199, 89%, 60%, 0.15), transparent 70%)",
                left: glowX,
                top: glowY,
                x: "-50%",
                y: "-50%",
              }}
            />
          )}

          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              className="relative cursor-default select-none"
              style={{ paddingLeft: `${line.indent * 14}px` }}
              onMouseEnter={() => setHoveredLine(i)}
              animate={{
                x: hoveredLine === i ? 6 : 0,
                backgroundColor: hoveredLine === i ? "hsl(199, 89%, 60%, 0.08)" : "transparent",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <span className="text-muted-foreground/30 mr-2 text-[9px] inline-block w-4 text-right">
                {i + 1}
              </span>
              <motion.span
                style={{ color: line.color }}
                animate={{
                  opacity: hoveredLine === i ? 1 : 0.6,
                  textShadow: hoveredLine === i ? `0 0 8px ${line.color}` : "none",
                }}
              >
                {line.text}
              </motion.span>
            </motion.div>
          ))}

          {/* Blinking cursor */}
          <motion.div
            className="inline-block w-[6px] h-[13px] bg-primary/60 ml-6"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default InteractiveNotebook;
