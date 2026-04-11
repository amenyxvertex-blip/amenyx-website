# AMENYX VORTEX — FULL BRAND WEBSITE DESIGN PROMPT
### Premium · Futuristic · AI-Native · Enterprise-Grade
> For use with MCP (Stitch) + Antigravity Skill

---

## 01 — BRAND IDENTITY CONTEXT

**Company:** Amenyx Vortex
**Tagline:** *Where Problems End.*
**What We Do:** AI Solutions · Full-Cycle Software Development · End-to-End Digital Transformation
**Who We Serve:** Startups · Enterprises · Government & Public Sector
**Brand Personality:** Authoritative · Precise · Futuristic · Zero-fluff · Elite

**The Feeling:** A client should land on this website and immediately feel they are dealing with a company operating at a level above everyone else. Not loud. Not flashy. *Dominant.*

---

## 02 — AESTHETIC DIRECTION

**Theme:** Dark-first, deep-space premium — with luminous light accents
**Mood:** Like if Palantir, Linear, and a top-tier defense contractor designed a website together
**Tone:** Luxury tech meets AI intelligence — refined, surgical, powerful

**Visual References:**
- Deep obsidian backgrounds with electric blue/cyan energy accents
- Razor-thin grid lines suggesting precision and engineering depth
- Glass panels floating in dark space — depth without clutter
- Minimal motion: purposeful, not decorative — everything moves for a reason
- Typography that commands — not decorates

**Do NOT use:**
- Purple-gradient-on-white (generic SaaS cliché)
- Stock icon libraries that look templated
- Bouncy cartoony animations
- Busy, cluttered layouts
- Any font that feels "startup-kit"

---

## 03 — DESIGN TOKENS

### Color System
```css
/* Foundations */
--bg-void:          #05060D;   /* deepest background — almost black */
--bg-depth:         #080B14;   /* base page background */
--bg-surface:       #0D1120;   /* card/panel background */
--bg-elevated:      #121828;   /* elevated glass panels */
--bg-overlay:       rgba(13, 17, 32, 0.75); /* glass overlay */

/* Borders */
--border-subtle:    rgba(255,255,255,0.06);
--border-default:   rgba(255,255,255,0.10);
--border-accent:    rgba(0,198,255,0.25);
--border-glow:      rgba(0,198,255,0.5);

/* Text */
--text-primary:     #F0F4FF;   /* near-white, slightly cool */
--text-secondary:   #8A9BBF;   /* muted blue-grey */
--text-muted:       #4A5670;   /* hint text */
--text-inverse:     #05060D;   /* text on light surfaces */

/* Accent Spectrum — The Vortex Palette */
--accent-cyan:      #00C6FF;   /* primary electric accent */
--accent-blue:      #0072FF;   /* deep anchor blue */
--accent-ice:       #A8DEFF;   /* soft highlight */
--accent-gold:      #F0C060;   /* premium tier, used sparingly */
--accent-white:     #FFFFFF;

/* Gradients */
--gradient-primary: linear-gradient(135deg, #00C6FF 0%, #0072FF 100%);
--gradient-glow:    linear-gradient(135deg, #00C6FF 0%, #004FB8 60%, #001A66 100%);
--gradient-gold:    linear-gradient(135deg, #F0C060, #C88A20);
--gradient-surface: linear-gradient(145deg, rgba(0,198,255,0.06) 0%, transparent 60%);
--gradient-text:    linear-gradient(90deg, #FFFFFF 0%, #A8DEFF 50%, #00C6FF 100%);

/* Semantic */
--success:          #00D48A;
--warning:          #F0A030;
--danger:           #FF4466;
--info:             #00C6FF;
```

### Typography
```
Display Font:   "Syne" (Google Fonts) — futuristic, geometric, ultra-modern
Body Font:      "DM Sans" — clean, humanist, readable at all sizes
Mono Font:      "JetBrains Mono" — for code, data, and technical labels
```

| Token    | Size  | Line Height | Weight | Tracking   | Usage                        |
|----------|-------|-------------|--------|------------|------------------------------|
| Display  | 76px  | 82px        | 800    | -2%        | Hero headline                |
| H1       | 58px  | 66px        | 700    | -1.5%      | Section heroes               |
| H2       | 42px  | 52px        | 600    | -1%        | Section headings             |
| H3       | 28px  | 36px        | 600    | -0.5%      | Card titles, sub-sections    |
| H4       | 20px  | 28px        | 500    | 0          | Component headings           |
| Body-L   | 18px  | 30px        | 400    | 0          | Lead paragraphs              |
| Body     | 16px  | 26px        | 400    | 0          | Standard content             |
| Label    | 11px  | 16px        | 600    | +8%        | Eyebrows, tags, caps labels  |
| Mono     | 13px  | 20px        | 400    | 0          | Code, data, system text      |

### Spacing & Layout
```
Grid:          12-column, max-width 1280px, gutter 32px
Section pad:   120px vertical (desktop) / 80px (tablet) / 56px (mobile)
Base unit:     4px — scale: 4, 8, 12, 16, 24, 32, 48, 64, 80, 120
Border radius: 8px (sm) / 14px (md) / 24px (lg) / 9999px (pill)
```

### Shadows & Glows
```css
--shadow-subtle:   0 2px 8px rgba(0,0,0,0.3);
--shadow-card:     0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06);
--shadow-elevated: 0 20px 60px rgba(0,0,0,0.7);
--glow-cyan:       0 0 24px rgba(0,198,255,0.30), 0 0 48px rgba(0,198,255,0.12);
--glow-blue:       0 0 24px rgba(0,114,255,0.25);
--glow-gold:       0 0 20px rgba(240,192,96,0.30);
--glow-button:     0 8px 32px rgba(0,198,255,0.35);
```

