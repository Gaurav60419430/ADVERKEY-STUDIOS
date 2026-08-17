# ADVERKEY

> **Create. Back. Build.**

The official website for **Adverkey Studio** — an independent company exploring the intersection of publishing, entrepreneurship, investment, and technology.

The website is designed as an immersive digital experience rather than a conventional corporate website.

---

## About

Adverkey is built around three ideas:

### CREATE

We create and publish children's books end-to-end — from the initial idea and writing through creative development, production, and publishing.

### BACK

We believe in ambitious founders and ideas worth building.

Adverkey is developing an investment practice focused on backing startups across industries.

### BUILD

We are exploring technology and machine learning as tools for solving meaningful problems and building new products, systems, and experiences.

---

## Website Philosophy

This website was intentionally designed to avoid the visual language of generic AI-generated websites.

The goal is to create something that feels:

* Independent
* Editorial
* Sophisticated
* Human
* Interactive
* Experimental
* Minimal
* Forward-looking

The experience combines the visual language of an editorial publication with the confidence of a modern technology and investment company.

The website should feel like a **real brand**, not a collection of pre-built UI components.

---

## The Experience

The website is organized around three central ideas:

```text
CREATE
   ↓
Ideas
   ↓
BACK
   ↓
People & Companies
   ↓
BUILD
   ↓
Technology
```

These are not intended to be three disconnected business units.

They represent a larger philosophy:

> **Ideas deserve more than one way forward.**

The website uses typography, movement, composition, and interaction to connect these ideas.

---

## Design Direction

### Visual Language

The visual system is intentionally restrained.

Key characteristics include:

* Large editorial typography
* Strong black-and-off-white contrast
* Warm accent color
* Minimal interface chrome
* Large-scale compositions
* Asymmetric layouts
* Generous whitespace
* Fine borders and rules
* Subtle motion
* Carefully controlled transitions

The design avoids excessive decoration and lets typography, imagery, and interaction carry the experience.

---

## Interaction Principles

Interaction is a core part of the website.

However, animation is not used simply for visual effect.

Every interaction should have a purpose.

Examples include:

* Scroll-based storytelling
* Section transitions
* Hover states
* Image reveals
* Typography movement
* Navigation transitions
* Interactive publishing experiences
* Responsive visual elements
* Micro-interactions
* Page transitions

The interaction language should feel:

**Subtle → Physical → Intentional → Memorable**

---

## Content Structure

The website is built around the following primary areas:

### Home

The main brand experience introducing:

* CREATE
* BACK
* BUILD
* Company philosophy
* Core visual identity

### Create

Focused on the company's publishing activity.

Includes the development and publishing of children's books from idea to finished publication.

### Back

Introduces the company's investment direction and philosophy around startups and founders.

The website does not make unsupported claims about portfolio companies, investment performance, or scale.

### Build

Introduces the company's technology and machine-learning direction.

The technology practice is presented honestly without fabricating clients, projects, results, or case studies.

### About

Explains the company's philosophy, direction, and the relationship between CREATE, BACK, and BUILD.

### Contact

Provides a direct way for people to start a conversation with the company.

---

## Design Principles

### 01 — No AI Slop

Avoid generic patterns such as:

* Purple AI gradients
* Glassmorphism everywhere
* Floating blobs
* Random 3D objects
* Particle backgrounds
* Generic AI illustrations
* Excessive rounded cards
* Template-like dashboards
* Fake statistics
* Fake testimonials
* Fake clients
* Fake portfolio companies
* Generic corporate buzzwords

### 02 — Content Before Decoration

Visual effects should support the content.

### 03 — Motion With Purpose

Animation should help communicate hierarchy, transition, or interaction.

### 04 — Strong Typography

Typography is one of the primary visual elements of the brand.

### 05 — Real Information

The website should never invent company achievements, clients, investments, statistics, or other claims.

### 06 — Responsive By Design

The experience should be deliberately designed for desktop, tablet, and mobile rather than simply scaled down.

---

## Architecture

The project should maintain a component-based architecture.

Core areas include:

```text
Navigation
├── Header
├── Menu
└── Page transitions

Layout
├── Container
├── Section
├── Grid
└── Responsive layout

Typography
├── Display
├── Heading
├── Body
└── Metadata

Interaction
├── Reveal
├── Image reveal
├── Hover interaction
├── Scroll interaction
└── Transition

Content
├── Books
├── Publishing
├── Investment
└── Technology

Global
├── Footer
├── Contact
└── Accessibility
```

Components should remain reusable and maintainable.

Avoid large monolithic page components.

---

## Responsive Experience

The website supports:

* Desktop
* Laptop
* Tablet
* Mobile

Desktop interactions should not simply be compressed onto mobile.

Where an interaction depends on hover or mouse movement, an appropriate touch alternative should be provided.

Complex animations should be reduced or simplified on smaller devices where necessary.

---

## Accessibility

Accessibility is part of the design rather than an afterthought.

The website should support:

* Semantic HTML
* Keyboard navigation
* Visible focus states
* Accessible forms
* Appropriate ARIA usage
* Correct heading hierarchy
* Sufficient color contrast
* Alternative text for meaningful images
* Reduced-motion preferences

The website respects:

```text
prefers-reduced-motion
```

When reduced motion is enabled, unnecessary animation should be removed while maintaining the same information architecture and usability.

---

## Performance

The visual quality of the website should never come at the expense of performance.

Important considerations include:

* Optimized images
* Lazy loading
* Efficient fonts
* Minimal JavaScript
* Code splitting where appropriate
* Avoiding unnecessary dependencies
* Efficient animation
* Responsive image sizes
* Fast initial page load

Heavy visual effects should only be introduced when their value justifies their performance cost.

---

## Development Principles

When extending this project:

1. Preserve the existing visual language.
2. Do not introduce generic UI patterns without a reason.
3. Avoid unnecessary dependencies.
4. Reuse existing components.
5. Keep animations consistent.
6. Maintain responsive behavior.
7. Maintain accessibility.
8. Never fabricate company information.
9. Test interactions on both mouse and touch devices.
10. Test reduced-motion behavior.
11. Optimize new images and media.
12. Keep the codebase understandable.

---

## Future Direction

The website is designed to grow with the company.

Future possibilities include:

### Publishing

* Book catalog
* Individual book experiences
* Authors
* Editorial content
* Publishing announcements

### Investment

* Investment thesis
* Portfolio
* Founder resources
* Startup stories
* Investment insights

### Technology

* ML capabilities
* Technology projects
* Research
* Experiments
* Case studies

These should be added only when real company content becomes available.

---

## Brand Statement

The website currently centers around a simple idea:

# CREATE. BACK. BUILD.

Create things worth putting into the world.

Back people worth believing in.

Build technology worth using.

---

## Project Status

**Status:** Active development

The website is currently being developed as the digital foundation for Adverkey's growing publishing, investment, and technology activities.

---

## Development

### Requirements

Before running the project, install the dependencies specified by the project's package configuration.

### Installation

```bash
git clone <repository-url>

cd <project-directory>

npm install
```

### Development

```bash
npm run dev
```

Open the local development URL shown by the framework.

### Production Build

```bash
npm run build
```

### Production Preview

```bash
npm run start
```

> Update the commands above if the repository uses a package manager or framework with different commands.

---

## Environment Variables

If the project requires environment variables, create a local environment file based on the variables used by the application.

Never commit:

```text
.env
.env.local
.env.production
```

or any file containing private credentials, API keys, tokens, or secrets.

---

## Repository Structure

A typical structure should remain organized around:

```text
src/
├── components/
├── sections/
├── pages/
├── data/
├── styles/
├── lib/
└── assets/

public/
├── images/
├── fonts/
└── icons/
```

The exact structure should follow the existing framework and repository architecture.

---

## Contributing

When making changes:

* Keep the design system consistent.
* Prefer reusable components.
* Avoid unnecessary visual complexity.
* Test desktop and mobile.
* Check accessibility.
* Check reduced-motion behavior.
* Check performance.
* Do not introduce fabricated content.
* Review animations before shipping.

---

## License

Copyright © Adverkey.

All rights reserved.

Unless explicitly stated otherwise, the website design, branding, content, imagery, illustrations, and source code are proprietary to Adverkey.
