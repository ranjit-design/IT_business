import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Palette, TrendingUp, Sparkles, Smartphone, Lightbulb } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Container } from "@/components/layout/Container";
import { SectionWrapper, SectionHeader } from "@/components/layout/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fadeInUp, cardHover } from "@/lib/animations";
import type { Service } from "@shared/schema";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Palette,
  TrendingUp,
  Sparkles,
  Smartphone,
  Lightbulb,
};

function ServiceCardSkeleton() {
  return (
    <Card className="h-full border-border/50 bg-card/50">
      <CardContent className="p-6 lg:p-8 h-full flex flex-col">
        <Skeleton className="w-12 h-12 rounded-xl mb-5" />
        <Skeleton className="h-6 w-3/4 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-4/6" />
        <div className="mt-auto pt-5">
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

export function ServicesSection() {
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  return (
    <SectionWrapper id="services" gradient>
      <Container size="lg">
        <SectionHeader
          badge="Our Services"
          title="Solutions That Drive Growth"
          description="From concept to launch, we provide comprehensive digital services tailored to your unique business needs."
        />

        {error && (
          <motion.div variants={fadeInUp} className="text-center py-12">
            <p className="text-destructive">Failed to load services. Please try again later.</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <motion.div key={index} variants={fadeInUp} custom={index}>
                  <ServiceCardSkeleton />
                </motion.div>
              ))
            : services?.slice(0, 6).map((service, index) => {
                const IconComponent = iconMap[service.icon] || Code2;
                return (
                  <motion.div key={service.id} variants={fadeInUp} custom={index}>
                    <motion.div initial="rest" whileHover="hover" animate="rest">
                      <Link href={`/services#${service.id}`}>
                        <Card
                          className="h-full cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm group overflow-visible"
                          data-testid={`card-service-${service.id}`}
                        >
                          <motion.div variants={cardHover} className="h-full">
                            <CardContent className="p-6 lg:p-8 h-full flex flex-col">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                <IconComponent className="w-6 h-6 text-primary" />
                              </div>
                              <h3 className="text-xl font-semibold text-foreground mb-3">
                                {service.title}
                              </h3>
                              <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                                {service.description}
                              </p>
                              <div className="mt-5 flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                                <span>Learn more</span>
                                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </CardContent>
                          </motion.div>
                        </Card>
                      </Link>
                    </motion.div>
                  </motion.div>
                );
              })}
        </div>

        <motion.div variants={fadeInUp} className="text-center mt-12">
          <Link href="/services">
            <Button variant="outline" size="lg" className="gap-2" data-testid="button-all-services">
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}
