import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />

      <Container size="sm" className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.div
            variants={fadeInUp}
            className="text-8xl md:text-9xl font-bold text-gradient mb-4"
          >
            404
          </motion.div>
          
          <motion.h1
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Page Not Found
          </motion.h1>
          
          <motion.p
            variants={fadeInUp}
            className="text-muted-foreground text-lg mb-8 max-w-md mx-auto"
          >
            Oops! The page you're looking for doesn't exist or has been moved.
          </motion.p>
          
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/">
              <Button size="lg" className="gap-2" data-testid="button-go-home">
                <Home className="w-4 h-4" />
                Go Home
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.history.back()}
              className="gap-2"
              data-testid="button-go-back"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
