import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Hammer, Wrench, Search, Settings, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: '01',
    title: 'Roof Installation',
    description:
      'High-quality materials and expert craftsmanship for new roof installations. We handle everything from asphalt shingles to metal roofing.',
    image: '/images/service-1.jpg',
    icon: Hammer,
  },
  {
    id: '02',
    title: 'Roof Repair',
    description:
      'Quick and reliable fixes for leaks, cracks, and storm damage. Our emergency repair team is available 24/7.',
    image: '/images/service-2.jpg',
    icon: Wrench,
  },
  {
    id: '03',
    title: 'Roof Inspection',
    description:
      'Thorough assessments to ensure your roofs longevity. We identify potential issues before they become costly problems.',
    image: '/images/service-3.jpg',
    icon: Search,
  },
  {
    id: '04',
    title: 'Roof Maintenance',
    description:
      'Regular upkeep to prevent costly future repairs. Our maintenance programs extend the life of your roof.',
    image: '/images/service-4.jpg',
    icon: Settings,
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const track = trackRef.current;
    if (!section || !container || !track) return;

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

      // Calculate scroll distance
      const scrollWidth = track.scrollWidth - window.innerWidth;

      // Horizontal scroll animation
      gsap.to(track, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${scrollWidth * 1.5}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Card expansion on scroll
      const cards = track.querySelectorAll('.service-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.95, opacity: 0.7 },
          {
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: gsap.getById('horizontal') as gsap.core.Animation,
              start: 'left 80%',
              end: 'left 20%',
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full overflow-hidden bg-black"
    >
      {/* Section Header */}
      <div ref={headerRef} className="relative z-10 px-4 pb-12 pt-24 sm:px-6 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-border bg-black-800/50 px-4 py-2">
              <Settings className="h-4 w-4 text-red-accent" />
              <span className="text-xs font-medium uppercase tracking-widest text-gray-text">
                Our Services
              </span>
            </div>
            <h2 className="max-w-3xl text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Comprehensive{' '}
              <span className="text-red-accent">Roofing Solutions</span>
            </h2>
            <p className="max-w-xl text-base text-gray-text">
              From installation to maintenance, we provide end-to-end roofing
              services tailored to your specific needs.
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={containerRef} className="relative h-screen">
        <div
          ref={trackRef}
          className="horizontal-scroll-track absolute left-0 top-0 flex h-full items-center gap-8 px-4 sm:px-6 lg:px-8 xl:px-12"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                className="service-card group relative h-[70vh] w-[80vw] flex-shrink-0 overflow-hidden rounded-xl sm:w-[60vw] lg:w-[40vw]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col justify-end p-8">
                  {/* Service Number */}
                  <span className="absolute right-6 top-6 text-7xl font-black text-white/10">
                    {service.id}
                  </span>

                  {/* Icon */}
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-red-accent/20 backdrop-blur-sm transition-all group-hover:bg-red-accent">
                    <Icon className="h-7 w-7 text-red-accent transition-colors group-hover:text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-2xl font-bold uppercase tracking-tight text-white transition-transform duration-300 group-hover:translate-x-2 sm:text-3xl">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-6 max-w-md text-sm leading-relaxed text-gray-text transition-all duration-300 group-hover:text-white/80">
                    {service.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-red-accent transition-all duration-300 group-hover:gap-4">
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Red Sheen Effect */}
                <div className="red-sheen absolute inset-0 pointer-events-none" />
              </motion.div>
            );
          })}

          {/* End Card - CTA */}
          <div className="flex h-[70vh] w-[50vw] flex-shrink-0 items-center justify-center rounded-xl border border-gray-border bg-black-800/50 p-8 backdrop-blur-sm sm:w-[40vw] lg:w-[30vw]">
            <div className="text-center">
              <h3 className="mb-4 text-2xl font-bold text-white">
                Need a Custom Solution?
              </h3>
              <p className="mb-6 text-sm text-gray-text">
                Contact us for a free consultation and personalized quote.
              </p>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="magnetic-btn inline-flex items-center gap-2 rounded-none bg-red-accent px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-red-600"
              >
                Get a Quote
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
