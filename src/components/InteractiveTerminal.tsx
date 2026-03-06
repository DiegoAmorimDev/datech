import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const commands = [
  { prompt: "$ dotnet build", output: "Build succeeded. 0 Errors.", delay: 0 },
  { prompt: "$ dotnet test", output: "Passed! 42 tests passed.", delay: 3.5 },
  { prompt: "$ dotnet publish", output: "Published to /app/release", delay: 7 },
  { prompt: "$ docker push datech/api", output: "Pushed: latest ✓", delay: 10.5 },
];

const InteractiveTerminal = () => {
  const [visibleCommands, setVisibleCommands] = useState(0);

  useEffect(() => {
    const timers = commands.map((cmd, i) =>
      setTimeout(() => setVisibleCommands(i + 1), (cmd.delay + 3) * 1000)
    );
    // Loop
    const resetTimer = setTimeout(() => setVisibleCommands(0), 17000);
    const restartTimer = setTimeout(() => {
      setVisibleCommands(0);
      // Re-trigger
      commands.forEach((cmd, i) =>
        setTimeout(() => setVisibleCommands(i + 1), (cmd.delay + 0.5) * 1000)
      );
    }, 17500);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(resetTimer);
      clearTimeout(restartTimer);
    };
  }, []);

  // Restart loop with interval
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCommands(0);
      commands.forEach((cmd, i) =>
        setTimeout(() => setVisibleCommands(i + 1), (cmd.delay + 0.5) * 1000)
      );
    }, 17500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="absolute -z-5 hidden lg:block"
      style={{ left: "3%", bottom: "12%" }}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 0.7, scale: 1, y: 0 }}
      whileHover={{ opacity: 0.85, scale: 1.02 }}
      transition={{ duration: 1, delay: 2.5 }}
    >
      <div className="relative w-[280px] rounded-xl border border-border/40 bg-[hsl(220,30%,8%)] backdrop-blur-sm shadow-2xl overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/30">
          <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-[hsl(35,90%,60%)]/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-[hsl(140,60%,55%)]/60" />
          <span className="ml-2 text-[10px] text-muted-foreground/50 font-mono">Terminal</span>
        </div>

        {/* Terminal content */}
        <div className="p-3 font-mono text-[10px] leading-loose space-y-1.5 min-h-[140px]">
          {commands.slice(0, visibleCommands).map((cmd, i) => (
            <motion.div
              key={`${cmd.prompt}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-[hsl(140,60%,55%)]">{cmd.prompt}</div>
              <motion.div
                className="text-muted-foreground/70 pl-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {cmd.output}
              </motion.div>
            </motion.div>
          ))}

          {/* Blinking cursor */}
          <div className="flex items-center gap-1">
            <span className="text-[hsl(140,60%,55%)]">$</span>
            <motion.span
              className="inline-block w-[5px] h-[11px] bg-primary/60"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InteractiveTerminal;