---

## 04 — CORE COMPONENTS

### Navbar
```
Height: 68px (desktop), 56px (mobile)
Background: rgba(5,6,13,0.75) + backdrop-filter: blur(24px) saturate(180%)
Border-bottom: 1px solid rgba(255,255,255,0.07)
Position: sticky top-0, z-index: 1000

Left: Logo mark (vortex icon) + AMENYX wordmark + VORTEX sub-label
Center: Navigation links — About · Services · Work · Technology · Contact
Right: "Get Started" button (gradient pill) + optional language toggle

Active nav link: --accent-cyan color + 2px underline gradient
Hover: letter-spacing subtle increase + color shift to --accent-ice
Mobile: Hamburger → full-screen overlay menu with staggered link reveals
```

### Buttons
```
Primary CTA:
  - Height: 52px, padding: 0 32px, radius: 10px
  - Background: --gradient-primary
  - Text: white, 15px, weight 600, tracking +2%
  - Hover: scale(1.03) + --glow-button + gradient shift 10deg
  - Active: scale(0.98)

Secondary Ghost:
  - Border: 1px solid --border-default
  - Text: --text-primary
  - Hover: border-color --border-accent + background rgba(0,198,255,0.05)

Text Link:
  - Color: --accent-cyan
  - Hover: --accent-ice + underline from gradient

Icon Button:
  - 44×44px, radius 10px
  - Background: --bg-elevated
  - Border: 1px solid --border-subtle
  - Hover: border-color --border-accent + glow-cyan subtle
```

### Cards
```
Standard Card:
  - Background: --bg-surface
  - Border: 1px solid --border-subtle
  - Radius: 16px, padding: 32px
  - Shadow: --shadow-card
  - Hover: border-color --border-accent + translateY(-4px) + --shadow-elevated

Glass Card:
  - Background: --bg-overlay
  - backdrop-filter: blur(20px) saturate(150%)
  - Border: 1px solid rgba(0,198,255,0.15)
  - Hover: border-color rgba(0,198,255,0.35) + --glow-cyan

Feature Card:
  - Same as Standard + gradient top-left tint from --gradient-surface
  - Icon: 48×48px container, gradient background, glowing icon inside
  - Title: H3 weight 600
  - Description: Body, --text-secondary
```

### Inputs & Forms
```
Input Field:
  - Height: 52px, padding: 0 18px, radius: 10px
  - Background: rgba(255,255,255,0.04)
  - Border: 1px solid --border-default
  - Text: --text-primary, placeholder: --text-muted
  - Focus: border-color --accent-cyan + 0 0 0 3px rgba(0,198,255,0.12)
  - Transition: 200ms ease

Textarea:
  - Same styling, min-height: 140px, padding: 18px

Select:
  - Same as input + custom chevron icon in --accent-cyan

Form Label:
  - 12px, weight 500, --text-secondary, tracking +4%, uppercase
  - Margin-bottom: 8px
```

### Glassmorphism Panels
```
Background: rgba(13,17,32,0.70)
backdrop-filter: blur(32px) saturate(180%)
Border: 1px solid rgba(0,198,255,0.12)
Border-radius: 20px
Inner highlight: box-shadow inset 0 1px 0 rgba(255,255,255,0.08)
```

### Dividers
```
Standard: 1px solid --border-subtle, full width
Gradient: 1px height, background: linear-gradient(90deg, transparent, --accent-cyan, transparent)
Glow line: Same gradient + filter: blur(1px) underneath for ambient glow
```

### Animations
```
Global easing: cubic-bezier(0.16, 1, 0.3, 1) — premium spring
Duration:      250ms (micro) / 400ms (standard) / 700ms (entrance)

Entrance:      opacity 0→1 + translateY(24px→0) staggered per element
Hover lift:    translateY(-4px) + shadow increase, 250ms
Button press:  scale(0.97), 150ms
Glow pulse:    opacity oscillation 0.3→0.7, 3s ease-in-out infinite
Floating:      translateY(-8px→8px), 6s ease-in-out infinite alternate
Vortex spin:   rotate(0→360deg), 12–20s linear infinite (logo mark rings)
Scroll reveal: IntersectionObserver — trigger entrance animation at 80% threshold
```

---

## 05 — PAGES TO BUILD

---

### PAGE 1 — LANDING / HOME

#### Hero Section
```
Layout: Full viewport height, centered content, grid overlay subtle in background
Background: --bg-depth + radial gradient glow from center (deep blue-cyan bloom)
            + animated fine-dot-grid pattern (SVG, very low opacity)

Content:
  - Eyebrow label: "AI · SOFTWARE · TRANSFORMATION" (uppercase, --accent-cyan, letter-spaced)
  - Headline (Display): "We Build the Intelligence Behind What's Next"
    (gradient text: white → ice → cyan)
  - Sub-headline (Body-L): 2-line description of what Amenyx Vortex delivers
  - CTA Row: [Get Started →] (primary) + [View Our Work] (ghost)
  - Trust bar below CTAs: "Trusted by Startups · Enterprises · Government Bodies"
    with 3–4 placeholder logo slots (ghost/muted)

Right/Center visual:
  - The Vortex logo mark — large, animated, rings spinning slowly
  - Surrounded by 4 floating glass feature bubbles at orbital positions:
    "AI Solutions" · "Full-Stack Dev" · "End-to-End Delivery" · "24/7 Support"
  - Each bubble: glass card, icon, short label, subtle glow edge

Scroll indicator: thin animated down-chevron at bottom center
```

