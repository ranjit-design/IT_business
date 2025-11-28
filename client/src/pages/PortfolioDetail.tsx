import { motion } from "framer-motion";
import { useRoute, Link } from "wouter";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CTASection } from "@/components/sections/CTASection";
import { fadeInUp, staggerContainer, pageTransition } from "@/lib/animations";
import type { Project } from "@shared/schema";

function ProjectDetailSkeleton() {
  return (
    <>
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <Container size="lg" className="relative z-10">
          <div className="mb-6">
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-14 w-3/4 mb-6" />
          <Skeleton className="h-6 w-full max-w-3xl mb-2" />
          <Skeleton className="h-6 w-4/5 max-w-3xl" />
        </Container>
      </section>
      <section className="pb-16">
        <Container size="lg">
          <Skeleton className="aspect-[16/9] w-full rounded-2xl" />
        </Container>
      </section>
    </>
  );
}

export default function PortfolioDetail() {
  const [, params] = useRoute("/portfolio/:id");
  const projectId = params?.id;

  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: ["/api/projects", projectId],
    enabled: !!projectId,
  });

  const { data: allProjects } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const currentIndex = allProjects?.findIndex((p) => p.id === projectId) ?? -1;
  const prevProject = currentIndex > 0 ? allProjects?.[currentIndex - 1] : null;
  const nextProject =
    allProjects && currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  if (isLoading) {
    return (
      <motion.div
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <ProjectDetailSkeleton />
      </motion.div>
    );
  }

  if (error || !project) {
    return (
      <motion.div
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The project you're looking for doesn't exist.
          </p>
          <Link href="/portfolio">
            <Button data-testid="button-back-portfolio">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
        </div>
      </motion.div>
    );
  }

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
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeInUp} className="mb-6">
              <Link href="/portfolio">
                <span className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Portfolio
                </span>
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="secondary">{project.category}</Badge>
              <span className="text-sm text-muted-foreground">{project.year}</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{project.client}</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              {project.title}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground leading-relaxed max-w-3xl"
            >
              {project.description}
            </motion.p>
          </motion.div>
        </Container>
      </section>

      <section className="pb-16">
        <Container size="lg">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full aspect-[16/9] object-cover"
            />
          </motion.div>
        </Container>
      </section>

      <SectionWrapper>
        <Container size="lg">
          <div className="grid lg:grid-cols-3 gap-12">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-12"
            >
              <motion.div variants={fadeInUp}>
                <h2 className="text-2xl font-bold text-foreground mb-4">The Challenge</h2>
                <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Solution</h2>
                <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h2 className="text-2xl font-bold text-foreground mb-4">Key Results</h2>
                <ul className="space-y-3">
                  {project.results.map((result) => (
                    <li key={result} className="flex items-center gap-3 text-foreground">
                      <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-green-500" />
                      </div>
                      {result}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div variants={fadeInUp}>
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4">Project Details</h3>
                    <dl className="space-y-4">
                      <div>
                        <dt className="text-sm text-muted-foreground mb-1">Client</dt>
                        <dd className="text-foreground font-medium">{project.client}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-muted-foreground mb-1">Year</dt>
                        <dd className="text-foreground font-medium">{project.year}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-muted-foreground mb-1">Category</dt>
                        <dd className="text-foreground font-medium">{project.category}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Link href="/contact">
                  <Button className="w-full gap-2" data-testid="button-project-contact">
                    Start a Similar Project
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </SectionWrapper>

      <section className="py-16 border-t border-border">
        <Container size="lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {prevProject ? (
              <Link href={`/portfolio/${prevProject.id}`}>
                <motion.div
                  whileHover={{ x: -5 }}
                  className="flex items-center gap-3 cursor-pointer group"
                  data-testid="link-prev-project"
                >
                  <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <div className="text-left">
                    <span className="text-sm text-muted-foreground">Previous</span>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {prevProject.title}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link href={`/portfolio/${nextProject.id}`}>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 cursor-pointer group"
                  data-testid="link-next-project"
                >
                  <div className="text-right">
                    <span className="text-sm text-muted-foreground">Next</span>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {nextProject.title}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </motion.div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </Container>
      </section>

      <CTASection />
    </motion.div>
  );
}
