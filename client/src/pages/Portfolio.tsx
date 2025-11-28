import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CTASection } from "@/components/sections/CTASection";
import { fadeInUp, staggerContainer, pageTransition, imageHover, overlayHover } from "@/lib/animations";
import type { Project } from "@shared/schema";

function ProjectCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-card border border-border/50">
      <Skeleton className="aspect-[16/10] w-full" />
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6 mt-1" />
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const categories = projects
    ? ["All", ...Array.from(new Set(projects.map((p) => p.category)))]
    : ["All"];

  const filteredProjects =
    activeCategory === "All"
      ? projects || []
      : (projects || []).filter((p) => p.category === activeCategory);

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
              Our Work
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              Projects That{" "}
              <span className="text-gradient">Speak for Themselves</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              Explore our portfolio of successful projects spanning web development,
              mobile apps, branding, and digital transformation.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      <SectionWrapper>
        <Container size="lg">
          {error && (
            <motion.div variants={fadeInUp} className="text-center py-12">
              <p className="text-destructive">Failed to load projects. Please try again later.</p>
            </motion.div>
          )}

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="rounded-full"
                data-testid={`button-filter-${category.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {category}
              </Button>
            ))}
          </motion.div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {isLoading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <motion.div
                      key={`skeleton-${index}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProjectCardSkeleton />
                    </motion.div>
                  ))
                : filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link href={`/portfolio/${project.id}`}>
                        <motion.div
                          initial="rest"
                          whileHover="hover"
                          animate="rest"
                          className="group cursor-pointer rounded-xl overflow-hidden bg-card border border-border/50"
                          data-testid={`card-portfolio-${project.id}`}
                        >
                          <div className="aspect-[16/10] relative overflow-hidden">
                            <motion.img
                              variants={imageHover}
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            <motion.div
                              variants={overlayHover}
                              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6"
                            >
                              <div className="flex items-center gap-2 text-white">
                                <span className="text-sm font-medium">View Details</span>
                                <ExternalLink className="w-4 h-4" />
                              </div>
                            </motion.div>
                          </div>
                          <div className="p-5">
                            <div className="flex items-center gap-2 mb-3">
                              <Badge variant="secondary" className="text-xs">
                                {project.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {project.year}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                              {project.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {project.description}
                            </p>
                          </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
            </AnimatePresence>
          </motion.div>
        </Container>
      </SectionWrapper>

      <CTASection />
    </motion.div>
  );
}