#### Services / What We Do
```
Eyebrow: "OUR SERVICES"
Heading: "Everything You Need. One Partner."
Layout: 3-column card grid

Card 1 — AI Solutions:
  Icon: neural network / brain glyph
  Title: "Artificial Intelligence"
  Body: AI systems, automation, ML models, intelligent products
  Footer link: "Explore AI →"

Card 2 — Software Development:
  Icon: code brackets / terminal glyph
  Title: "Software Development"
  Body: Web, mobile, enterprise apps — built clean and scalable
  Footer link: "Explore Dev →"

Card 3 — End-to-End Projects:
  Icon: infinite loop / delivery glyph
  Title: "Complete Project Delivery"
  Body: From idea to deployment — strategy, design, build, launch
  Footer link: "Explore Projects →"

Each card: gradient-tint top-left, hover lift + glow border
```

#### How We Work (Process)
```
Eyebrow: "THE PROCESS"
Heading: "From Vision to Reality — In Four Moves"
Layout: Horizontal 4-step flow connected by gradient lines

Step 1 — Discover: We learn your problem inside-out
Step 2 — Architect: We design the precise solution
Step 3 — Build: We engineer it with elite precision
Step 4 — Deploy: We deliver and stand behind it

Connector: thin gradient line with animated traveling dot between steps
Each step: numbered (01–04) in --accent-cyan mono font, title, description
```

#### Why Amenyx Vortex
```
Eyebrow: "WHY US"
Heading: "Not Just a Vendor. Your Technical Co-Founder."
Layout: 2-column — left: large statement text + quote, right: 4 stat blocks

Stats:
  - "100%" — End-to-End Ownership
  - "AI-First" — Every Solution
  - "2 Senior Leads" — On Every Project
  - "0 Gaps" — In Delivery

Below stats: A glowing horizontal rule + pull quote:
  "When a client comes to Amenyx Vortex, the problem ends here."
```

#### Technology Stack / Capabilities Strip
```
Eyebrow: "BUILT WITH"
Heading: "Enterprise-Grade Technology Stack"
Layout: Horizontal scrolling marquee strip (infinite loop)
Content: Tech logos/labels — Python · TensorFlow · React · Node.js · AWS · 
         Docker · PostgreSQL · Kubernetes · FastAPI · Next.js · Flutter
Style: Glass pill tags, --accent-cyan glow on hover, muted at rest
```

#### Testimonials
```
Eyebrow: "CLIENT VOICES"
Heading: "Results Speak Louder"
Layout: 3-column glass card grid

Each card:
  - Star rating (5 stars, --accent-gold)
  - Quote text (italic, Body)
  - Client name + role (Label)
  - Company tag (muted pill)
  - Left border: 2px gradient line
```

#### Final CTA Section
```
Background: full-width gradient panel (--gradient-glow)
Content centered:
  - Heading: "Ready to Build What's Next?"
  - Sub: "Let's solve your hardest problems together."
  - CTA: [Start a Project] (white button, dark text) + [Schedule a Call] (ghost white)
  - Subtle vortex watermark behind text (very low opacity)
```

#### Footer
```
Background: --bg-void
Layout: 4-column grid

Col 1: Logo + tagline + "Where Problems End." + social icons (LinkedIn, GitHub, Twitter)
Col 2: Services links
Col 3: Company links (About, Work, Blog, Careers)
Col 4: Contact (email, location, quick form link)

Bottom bar: Copyright · Privacy · Terms · Gradient top divider
```

---

### PAGE 2 — SERVICES (DETAIL)

```
Hero: Page-specific hero with service name, icon, and 2-line description
      Background: abstract tech mesh or circuit-trace SVG, dark
      
Sections per service:
  - "What We Deliver" — bullet breakdown (icon + text)
  - "How We Approach It" — 3-step mini-process
  - "Technologies We Use" — icon grid of tools
  - "Case Study Teaser" — glass card with project name + outcome stat
  - CTA: "Start This Project →"
  
Layout alternates: left-image/right-text, right-image/left-text per section
```

---

### PAGE 3 — WORK / PORTFOLIO

```
Hero: "Our Work. Our Proof."
Layout: Masonry/bento grid of project cards

Project Card:
  - Full bleed image/visual (dark, glowy)
  - Hover: gradient overlay slides up from bottom, revealing:
    Project name · Category tag · "View Case Study →" link
  - Border: 1px --border-subtle, radius 16px

Filter Bar: [All · AI · Web · Mobile · Enterprise · Government]
  - Active filter: gradient pill background
  
Case Study Page (per project):
  - Hero: project name + client sector + outcome headline
  - Sections: Challenge · Approach · Solution · Result
  - Stats row: 3 big impact numbers with labels
  - Tech stack used
  - Next project navigation
```

---

### PAGE 4 — ABOUT

```
Hero: "Two Founders. One Mission. Zero Compromise."
Background: split portrait-style, abstract behind text

Sections:
  1. The Story — how Amenyx Vortex was founded, the M+M origin
  2. The Team — 2 founder cards (photo, name, role, short bio, LinkedIn)
  3. Our Values — 4 cards: Precision · Ownership · Intelligence · Delivery
  4. Vision Statement — large pull-quote with gradient text
  5. CTA: "Work With Us"
```

---

### PAGE 4B — FOUNDER'S NOTE (Embedded within About Page — Dedicated Full Section)

