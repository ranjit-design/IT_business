import { motion } from "framer-motion";
import { Award, Users, Zap, Shield, Clock, HeartHandshake } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper, SectionHeader } from "@/components/layout/SectionWrapper";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const features = [
  {
    icon: Award,
    title: "Award-Winning Team",
    description: "Our talented team has been recognized with multiple industry awards for design and innovation.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "We deliver high-quality work on time, every time. Your timeline is our priority.",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "Every project undergoes rigorous quality assurance to ensure flawless execution.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "Get personalized attention from a dedicated team that truly understands your goals.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Our global team ensures support and updates are always just a message away.",
  },
  {
    icon: HeartHandshake,
    title: "Long-term Partnership",
    description: "We build lasting relationships, supporting your growth every step of the way.",
  },
];

export function WhyChooseUs() {
  return (
    <SectionWrapper>
      <Container size="lg">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary rounded-full mb-4"
            >
              Why Choose Us
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight"
            >
              We're Different. Here's Why.
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground leading-relaxed mb-8"
            >
              We combine creativity with technology to deliver solutions that not only look 
              stunning but also drive real business results. Our approach is collaborative, 
              transparent, and focused on your success.
            </motion.p>
            
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-6"
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-gradient mb-1">150+</div>
                <div className="text-sm text-muted-foreground">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gradient mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gradient mb-1">98%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                custom={index}
                className="p-5 rounded-xl bg-card border border-border/50 hover-elevate"
                data-testid={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
