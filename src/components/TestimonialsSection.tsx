import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Ana Carolina Silva",
    role: "CEO",
    text: "A DATECH transformou completamente nossa presença online. O e-commerce ficou incrível.",
  },
  {
    name: "Roberto Mendes",
    role: "Diretor",
    text: "O sistema de gestão desenvolvido pela equipe superou todas as expectativas. Eficiente, intuitivo e extremamente bem feito.",
  },
  {
    name: "Fernanda Oliveira",
    role: "Fundadora",
    text: "Profissionalismo e dedicação excepcionais. A landing page converteu muito acima da média do mercado. Recomendo fortemente!",
  },
  {
    name: "Carlos Eduardo",
    role: "Gerente, FastLogística",
    text: "Diego entendeu exatamente o que precisávamos. O portal ficou moderno, rápido e nossos clientes adoraram a nova experiência.",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="depoimentos" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">O que dizem nossos clientes</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Depoimentos</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {testimonials.map((t) => (
                <CarouselItem key={t.name}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center px-4 md:px-16 py-8"
                  >
                    <Quote className="h-10 w-10 text-primary/30 mx-auto mb-6" />
                    <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 italic">"{t.text}"</p>
                    <div className="flex justify-center gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <h4 className="font-display font-semibold text-foreground">{t.name}</h4>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4" />
            <CarouselNext className="hidden md:flex -right-4" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