```
PLACEMENT: After "Our Values" section, before the final CTA on the About page.
           Also render a condensed version as a glass pull-quote card on the
           Landing Page between Testimonials and the Final CTA section.

SECTION TITLE (eyebrow label):
  "A NOTE FROM THE FOUNDERS"

LAYOUT: Full-width dark glass panel — wider than the standard content column,
        edge-to-edge with subtle cyan border glow. Almost like an open letter.
        Background: radial glow behind the text, very soft, centered.

VISUAL TREATMENT:
  - Left side: thin vertical gradient line (cyan → transparent) — like a
    handwritten letter margin rule
  - Quotation mark: oversized, stylized " — in --accent-cyan, opacity 0.15,
    positioned top-left behind the text (decorative, not readable)
  - Text: Body-L size, --text-primary, line-height 34px, slightly warmer feel
    than the clinical tech copy elsewhere — this is human, not corporate
  - Paragraph spacing: generous — 24px between paragraphs

FOUNDER'S NOTE TEXT (template — customize names/details before launch):
  ———
  We didn't start Amenyx Vortex to build another software agency.

  We started it because we kept seeing the same problem: brilliant ideas stalling
  in the gap between vision and execution. Companies reaching for AI, digital
  transformation, enterprise-grade systems — and finding no single partner willing
  to own the entire problem from start to finish.

  We are that partner.

  Between the two of us, we bring the full stack of what it takes — not just
  technically, but strategically. Every project that comes through Amenyx Vortex
  gets senior attention from day one to delivery. No junior hand-offs. No scope
  creep hidden in fine print. No problem left half-solved.

  We built this company on one conviction:
  When a client walks through our door, the problem ends here.

  If that's the kind of partner you've been looking for — we're ready when you are.
  ———

SIGNATURE BLOCK (bottom of the note, right-aligned):
  Rendered as a stylized handwritten-style signature using:
    - Font: "Dancing Script" or "Pinyon Script" (Google Fonts) — elegant cursive
    - Size: 36px, weight 400, color: --accent-ice (#A8DEFF)
    - Letter-spacing: 2px for airiness
    - Text: "𝑀 & 𝑀" (or stylized as "M · M" with a centered dot)

  Below the signature (in Label style, mono font, muted):
    "Co-Founders, Amenyx Vortex"

  Below that, a thin 80px gradient line (cyan → transparent) as a closing rule.

  Optional: Add a faint vortex watermark behind the signature at 4% opacity.

CONDENSED LANDING PAGE VERSION:
  Pull the core quote only:
    "We built this company on one conviction:
     When a client walks through our door, the problem ends here."
  
  Render as a glass quote card:
    - Left border: 3px solid gradient (cyan → blue)
    - Quote in H3 italic, --text-primary
    - Attribution below: "— The Founders, Amenyx Vortex" in Label muted
    - Background: --bg-elevated + subtle gradient-surface tint
    - Positioned between Testimonials and Final CTA on the landing page

ANIMATION:
  - On scroll-reveal: the vertical margin line draws downward first (height 0→100%,
    300ms), then text fades in line by line (staggered 40ms per line)
  - Signature appears last with a subtle ink-draw effect:
    SVG path stroke-dashoffset animation from full-length → 0 (writing effect)
    Duration: 800ms, easing: ease-out
  - The M&M signature glows softly on hover (--glow-gold, subtle)
```

---

### PAGE 5 — CONTACT

```
Layout: 2-column split
Left (60%): 
  - Heading: "Let's Build Something."
  - Sub: response time / availability info
  - 3 contact cards: Email · LinkedIn · Schedule Call (Calendly link)
  - Location line: City, Country

Right (40%):
  - Glass form card:
    Fields: Name · Email · Company · Budget Range (select) · Message
    CTA: [Send Message →] (gradient primary button)
    Below: "We respond within 24 hours."

Below fold:
  - FAQ section: 5–6 common questions, accordion style
  - Map or location visual (optional)
```

---

### PAGE 6 — DASHBOARD (Client Portal)

```
Purpose: For clients to track their project status, milestones, deliverables

Navbar (top):
  - Logo left, search center, notifications + avatar right
  - Glass morphic, blur background

Sidebar (left, collapsible):
  - Width: 260px collapsed / 68px icon-only
  - Items: Overview · My Projects · AI Tools · Reports · Files · Settings
  - Active: gradient highlight pill, icon glows
  - Bottom: Avatar + name + logout

Main Content Area:
  Welcome card: "Good morning, [Name]. Here's your project status."
  
  Widget Grid (bento layout):
    - Project Progress (circular progress ring, %)
    - Milestone Timeline (horizontal steps, completed = cyan)
    - Recent Activity Feed (timestamped log)
    - Deliverables Due (list card with checkmarks)
    - Budget Overview (bar chart, --accent-cyan bars)
    - Team Contacts (avatar grid)

  All widgets: --bg-surface cards, --shadow-card, hover lift
  Charts: dark themed, cyan/blue accent colors only
```

---

### PAGE 7 — AUTH (Login / Signup)

```
Layout: Full-screen split

Left Panel (55%):
  - Background: --bg-depth + large vortex logo mark (animated, glowing)
  - Floating glass cards showing company stats/quotes
  - Tagline: "Where Problems End." — large, gradient text
  - Subtle animated particle/star field in background

Right Panel (45%):
  - Background: --bg-surface, clean
  - Card: white-ish elevated surface in dark context, radius 20px
  - Logo at top (small)
  - H2: "Welcome Back" / "Create Your Account"
  - Form: Email + Password + (Signup: Name + Company)
  - CTA: [Sign In →] / [Create Account →] — gradient primary
  - Secondary: Google OAuth ghost button
  - Footer link: "Don't have an account? Sign up"
  - Privacy note (muted, 12px)
```

---

## 06 — LOGO DESIGN PROMPT (For Image Generation)

