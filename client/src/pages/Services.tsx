import { motion } from "framer-motion";
import { ArrowRight, Code2, Palette, TrendingUp, Sparkles, Smartphone, Lightbulb, Check } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CTASection } from "@/components/sections/CTASection";
import { fadeInUp, staggerContainer, pageTransition, cardHover } from "@/lib/animations";
import type { Service } from "@shared/schema";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Palette,
  TrendingUp,
  Sparkles,
  Smartphone,
  Lightbulb,
};

function ServiceDetailSkeleton({ isEven }: { isEven: boolean }) {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className={isEven ? "lg:order-1" : "lg:order-2"}>
        <Skeleton className="w-16 h-16 rounded-2xl mb-6" />
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-6" />
        <div className="space-y-3 mb-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="w-5 h-5 rounded-full shrink-0" />
              <Skeleton className="h-4 w-40" />
            </div>
          ))}
        </div>
        <Skeleton className="h-11 w-36" />
      </div>
      <div className={isEven ? "lg:order-2" : "lg:order-1"}>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-8">
            <Skeleton className="aspect-[4/3] w-full rounded-lg" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function Services() {
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

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
              Our Services
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              Comprehensive{" "}
              <span className="text-gradient">Digital Solutions</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              From strategy to execution, we offer a full spectrum of digital services
              designed to help your business thrive in the modern landscape.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      <SectionWrapper>
        <Container size="lg">
          {error && (
            <motion.div variants={fadeInUp} className="text-center py-12">
              <p className="text-destructive">Failed to load services. Please try again later.</p>
            </motion.div>
          )}

          <div className="space-y-24">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <motion.div
                    key={index}
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <ServiceDetailSkeleton isEven={index % 2 === 0} />
                  </motion.div>
                ))
              : services?.map((service, index) => {
                  const IconComponent = iconMap[service.icon] || Code2;
                  const isEven = index % 2 === 0;

                  return (
                    <motion.div
                      key={service.id}
                      id={service.id}
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                      className={`grid lg:grid-cols-2 gap-12 items-center ${
                        !isEven ? "lg:flex-row-reverse" : ""
                      }`}
                      data-testid={`service-detail-${service.id}`}
                    >
                      <motion.div
                        variants={fadeInUp}
                        className={isEven ? "lg:order-1" : "lg:order-2"}
                      >
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center mb-6">
                          <IconComponent className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                          {service.title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {service.description}
                        </p>
                        <ul className="space-y-3 mb-8">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3 text-foreground">
                              <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                                <Check className="w-3 h-3 text-green-500" />
                              </div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Link href="/contact">
                          <Button
                            size="lg"
                            className="gap-2 group"
                            data-testid={`button-service-contact-${service.id}`}
                          >
                            Get Started
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </Link>
                      </motion.div>

                      <motion.div
                        variants={fadeInUp}
                        className={isEven ? "lg:order-2" : "lg:order-1"}
                      >
                        <motion.div initial="rest" whileHover="hover" animate="rest">
                          <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-visible">
                            <motion.div variants={cardHover}>
                              <CardContent className="p-8">
                                <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-primary/5 to-purple-500/5 border border-border/50 flex items-center justify-center">
                                  <IconComponent className="w-24 h-24 text-primary/20" />
                                </div>
                              </CardContent>
                            </motion.div>
                          </Card>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  );
                })}
          </div>
        </Container>
      </SectionWrapper>

      <CTASection />
    </motion.div>
  );
}
