import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Container } from "@/components/layout/Container";
import { SectionWrapper, SectionHeader } from "@/components/layout/SectionWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fadeInUp, imageHover, overlayHover } from "@/lib/animations";
import type { Project } from "@shared/schema";

function ProjectCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-card border border-border/50">
      <Skeleton className="aspect-[16/10] w-full" />
      <div className="p-6">
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

export function PortfolioSection() {
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const featuredProjects = projects?.slice(0, 4) || [];

  return (
    <SectionWrapper id="portfolio">
      <Container size="lg">
        <SectionHeader
          badge="Our Work"
          title="Featured Projects"
          description="Explore our portfolio of successful digital transformations and creative solutions."
        />

        {error && (
          <motion.div variants={fadeInUp} className="text-center py-12">
            <p className="text-destructive">Failed to load projects. Please try again later.</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <motion.div key={index} variants={fadeInUp} custom={index}>
                  <ProjectCardSkeleton />
                </motion.div>
              ))
            : featuredProjects.map((project, index) => (
                <motion.div key={project.id} variants={fadeInUp} custom={index}>
                  <Link href={`/portfolio/${project.id}`}>
                    <motion.div
                      initial="rest"
                      whileHover="hover"
                      animate="rest"
                      className="group cursor-pointer relative rounded-xl overflow-hidden bg-card border border-border/50"
                      data-testid={`card-project-${project.id}`}
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
                            <span className="text-sm font-medium">View Project</span>
                            <ExternalLink className="w-4 h-4" />
                          </div>
                        </motion.div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary" className="text-xs">
                            {project.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{project.year}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
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
        </div>

        <motion.div variants={fadeInUp} className="text-center mt-12">
          <Link href="/portfolio">
            <Button variant="outline" size="lg" className="gap-2" data-testid="button-all-projects">
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}
