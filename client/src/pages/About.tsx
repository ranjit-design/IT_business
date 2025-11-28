import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { MissionSection } from "@/components/sections/MissionSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { CTASection } from "@/components/sections/CTASection";
import { fadeInUp, staggerContainer, pageTransition } from "@/lib/animations";

export default function About() {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
        
        <Container size="lg" className="relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center max-w-3xl mx-auto"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary rounded-full mb-4"
            >
              About Ranjit
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              Building the Future of{" "}
              <span className="text-gradient">Digital Excellence</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              We're a team of passionate creators, strategists, and technologists 
              dedicated to transforming businesses through exceptional digital experiences.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      <MissionSection />
      <TimelineSection />
      <TeamSection />
      <CTASection />
    </motion.div>
  );
}
