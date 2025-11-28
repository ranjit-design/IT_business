import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Container } from "@/components/layout/Container";
import { SectionWrapper, SectionHeader } from "@/components/layout/SectionWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { fadeInUp, timelineVariants } from "@/lib/animations";
import type { TimelineEvent } from "@shared/schema";

function TimelineEventSkeleton({ isEven }: { isEven: boolean }) {
  return (
    <div
      className={`relative md:flex items-center ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <div className={`md:w-1/2 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
        <div className="p-6 rounded-xl bg-card border border-border/50">
          <Skeleton className="h-6 w-16 mb-3" />
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
      <div className="hidden md:block w-4 h-4 rounded-full bg-muted absolute left-1/2 -translate-x-1/2" />
      <div className="md:w-1/2" />
    </div>
  );
}

export function TimelineSection() {
  const { data: timeline, isLoading, error } = useQuery<TimelineEvent[]>({
    queryKey: ["/api/timeline"],
  });

  return (
    <SectionWrapper>
      <Container size="lg">
        <SectionHeader
          badge="Our Journey"
          title="A Decade of Excellence"
          description="From humble beginnings to industry recognition, here's our story of growth and innovation."
        />

        {error && (
          <motion.div variants={fadeInUp} className="text-center py-12">
            <p className="text-destructive">Failed to load timeline. Please try again later.</p>
          </motion.div>
        )}

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary to-primary/50 hidden md:block" />

          <div className="space-y-8 md:space-y-0">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <motion.div key={index} variants={fadeInUp}>
                    <TimelineEventSkeleton isEven={index % 2 === 0} />
                  </motion.div>
                ))
              : timeline?.map((event, index) => (
                  <motion.div
                    key={event.id}
                    variants={fadeInUp}
                    className={`relative md:flex items-center ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                    data-testid={`timeline-event-${event.id}`}
                  >
                    <div
                      className={`md:w-1/2 ${
                        index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                      }`}
                    >
                      <motion.div
                        variants={timelineVariants}
                        className="p-6 rounded-xl bg-card border border-border/50 hover-elevate"
                      >
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-3">
                          {event.year}
                        </span>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {event.description}
                        </p>
                      </motion.div>
                    </div>

                    <motion.div
                      variants={timelineVariants}
                      className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center"
                    >
                      <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                    </motion.div>

                    <div className="md:w-1/2" />
                  </motion.div>
                ))}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