> Use this prompt verbatim in your AI image generation tool (Midjourney, Stable Diffusion, DALL·E 3, Firefly, etc.)

---

**Primary Logo Prompt:**

```
Professional vector logo for a premium technology company called "Amenyx Vortex". 
The logo mark consists of three concentric, elegantly curved arc rings forming 
a vortex spiral — each arc slightly rotated, creating a sense of intelligent 
rotation and convergence toward a single luminous central point. The center 
point glows with a soft electric cyan light. The arcs are rendered in gradient 
strokes from electric cyan (#00C6FF) to deep anchor blue (#0072FF), against 
absolute black (#05060D) background. The wordmark reads "AMENYX" in a bold, 
geometric sans-serif (similar to Syne or Neue Haas Grotesk), with "VORTEX" 
beneath it in a lighter weight, widely letter-spaced. Below the wordmark, in 
smallest size, the tagline reads: "WHERE PROBLEMS END." in all-caps, tracked 
out wide, in muted electric blue. The total composition feels like it belongs 
to a global AI defense or elite software company — think Palantir meets SpaceX 
meets a top-tier AI lab. No gradients on text. No decorative borders. No drop 
shadows. Flat, precise, luminous. Vector-clean. Dark background only. 
Ultra-premium. --ar 3:2 --style raw --v 6
```

**Logo Mark Only (Icon) Prompt:**
```
Minimal vector icon — three concentric arc rings forming a clockwise vortex, 
converging to a glowing cyan dot at center. Electric cyan to deep blue gradient 
strokes, increasing in opacity toward center. Pure black background. 
Zero noise. Precision-engineered aesthetic. Suitable for favicon, app icon, 
embossed stamp. --ar 1:1 --style raw --v 6
```

**Logo on Light Background Variant:**
```
Same Amenyx Vortex logo concept adapted for white/light background. 
Arc rings in deep navy (#0D1F4E) to electric blue (#0072FF). 
Wordmark in near-black (#0F172A). Tagline in muted blue-grey. 
Same precision-engineered, zero-noise, vector-clean aesthetic. --ar 3:2
```

**M&M Founders Signature Mark (Separate Asset):**
```
Elegant handwritten signature mark for two co-founders whose names both begin 
with M. The signature reads stylized italic "M & M" or "𝑀 · 𝑀" — rendered as 
a single flowing cursive stroke, as if signed by a precise but creative hand. 
The ink color is soft electric ice blue (#A8DEFF) on pure black background. 
The signature has a slight luminous quality — as if written in light, not ink. 
Below the signature: a thin underline flourish (natural pen-lift curve). 
No drop shadow. No border. Pure calligraphic precision meets tech elegance. 
The energy is "architect's signature on a blueprint" — confident, minimal, final.
Use as a standalone asset for the Founder's Note section of the website.
--ar 2:1 --style raw --v 6
```

**Full Founder's Note Card Visual Prompt:**
```
Dark glassmorphic letter/note card for a premium tech company website. 
Background: near-black (#080B14) with a very soft centered radial glow in 
deep electric blue. Left edge: a single thin vertical gradient line from 
electric cyan to transparent (like a letter margin). The card contains 
elegant white italic serif body text (placeholder lorem ipsum). 
Bottom right: a luminous handwritten cursive signature "M & M" in ice blue 
with a soft gold glow, followed by the subtitle "Co-Founders, Amenyx Vortex" 
in small tracked-out mono text. Top-left: a giant decorative quotation mark 
in cyan at 8% opacity. The card border glows faintly cyan. 
Ultra-premium, editorial, confident. --ar 16:9 --style raw --v 6
```

---

## 07 — MOTION, INTERACTION & FUTURISTIC TECH LAYER

> This is what separates Amenyx Vortex from every other tech company website.
> Every scroll, every hover, every form interaction must feel like operating
> a piece of precision technology — not browsing a website.

---

### 07A — PAGE LOAD SEQUENCE
```
0ms      → Site loading screen: full black, vortex logo mark spins up from center,
            rings animate in one by one. Duration: 1800ms max, then dissolves.
           (Skip on return visits via localStorage flag)

Post-load stagger:
  100ms  → Navbar fades + slides down from -68px
  200ms  → Hero eyebrow label slides up + fades in
  400ms  → Hero headline: word-by-word clip reveal (overflow hidden, translateY per word)
  800ms  → Sub-headline fades in
  1000ms → CTA buttons slide up
  1100ms → Vortex logo mark begins slow ring rotation
  1300ms → Floating feature bubbles drift into orbit positions (spring easing)
  1600ms → Particle field activates (fade in over 400ms)
```

