import { motion } from "framer-motion";
import { Linkedin, Twitter, Github } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Container } from "@/components/layout/Container";
import { SectionWrapper, SectionHeader } from "@/components/layout/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { fadeInUp, cardHover } from "@/lib/animations";
import type { TeamMember } from "@shared/schema";

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: Linkedin,
  twitter: Twitter,
  github: Github,
};

function TeamMemberSkeleton() {
  return (
    <Card className="border-border/50 bg-card/50">
      <CardContent className="p-6 text-center">
        <div className="relative inline-block mb-5">
          <Skeleton className="w-24 h-24 rounded-full" />
        </div>
        <Skeleton className="h-5 w-32 mx-auto mb-1" />
        <Skeleton className="h-4 w-24 mx-auto mb-3" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6 mx-auto" />
      </CardContent>
    </Card>
  );
}

export function TeamSection() {
  const { data: teamMembers, isLoading, error } = useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
  });

  return (
    <SectionWrapper gradient>
      <Container size="lg">
        <SectionHeader
          badge="Our Team"
          title="Meet the Experts"
          description="A talented team of strategists, designers, and developers dedicated to delivering exceptional results."
        />

        {error && (
          <motion.div variants={fadeInUp} className="text-center py-12">
            <p className="text-destructive">Failed to load team members. Please try again later.</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <motion.div key={index} variants={fadeInUp} custom={index}>
                  <TeamMemberSkeleton />
                </motion.div>
              ))
            : teamMembers?.map((member, index) => (
                <motion.div key={member.id} variants={fadeInUp} custom={index}>
                  <motion.div initial="rest" whileHover="hover" animate="rest">
                    <Card
                      className="border-border/50 bg-card/50 backdrop-blur-sm overflow-visible group"
                      data-testid={`card-team-${member.id}`}
                    >
                      <motion.div variants={cardHover}>
                        <CardContent className="p-6 text-center">
                          <div className="relative inline-block mb-5">
                            <Avatar className="w-24 h-24 ring-4 ring-primary/10 ring-offset-4 ring-offset-background group-hover:ring-primary/30 transition-all duration-300">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback className="text-2xl">
                                {member.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                              {Object.entries(member.social).map(([platform, url]) => {
                                const Icon = socialIcons[platform];
                                if (!Icon || !url) return null;
                                return (
                                  <a
                                    key={platform}
                                    href={url}
                                    className="w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                                    data-testid={`link-team-social-${member.id}-${platform}`}
                                  >
                                    <Icon className="w-3.5 h-3.5" />
                                  </a>
                                );
                              })}
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-foreground mb-1">
                            {member.name}
                          </h3>
                          <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {member.bio}
                          </p>
                        </CardContent>
                      </motion.div>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
