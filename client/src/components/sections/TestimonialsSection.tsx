import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Container } from "@/components/layout/Container";
import { SectionWrapper, SectionHeader } from "@/components/layout/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { fadeInUp } from "@/lib/animations";
import type { Testimonial } from "@shared/schema";

function TestimonialSkeleton() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-8 md:p-12">
        <div className="text-center min-h-[280px] md:min-h-[240px] flex flex-col items-center justify-center">
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-5 h-5 rounded" />
            ))}
          </div>
          <Skeleton className="h-6 w-full max-w-lg mb-2" />
          <Skeleton className="h-6 w-4/5 mb-2" />
          <Skeleton className="h-6 w-3/5 mb-8" />
          <Skeleton className="w-16 h-16 rounded-full mb-4" />
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-4 w-40" />
        </div>
      </CardContent>
    </Card>
  );
}

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;
    
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials]);

  const handlePrevious = () => {
    if (!testimonials) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    if (!testimonials) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <SectionWrapper gradient>
      <Container size="lg">
        <SectionHeader
          badge="Testimonials"
          title="What Our Clients Say"
          description="Don't just take our word for it. Here's what our clients have to say about working with us."
        />

        {error && (
          <motion.div variants={fadeInUp} className="text-center py-12">
            <p className="text-destructive">Failed to load testimonials. Please try again later.</p>
          </motion.div>
        )}

        <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
          {isLoading ? (
            <TestimonialSkeleton />
          ) : testimonials && testimonials.length > 0 ? (
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-8 md:p-12 relative">
                <Quote className="absolute top-8 left-8 w-12 h-12 text-primary/10" />

                <div className="relative min-h-[280px] md:min-h-[240px] flex items-center">
                  <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                      key={currentIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                      }}
                      className="w-full"
                    >
                      <div className="text-center">
                        <div className="flex justify-center gap-1 mb-6">
                          {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 italic">
                          "{testimonials[currentIndex].content}"
                        </p>
                        <div className="flex flex-col items-center">
                          <Avatar className="w-16 h-16 mb-4 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
                            <AvatarImage
                              src={testimonials[currentIndex].avatar}
                              alt={testimonials[currentIndex].name}
                            />
                            <AvatarFallback>
                              {testimonials[currentIndex].name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <h4 className="text-lg font-semibold text-foreground">
                            {testimonials[currentIndex].name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex items-center justify-center gap-4 mt-8">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrevious}
                    className="rounded-full"
                    data-testid="button-testimonial-prev"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setDirection(index > currentIndex ? 1 : -1);
                          setCurrentIndex(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentIndex
                            ? "w-6 bg-primary"
                            : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                        }`}
                        data-testid={`button-testimonial-dot-${index}`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNext}
                    className="rounded-full"
                    data-testid="button-testimonial-next"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : null}
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}