### 07B — SCROLL EXPERIENCE (The Core Futuristic Layer)
```
GLOBAL SCROLL BEHAVIOR:
  - Smooth scroll: scroll-behavior: smooth, with JS override for precision
  - Scroll progress bar: 2px gradient line (cyan → blue) at very top of viewport,
    fills left→right as user scrolls page. Position: fixed, z-index 9999.

SECTION REVEAL SYSTEM (IntersectionObserver, threshold 0.15):
  Each section animates in when it enters viewport:
  - Fade + translateY(40px → 0), duration 600ms, easing: cubic-bezier(0.16,1,0.3,1)
  - Cards stagger: 80ms delay per child card
  - Text lines stagger: 30ms delay per line (split by <span> wrapping each line)
  - Stats counter: count-up from 0 to value over 1200ms when visible
  - Process steps: reveal left→right, 120ms stagger per step

PARALLAX LAYERS:
  - Hero background glow: moves at 0.2× scroll speed (subtle depth)
  - Vortex logo mark: moves at 0.15× scroll speed (floats against scroll)
  - Floating bubbles: each moves at slightly different parallax rate (0.1–0.3×)
    creating genuine sense of 3D depth
  - Section background grid lines: move at 0.05× (almost imperceptible, but felt)

HORIZONTAL SCROLL SECTIONS:
  - Technology Stack strip: auto-scrolling marquee (infinite CSS animation)
    Pauses on hover. Speed: 40s per full cycle.
  - On Portfolio/Work page: horizontal scroll bento grid (mouse-drag or scroll-x)

SCROLL-TRIGGERED DATA VISUALIZATION:
  - When stats section enters view, numbers animate up with slight overshoot
    (spring: goes to 105% value, snaps back to 100%)
  - Circular progress rings on Dashboard: stroke-dashoffset animates from
    full circumference → target value when scrolled into view

SECTION TRANSITION BORDERS:
  Between major sections, a gradient glow divider appears:
  - 1px height, background: linear-gradient(90deg, transparent, #00C6FF, transparent)
  - Below it: a blurred twin (filter: blur(4px), opacity: 0.4) for ambient glow
  - These dividers themselves animate in (width: 0% → 100%) as section enters view
```

### 07C — CURSOR SYSTEM (Desktop Only)
```
Custom cursor replaces default pointer entirely:

RESTING STATE:
  - Small dot: 8px circle, --accent-cyan fill, no border
  - Outer ring: 32px circle, transparent fill, 1px solid rgba(0,198,255,0.4)
  - Outer ring follows cursor with 120ms lag (lerp smoothing) — feels magnetic
  - Both elements: pointer-events: none, position: fixed, z-index: 99999

ON BUTTON HOVER:
  - Dot disappears
  - Outer ring expands to 52px + fills with rgba(0,198,255,0.1)
  - Border becomes gradient (cyan → blue)
  - Ring rotation animation begins: rotate 1 full turn per 2 seconds

ON CARD HOVER:
  - Dot stays, pulses (scale 1 → 1.5 → 1, 800ms loop)
  - Ring shrinks to 20px, border-color shifts to --accent-ice

ON TEXT/LINK HOVER:
  - Dot disappears
  - Ring collapses to a thin underline-style bar (40px × 2px)
  - Positioned under the hovered text word

ON FOUNDER'S NOTE / SIGNATURE:
  - Cursor ring glows gold (--glow-gold) while hovering over the M&M signature
  - Ring becomes slightly larger (60px)

MOBILE: Cursor system fully disabled. Touch ripple instead (see below).
```

### 07D — TOUCH & MOBILE INTERACTIONS
```
Tap Ripple:
  - On any button tap: radial gradient ripple expands from tap point
  - Color: rgba(0,198,255,0.25), radius: 0 → 120px, opacity: 0.6 → 0, 400ms

Swipe:
  - Testimonials: swipe left/right to cycle cards
  - Portfolio grid: horizontal swipe to browse

Pull-to-refresh: (if web app / dashboard)
  - Vortex spinner appears, rotates during pull, triggers on release at threshold
```

### 07E — AMBIENT BACKGROUND SYSTEM
```
HERO SECTION:
  Canvas-based or pure CSS ambient field:
  - 25–35 floating particles, size: 1–3px, color: #00C6FF
  - Each moves on independent sin/cos path — organic drift, never linear
  - Opacity: 0.12–0.35 each, randomized
  - No connection lines (too dated/cliché) — just pure ambient field
  - Subtle radial bloom behind vortex mark: radial-gradient, cyan, very low opacity

ABOUT PAGE (Founder's Note section):
  - Warmer ambient: replace cyan particles with --accent-gold at 0.08 opacity
  - Much slower drift — contemplative, not electric
  - A single very faint horizontal scan line moves downward every 8 seconds
    (mimicking a CRT/data-scan aesthetic — nod to tech without being retro)

CONTACT PAGE:
  - Animated circuit-trace SVG pattern in background (very low opacity, 0.04)
  - Lines draw themselves: stroke-dashoffset animation, staggered
  - Gives the impression the page is a live system being initialized

DASHBOARD:
  - Subtle animated grid: CSS background-image with small dots, moves 1px/s upward
    (creates gentle data-flow sense without distraction)
  - Right edge: thin animated data stream column (falling random hex characters,
    Matrix-inspired but very muted — opacity 0.04, --text-muted color)
```

### 07F — FORM INTERACTIONS (Contact Page & Auth)
```
Input Focus Sequence:
  1. Border transitions to --accent-cyan (200ms)
  2. Outer glow ring appears: 0 0 0 3px rgba(0,198,255,0.12)
  3. Label above animates: floats up + scales to 90% (if floating label pattern)
  4. A thin animated line sweeps across the input bottom border left→right (200ms)

Typing Feedback:
  - Character counter (for textarea): appears bottom-right of field on first keypress
    Counts up in mono font, --text-muted
  - At 80% capacity: counter color shifts to --warning
  - At limit: counter pulses red, input border flashes --danger once

Form Validation:
  - Real-time (on blur): 
    Valid: border → --success green, checkmark icon fades in right side
    Invalid: border → --danger red, error message slides down (translateY -8px → 0)
  - Submit button: shows loading spinner (vortex-shaped, 20px) while processing
    On success: button transforms → checkmark + "Message Sent" text
    On error: button shakes (keyframe: translateX ±6px, 3 cycles)

Send Button Special Effect:
  On click (after validation passes):
  - Ripple from button center
  - Button background gradient animates: rotates hue 30deg
  - Small particle burst from button edges (4–6 particles fly outward, fade)
  - Then loading state begins
```

