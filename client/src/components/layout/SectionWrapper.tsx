import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  gradient?: boolean;
}

export function SectionWrapper({ children, className, id, gradient = false }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "py-12 sm:py-16 md:py-24 lg:py-32 relative overflow-hidden",
        gradient && "section-gradient",
        className
      )}
    >
      {children}
    </motion.section>
  );
}

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  description,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className={cn(
        "mb-8 sm:mb-10 md:mb-12 lg:mb-16",
        centered && "text-center max-w-3xl mx-auto",
        className
      )}
    >
      {badge && (
        <span className="inline-block px-3 sm:px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary rounded-full mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed px-2 sm:px-0">
          {description}
        </p>
      )}
    </motion.div>
  );
}
