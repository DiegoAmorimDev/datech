import { motion } from "framer-motion";
import { Globe, Monitor, Rocket, ShoppingCart } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Desenvolvimento de Sites",
    description: "Sites modernos, responsivos e otimizados para SEO que convertem visitantes em clientes.",
  },
  {
    icon: Monitor,
    title: "Sistemas Web",
    description: "Sistemas robustos e escaláveis para gestão, automação e controle do seu negócio.",
  },
  {
    icon: Rocket,
    title: "Landing Pages",
    description: "Páginas de alta conversão com design impactante e performance excepcional.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Lojas virtuais completas com pagamento integrado e experiência de compra fluida.",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">
            O que fazemos
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Nossos Serviços
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-8 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="mb-5 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-secondary text-primary group-hover:bg-primary group-hover:text-accent-foreground transition-colors duration-300">
                <service.icon className="h-7 w-7" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
