import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { fadeInUp, staggerContainer, floatingAnimation, glowAnimation } from "@/lib/animations";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-hero" />
      
      <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-purple-500/20 rounded-full blur-3xl" />
      
      <motion.div
        className="absolute top-20 right-20 w-20 h-20 border border-primary/20 rounded-2xl hidden lg:block"
        {...floatingAnimation}
        style={{ animationDelay: "0s" }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-16 h-16 bg-primary/10 rounded-full hidden lg:block"
        {...floatingAnimation}
        style={{ animationDelay: "2s" }}
      />
      <motion.div
        className="absolute top-40 left-40 w-8 h-8 bg-purple-500/20 rounded-lg hidden lg:block"
        {...floatingAnimation}
        style={{ animationDelay: "4s" }}
      />

      <Container size="lg" className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Now accepting new projects for 2025-Future
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-6"
          >
            We Build{" "}
            <span className="text-gradient">Digital Experiences</span>
            {" "}That Matter
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            A premium digital agency crafting exceptional websites, applications, 
            and brand experiences for forward-thinking businesses.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/contact">
              <Button size="lg" className="min-w-[180px] gap-2 group" data-testid="button-hero-start">
                Start Your Project
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button 
                variant="outline" 
                size="lg" 
                className="min-w-[180px] gap-2"
                data-testid="button-hero-portfolio"
              >
                <Play className="w-4 h-4" />
                View Our Work
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-16 md:mt-24"
          >
            <p className="text-sm text-muted-foreground mb-6">Trusted by industry leaders</p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
              {["TechCorp", "InnovateLabs", "FutureBrand", "GlobalTech", "NextGen"].map((company) => (
                <motion.span
                  key={company}
                  className="text-lg md:text-xl font-semibold text-muted-foreground/80"
                  whileHover={{ scale: 1.05, opacity: 1 }}
                >
                  {company}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-3 bg-muted-foreground/50 rounded-full mt-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
