import { motion } from "framer-motion";
import { Code2, Lightbulb, Target } from "lucide-react";
import diegoPhoto from "@/assets/diego-amorim.jpeg";

const AboutSection = () => {
  return (
    <section id="sobre" className="py-24 md:py-32 bg-muted/30 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image / Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-square max-w-md mx-auto lg:mx-0 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 p-1">
              <div className="w-full h-full rounded-3xl bg-card flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                <div className="text-center z-10 p-8">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent overflow-hidden">
                    <img src={diegoPhoto} alt="Diego Amorim" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground">Diego Amorim</h3>
                  <p className="text-primary font-medium mt-1">Fundador & Arquiteto Principal</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">
              Quem somos
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Sobre a DATECH
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              A DATECH nasceu da paixão por tecnologia e inovação. Liderada por
              <strong className="text-foreground"> Diego Amorim</strong>, desenvolvedor e arquiteto principal,
              nossa missão é criar soluções digitais que transformam negócios e conectam pessoas.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Com experiência em diversas tecnologias e metodologias modernas, entregamos projetos
              que combinam design sofisticado, performance excepcional e código de qualidade.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: Code2, label: "Código Limpo", desc: "Qualidade e manutenibilidade" },
                { icon: Lightbulb, label: "Inovação", desc: "Soluções criativas" },
                { icon: Target, label: "Resultado", desc: "Foco em conversão" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-center"
                >
                  <item.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-display font-semibold text-foreground text-sm">{item.label}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
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
