import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { fadeInUp, staggerContainer, cardHover } from "@/lib/animations";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To empower businesses with innovative digital solutions that drive growth, enhance user experiences, and create lasting impact in an ever-evolving digital landscape.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To be the global leader in digital transformation, recognized for our creative excellence, technical innovation, and unwavering commitment to client success.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "We believe in transparency, collaboration, and excellence. Every project is an opportunity to push boundaries, exceed expectations, and build meaningful partnerships.",
  },
];

export function MissionSection() {
  return (
    <SectionWrapper gradient>
      <Container size="lg">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary rounded-full mb-4"
          >
            About Us
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight max-w-3xl mx-auto"
          >
            Transforming Ideas Into Digital Reality
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Since 2015, we've been at the forefront of digital innovation, helping 
            businesses of all sizes navigate the digital landscape and achieve their goals.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {values.map((value, index) => (
            <motion.div key={value.title} variants={fadeInUp} custom={index}>
              <motion.div initial="rest" whileHover="hover" animate="rest">
                <Card 
                  className="h-full border-border/50 bg-card/50 backdrop-blur-sm text-center overflow-visible"
                  data-testid={`card-value-${value.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <motion.div variants={cardHover} className="h-full">
                    <CardContent className="p-8 h-full flex flex-col">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center mx-auto mb-6">
                        <value.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-4">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </motion.div>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}