### 07G — PAGE TRANSITIONS
```
Between pages (if SPA / with router):
  Exit: current page fades out + slight scale(0.98), 200ms
  Enter: vortex spinner appears center-screen for 300ms
  New page: fades in + scale(1.02 → 1.0), 400ms

Direct navigation (hard links):
  - Add data-transition attribute to all <a> tags
  - JS intercepts click, plays exit animation, then navigates
  - On new page load, entrance animation auto-triggers

Scroll-to-section (same page):
  - Offset for sticky navbar (68px)
  - Section briefly highlights: background flashes from transparent →
    rgba(0,198,255,0.03) → transparent over 600ms
```

### 07H — EASTER EGGS & DELIGHT MOMENTS
```
Konami Code (↑↑↓↓←→←→BA):
  - Triggers: vortex logo on screen explodes into particles, 
    reassembles with a gold glow for 3 seconds, then returns to normal
  - A hidden message appears: "You found it. So did we." in mono font, center screen

Logo Click (navbar):
  - Single click: navigates home (standard)
  - Triple-click: logo spins 2× fast, then a tooltip appears:
    "Built by M & M. Two minds. One mission."
    Tooltip style: glass card, appears below logo, auto-dismisses in 3s

Footer Copyright Hover:
  - Hovering "Amenyx Vortex" in footer makes the M&M signature appear briefly
    as a tooltip — glowing gold, cursive, signature style

404 Page:
  - Full-screen: vortex mark spins, rings expanding outward
  - Text: "404 — This problem doesn't exist in our system."
  - Sub: "Let us route you back." + [Return Home] button
  - Background: --bg-void with slow particle field
```

---

## 08 — RESPONSIVE BREAKPOINTS

```
Desktop:     1280px+ (full layout as designed)
Laptop:      1024px  (slight padding reduction, sidebar collapses)
Tablet:      768px   (2-column grids become 1, nav collapses to hamburger)
Mobile:      375px   (single column, all sections stack, full-width buttons)

Mobile priority notes:
  - Hero: stack vertically, vortex mark above headline
  - Navbar: logo left + hamburger right
  - Cards: full width, no hover lift (touch)
  - Forms: full width inputs
  - Footer: 2-column → 1-column stack
```

---

## 09 — BUILD ORDER

```
Phase 1 — Foundation
  [ ] Design token CSS variables (colors, type, spacing, shadows, gradients)
  [ ] Google Fonts import: Syne + DM Sans + JetBrains Mono
  [ ] Global reset + base typography
  [ ] Grid system (12-col CSS Grid)
  [ ] Animation utility classes

Phase 2 — Core Components
  [ ] Navbar (sticky glass, mobile hamburger)
  [ ] Button variants (primary, ghost, icon)
  [ ] Card variants (standard, glass, feature)
  [ ] Form elements (input, textarea, select)
  [ ] Glass panels
  [ ] Section wrapper (with padding + max-width)
  [ ] Dividers (gradient glow)
  [ ] Tag/badge components

Phase 3 — Landing Page (Section by Section)
  [ ] Hero section (animated vortex, floating bubbles)
  [ ] Services grid
  [ ] Process flow
  [ ] Why Us / stats
  [ ] Tech stack strip (marquee)
  [ ] Testimonials
  [ ] Final CTA
  [ ] Footer

Phase 4 — Inner Pages
  [ ] Services detail page
  [ ] Work / Portfolio page
  [ ] About page
  [ ] Contact page

Phase 5 — App Pages
  [ ] Dashboard layout (sidebar + navbar + content)
  [ ] Dashboard widgets (all 6)
  [ ] Auth pages (login + signup)

Phase 6 — Polish
  [ ] Scroll reveal animations (IntersectionObserver)
  [ ] Custom cursor
  [ ] Particle field
  [ ] Page transition (fade or slide)
  [ ] Ambient background systems (per page)

Phase 7 — Responsive Pass
  [ ] Tablet breakpoint
  [ ] Mobile breakpoint
  [ ] Touch interaction adjustments

Phase 8 — Final Audit
  [ ] Consistent shadow/glow usage
  [ ] Typography hierarchy check
  [ ] Color contrast (WCAG AA minimum)
  [ ] Performance: lazy-load images, optimize animations
  [ ] Cross-browser test (Chrome, Safari, Firefox, Edge)
```

---

## 10 — QUALITY STANDARD

> Every page, every section, every component must pass this test:

- Does it feel like a **$500K/year AI company** built this website?
- Would a **government procurement officer** trust this brand on first visit?
- Would a **Series A startup founder** feel confident hiring from this website?
- Is there a single pixel that feels **accidental or generic**?
- Does scrolling feel like **operating a precision instrument** — not browsing?
- Does every animation serve the **story of capability** — not just fill space?
- Does the Founder's Note make a visitor feel they are dealing with **real people** behind the power?
- Does the M&M signature make someone want to **know who these two are**?

If any answer is no — refine until it is.

---

## 11 — FOUNDER'S NOTE COMPONENT SPEC (For Developer Reference)

