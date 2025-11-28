# Business Agency Website - Design Guidelines

## Design Approach
**Reference-Based**: Drawing inspiration from premium agency websites like Stripe, Linear, and Vercel, combined with modern business aesthetics. This project prioritizes visual impact and emotional engagement while maintaining professional credibility.

## Core Design Principles
1. **Premium Modern Aesthetic**: Professional yet approachable, confidence-inspiring
2. **Motion-First Design**: Every interaction animated smoothly to create memorable experiences
3. **Visual Hierarchy**: Large typography and strategic use of whitespace
4. **Glassmorphism Elements**: Subtle blur effects and transparency for depth

## Typography
- **Headlines**: Bold, large-scale typography (text-5xl to text-7xl) for hero sections
- **Subheadings**: Medium weight (text-2xl to text-4xl) for section titles
- **Body**: Clean, readable (text-base to text-lg) with generous line-height
- **Accent Text**: Gradient text effects on key phrases using bg-clip-text

## Layout System
**Spacing**: Tailwind units of 4, 8, 12, 16, 20, and 24 for consistent rhythm
- Section padding: py-20 to py-32 (desktop), py-12 to py-16 (mobile)
- Component gaps: gap-6 to gap-12
- Container max-width: max-w-7xl with px-4 to px-8

## Component Library

### Navigation
- Fixed/sticky header with backdrop blur effect (backdrop-blur-lg)
- Logo on left, navigation links centered/right
- Mobile: Animated hamburger menu with slide-in panel
- Transparent on hero, solid background on scroll

### Hero Section (Home)
- Full-height viewport (min-h-screen) with large background image from Unsplash
- Centered content with animated headline entering from bottom
- Gradient overlay for text readability (dark to transparent)
- CTA buttons with backdrop-blur and border glow effects
- Subtle floating animation on decorative elements

### Service Cards
- Grid layout: 3 columns (desktop), 2 (tablet), 1 (mobile)
- Card design: Glassmorphism effect with border gradients
- Icon at top, title, description, hover lift animation
- Hover state: Scale slightly (scale-105), enhanced glow

### Portfolio Grid
- Masonry or equal-height grid (2-3 columns)
- Project cards with image overlay
- Hover: Image zoom, overlay fade-in with project details
- Click: Navigate to full project detail page

### Testimonials Slider
- Horizontal auto-scrolling carousel
- Cards with client photo, quote, name, company
- Glassmorphism cards with subtle shadows
- Navigation dots at bottom

### Team Section (About Page)
- Grid of team member cards (3-4 columns)
- Circular profile images
- Hover: Card flips or lifts with additional info reveal
- Name, role, social links

### Timeline (About Page)
- Vertical timeline with alternating left/right content
- Milestone markers with connecting line
- Scroll-triggered animations revealing each milestone
- Year labels, description cards

### Contact Form
- Clean, modern form inputs with focus states
- Floating labels or top-aligned labels
- Gradient submit button
- Form on left, contact info/map on right (2-column layout)

### Footer
- Multi-column layout: Company info, Quick Links, Services, Contact
- Social media icons with hover effects
- Newsletter signup with inline form
- Copyright and legal links at bottom

## Animations
**Framer Motion Patterns**:
- **Scroll Reveal**: Fade up with stagger for section elements
- **Page Transitions**: Fade + slide between route changes
- **Hover Effects**: Scale, glow, color transitions
- **Hero Elements**: Staggered entrance animations on load
- **Card Interactions**: Lift on hover (y-axis transform)

## Visual Effects
- **Gradients**: Subtle blue-to-purple, pink-to-orange for accents
- **Glassmorphism**: bg-white/10 with backdrop-blur-xl and border highlights
- **Shadows**: Soft, layered shadows (shadow-lg to shadow-2xl)
- **Borders**: Gradient borders on cards using pseudo-elements

## Images
**Hero Section**: Large, high-quality business/office imagery from Unsplash (team collaboration, modern workspace, city skyline)
**Services**: Icon illustrations or abstract imagery
**Portfolio**: Project screenshots and mockups
**Team**: Professional headshots on neutral backgrounds
**About Timeline**: Optional milestone imagery

All hero images should have gradient overlays (dark bottom/top) for text legibility. Buttons on images use backdrop-blur-md backgrounds.

## Responsive Strategy
- Mobile-first approach
- Hamburger menu below lg breakpoint
- Stack columns on mobile (grid-cols-1)
- Reduce padding and font sizes proportionally
- Touch-friendly button sizes (min 44px)

## Dark/Light Theme
Use CSS variables for theme switching:
- Light: Clean whites, subtle grays, vibrant gradients
- Dark: Deep backgrounds (slate-900), elevated cards, enhanced glows
- Toggle in header navigation