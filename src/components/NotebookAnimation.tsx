import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const NotebookAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Lid rotation: closed (flat) -> open (90deg perspective)
  const lidRotate = useTransform(scrollYProgress, [0, 0.15, 0.5], [90, 90, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [0, 0, 1]);
  const scale = useTransform(scrollYProgress, [0.15, 0.5], [0.85, 1]);

  return (
    <div ref={ref} className="relative w-full flex justify-center py-12 pointer-events-none select-none" style={{ perspective: "1200px" }}>
      <motion.div
        style={{ opacity, scale }}
        className="relative w-[320px] sm:w-[440px] md:w-[540px]"
      >
        {/* Lid / Screen */}
        <motion.div
          style={{
            rotateX: lidRotate,
            transformOrigin: "bottom center",
          }}
          className="relative w-full aspect-[16/10] rounded-t-xl bg-gradient-to-b from-muted/80 to-muted border border-border overflow-hidden shadow-xl"
        >
          {/* Screen bezel */}
          <div className="absolute inset-2 sm:inset-3 rounded-lg bg-background border border-border overflow-hidden">
            {/* Screen content - code lines */}
            <div className="p-3 sm:p-4 space-y-2">
              <div className="flex items-center gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
              </div>
              {[65, 80, 45, 90, 55, 70, 35, 60].map((w, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-2"
                >
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${w}%`,
                      background: i % 3 === 0
                        ? "hsl(var(--primary) / 0.5)"
                        : i % 3 === 1
                        ? "hsl(var(--accent) / 0.4)"
                        : "hsl(var(--muted-foreground) / 0.2)",
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
          {/* Camera dot */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
        </motion.div>

        {/* Base / Keyboard */}
        <div className="relative w-full h-3 sm:h-4 bg-gradient-to-b from-muted to-muted/90 rounded-b-xl border border-t-0 border-border shadow-lg">
          {/* Trackpad notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-1 rounded-b-sm bg-muted-foreground/15" />
        </div>

        {/* Shadow underneath */}
        <div className="absolute -bottom-2 left-[10%] right-[10%] h-4 bg-primary/10 blur-xl rounded-full" />
      </motion.div>
    </div>
  );
};

export default NotebookAnimation;