```html
<!-- FOUNDER'S NOTE — Reusable Component -->
<!-- Fonts required: Dancing Script (signature), Syne (headings), DM Sans (body) -->

<section class="founders-note-section">
  
  <!-- Eyebrow -->
  <span class="label-eyebrow">A NOTE FROM THE FOUNDERS</span>

  <!-- Glass Panel -->
  <div class="founders-note-card">
    
    <!-- Decorative quote mark (CSS pseudo or SVG) -->
    <span class="deco-quote" aria-hidden="true">"</span>
    
    <!-- Left margin rule (CSS ::before on card) -->
    
    <!-- Body text — animate line by line on scroll reveal -->
    <div class="note-body">
      <p>We didn't start Amenyx Vortex to build another software agency.</p>
      <p>We started it because we kept seeing the same problem: brilliant ideas 
         stalling in the gap between vision and execution...</p>
      <p>We are that partner.</p>
      <p>Between the two of us, we bring the full stack of what it takes — not 
         just technically, but strategically. Every project gets senior attention 
         from day one to delivery. No junior hand-offs. No scope creep. 
         No problem left half-solved.</p>
      <p>We built this company on one conviction:<br>
         <em>When a client walks through our door, the problem ends here.</em></p>
      <p>If that's the kind of partner you've been looking for — 
         we're ready when you are.</p>
    </div>

    <!-- Signature Block -->
    <div class="signature-block">
      
      <!-- SVG Signature (path-draw animation on reveal) -->
      <svg class="mm-signature" viewBox="0 0 240 80" aria-label="M and M, Co-Founders">
        <!-- Path drawn programmatically or by hand in Figma/Illustrator -->
        <!-- Stroke color: #A8DEFF, stroke-width: 2, fill: none -->
        <!-- stroke-dasharray + stroke-dashoffset animation: draws on reveal -->
        <path class="sig-path" 
              d="M 20 60 C 25 20, 35 20, 40 60 C 45 20, 55 20, 60 60
                 M 90 40 L 90 60
                 M 120 60 C 125 20, 135 20, 140 60 C 145 20, 155 20, 160 60"
              stroke="#A8DEFF" stroke-width="2" fill="none" 
              stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      
      <!-- Fallback / alternate: CSS font signature -->
      <span class="signature-text" aria-hidden="true">𝑀 &amp; 𝑀</span>
      
      <!-- Closing rule -->
      <div class="sig-rule"></div>
      
      <!-- Attribution -->
      <p class="sig-attribution">Co-Founders, Amenyx Vortex</p>
      
    </div>

  </div>

</section>

<style>
/* Key styles — integrate into main stylesheet */

.founders-note-card {
  position: relative;
  background: rgba(13, 17, 32, 0.80);
  backdrop-filter: blur(32px) saturate(180%);
  border: 1px solid rgba(0, 198, 255, 0.15);
  border-radius: 20px;
  padding: 56px 64px 48px;
  max-width: 900px;
  margin: 0 auto;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.05) inset,
              0 20px 60px rgba(0,0,0,0.6);
}

/* Left margin rule */
.founders-note-card::before {
  content: '';
  position: absolute;
  left: 0; top: 48px; bottom: 48px;
  width: 3px;
  background: linear-gradient(180deg, #00C6FF, transparent);
  border-radius: 0 0 0 20px;
}

.deco-quote {
  position: absolute;
  top: 24px; left: 32px;
  font-size: 160px;
  line-height: 1;
  color: #00C6FF;
  opacity: 0.06;
  font-family: 'Georgia', serif;
  pointer-events: none;
  user-select: none;
}

.note-body p {
  font-family: 'DM Sans', sans-serif;
  font-size: 18px;
  line-height: 34px;
  color: #F0F4FF;
  margin-bottom: 20px;
}

.note-body p em {
  color: #A8DEFF;
  font-style: italic;
}

.signature-block {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.signature-text {
  font-family: 'Dancing Script', cursive;
  font-size: 42px;
  color: #A8DEFF;
  letter-spacing: 4px;
  line-height: 1;
  transition: text-shadow 300ms ease;
}

.signature-text:hover {
  text-shadow: 0 0 20px rgba(240,192,96,0.4), 0 0 40px rgba(240,192,96,0.15);
  color: #F0C060;
}

.sig-rule {
  width: 80px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #00C6FF);
  margin-top: 4px;
}

.sig-attribution {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.2em;
  color: #4A5670;
  text-transform: uppercase;
  margin: 0;
}

/* SVG signature path animation */
.sig-path {
  stroke-dasharray: 600;
  stroke-dashoffset: 600;
  transition: stroke-dashoffset 1000ms ease-out;
}

.founders-note-card.revealed .sig-path {
  stroke-dashoffset: 0;
}

/* Scroll reveal — add .revealed class via IntersectionObserver */
.note-body p {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 500ms ease, transform 500ms ease;
}

.founders-note-card.revealed .note-body p:nth-child(1) { opacity:1; transform:none; transition-delay: 100ms; }
.founders-note-card.revealed .note-body p:nth-child(2) { opacity:1; transform:none; transition-delay: 200ms; }
.founders-note-card.revealed .note-body p:nth-child(3) { opacity:1; transform:none; transition-delay: 320ms; }
.founders-note-card.revealed .note-body p:nth-child(4) { opacity:1; transform:none; transition-delay: 440ms; }
.founders-note-card.revealed .note-body p:nth-child(5) { opacity:1; transform:none; transition-delay: 560ms; }
.founders-note-card.revealed .note-body p:nth-child(6) { opacity:1; transform:none; transition-delay: 680ms; }

.founders-note-card.revealed .signature-block {
  animation: signatureReveal 600ms 900ms ease-out both;
}

@keyframes signatureReveal {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .note-body p, .sig-path, .signature-block { transition: none; animation: none; opacity: 1; transform: none; stroke-dashoffset: 0; }
}
</style>
```

---

*Amenyx Vortex — Where Problems End.*

```
                    ╔══════════════════════════════╗
                    ║                              ║
                    ║          𝑀  &  𝑀             ║
                    ║   Co-Founders, Amenyx Vortex ║
                    ║                              ║
                    ╚══════════════════════════════╝
```
