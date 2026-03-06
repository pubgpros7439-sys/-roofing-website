import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ExternalLink, Home, Building } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Residential Roofing',
    description: 'A complete roof replacement for a modern family home.',
    image: '/images/project-1.jpg',
    category: 'Residential',
    icon: Home,
  },
  {
    id: 2,
    title: 'Commercial Flat Roof',
    description: 'Durable TPO roofing for a large office building.',
    image: '/images/project-2.jpg',
    category: 'Commercial',
    icon: Building,
  },
  {
    id: 3,
    title: 'Roof Repair Project',
    description: 'Fixing storm damage with precision and care.',
    image: '/images/project-3.jpg',
    category: 'Repair',
    icon: Home,
  },
  {
    id: 4,
    title: 'New Roof Installation',
    description: 'A brand-new roof for a custom-built house.',
    image: '/images/project-4.jpg',
    category: 'Residential',
    icon: Home,
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Left column - scrolls up faster
      gsap.fromTo(
        leftColumnRef.current,
        { y: 100 },
        {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Right column - scrolls down (opposite direction)
      gsap.fromTo(
        rightColumnRef.current,
        { y: -100 },
        {
          y: 100,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const leftProjects = projects.filter((_, i) => i % 2 === 0);
  const rightProjects = projects.filter((_, i) => i % 2 === 1);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full overflow-hidden bg-black py-24 lg:py-32"
    >
      {/* Living Grid */}
      <div className="living-grid absolute inset-0 opacity-30" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 flex flex-col items-start gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-border bg-black-800/50 px-4 py-2">
            <ExternalLink className="h-4 w-4 text-red-accent" />
            <span className="text-xs font-medium uppercase tracking-widest text-gray-text">
              Our Projects
            </span>
          </div>
          <h2 className="max-w-3xl text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Showcasing Our <span className="text-red-accent">Best Work</span>
          </h2>
          <p className="max-w-xl text-base text-gray-text">
            Browse through our portfolio of completed roofing projects. Each
            project represents our commitment to quality and craftsmanship.
          </p>
        </div>

        {/* Projects Grid - Opposite Scroll */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Column */}
          <div ref={leftColumnRef} className="flex flex-col gap-8">
            {leftProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* Right Column - Offset */}
          <div ref={rightColumnRef} className="flex flex-col gap-8 md:mt-24">
            {rightProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index + 2} />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <button className="group inline-flex items-center gap-3 rounded-none border border-gray-border bg-transparent px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:border-red-accent hover:bg-red-accent/10">
            View All Projects
            <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = project.icon;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, card);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="group relative overflow-hidden rounded-xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Red Sheen Effect */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-accent/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {/* Category Badge */}
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-accent/20 px-3 py-1 backdrop-blur-sm">
          <Icon className="h-3 w-3 text-red-accent" />
          <span className="text-xs font-medium uppercase tracking-wider text-red-accent">
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-xl font-bold text-white transition-transform duration-300 group-hover:translate-x-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-text">{project.description}</p>

        {/* View Project Link */}
        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-red-accent opacity-0 transition-all duration-300 group-hover:opacity-100">
          <span>View Project</span>
          <ExternalLink className="h-4 w-4" />
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
