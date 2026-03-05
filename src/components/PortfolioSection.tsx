import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import portfolioAdvocacia from "@/assets/portfolio-advocacia.png";

const projects = [
  {
    title: "Priscila Amaral Advogada",
    category: "Site Institucional — Advocacia",
    image: portfolioAdvocacia,
    link: "https://priscilaadvprevidenciario.com.br/",
  },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
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

        <div className="flex justify-center gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer w-full max-w-md"
              onClick={() => window.open(project.link, "_blank")}
            >
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-xs uppercase tracking-widest text-primary font-medium mb-1">
                  {project.category}
                </span>
                <h3 className="font-display text-xl font-bold text-background">
                  {project.title}
                </h3>
                <ExternalLink className="absolute top-4 right-4 h-5 w-5 text-background/80" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
