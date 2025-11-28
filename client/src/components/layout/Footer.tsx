import { Link } from "wouter";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const footerLinks = {
  company: [
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/contact", label: "Contact" },
  ],
  services: [
    { href: "/services#web-development", label: "Web Development" },
    { href: "/services#ui-ux-design", label: "UI/UX Design" },
    { href: "/services#digital-marketing", label: "Digital Marketing" },
    { href: "/services#brand-strategy", label: "Brand Strategy" },
  ],
};

const socialLinks = [
  { href: "https://www.linkedin.com/in/ranjit-chaudhary-043969362/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://x.com/ChaudharyR66680", icon: Twitter, label: "Twitter" },
  { href: "https://github.com/ranjit-design", icon: Github, label: "GitHub" },
  { href: "https://www.instagram.com/ranjit_kanxa/", icon: Instagram, label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-12 md:py-16 lg:py-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <motion.div variants={fadeInUp} className="lg:col-span-1">
              <Link href="/">
                <div className="flex items-center gap-2 cursor-pointer mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">A</span>
                  </div>
                  <span className="text-2xl font-bold text-foreground">Ranjit</span>
                </div>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                We craft digital experiences that transform businesses and delight users. 
                Your success is our mission.
              </p>
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors"
                    aria-label={social.label}
                    data-testid={`link-social-${social.label.toLowerCase()}`}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <span 
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="font-semibold text-foreground mb-4">Services</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <span 
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        data-testid={`link-footer-service-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="font-semibold text-foreground mb-4">Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Subscribe to get the latest updates and insights.
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <Input
                  type="email"
                  placeholder="Email..."
                  className="flex-1"
                  data-testid="input-newsletter-email"
                />
                <Button type="submit" data-testid="button-newsletter-subscribe">
                  Subscribe
                </Button>
              </form>
              <div className="mt-6 space-y-3">
                <a 
                  href="mailto:ranjitchaudhary057@gmail.com" 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-email"
                >
                  <Mail className="w-3 h-3" />
                    abc@gmail.com
                </a>
                <a 
                  href="tel:+1234567890" 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-phone"
                >
                  <Phone className="w-4 h-4" />
                  +977-9744232833
                </a>
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  Kathmandu, NEPAL
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="py-6 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Ranjit Agency. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </Link>
              <Link href="#">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
