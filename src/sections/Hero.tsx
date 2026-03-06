import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Shield, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Badge animation
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.2
      );

      // Headline word split animation
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { opacity: 0, y: 100, rotateX: -90 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.08 },
          0.3
        );
      }

      // Subheadline
      tl.fromTo(
        subheadRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.8
      );

      // CTA buttons
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        1
      );

      // Main image 3D reveal
      tl.fromTo(
        imageRef.current,
        { opacity: 0, rotateY: 15, x: 100 },
        { opacity: 1, rotateY: 0, x: 0, duration: 1.4, ease: 'power3.out' },
        0.4
      );

      // Thumbnail slide in
      tl.fromTo(
        thumbnailRef.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 1 },
        0.8
      );

      // Scroll-based parallax for hero image
      gsap.to(imageRef.current, {
        y: 150,
        filter: 'blur(10px)',
        opacity: 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Headline fade out on scroll
      gsap.to(headlineRef.current, {
        y: -50,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '50% top',
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // 3D tilt effect for image
  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = imageRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateY = (mouseX / (rect.width / 2)) * 5;
    const rotateX = -(mouseY / (rect.height / 2)) * 5;

    gsap.to(element, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleImageMouseLeave = () => {
    gsap.to(imageRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      {/* Shader Background */}
      <div className="hero-shader absolute inset-0" />

      {/* Living Grid */}
      <div className="living-grid absolute inset-0 opacity-50" />

      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen w-full items-center">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid min-h-screen items-center gap-8 lg:grid-cols-2">
            {/* Left Content */}
            <div className="flex flex-col justify-center py-20 lg:py-0">
              {/* Badge */}
              <div
                ref={badgeRef}
                className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-gray-border bg-black-800/50 px-4 py-2 backdrop-blur-sm"
              >
                <Shield className="h-4 w-4 text-red-accent" />
                <span className="text-xs font-medium tracking-widest text-gray-text">
                  PROFESSIONAL ROOFING SERVICES
                </span>
              </div>

              {/* Headline */}
              <h1
                ref={headlineRef}
                className="mb-6 text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
                style={{ perspective: '1000px' }}
              >
                <span className="word inline-block">PROTECTING</span>{' '}
                <span className="word inline-block">YOUR</span>{' '}
                <span className="word inline-block text-red-accent">HOME</span>
                <br />
                <span className="word inline-block">WITH</span>{' '}
                <span className="word inline-block">QUALITY</span>{' '}
                <span className="word inline-block text-red-accent">ROOFING</span>
              </h1>

              {/* Subheadline */}
              <p
                ref={subheadRef}
                className="mb-8 max-w-lg text-base leading-relaxed text-gray-text sm:text-lg"
              >
                Expert roofing solutions for residential and commercial properties.
                Durable, reliable, and built to last with premium materials and
                craftsmanship.
              </p>

              {/* CTA Buttons */}
              <div ref={ctaRef} className="flex flex-wrap gap-4">
                <Button
                  onClick={scrollToContact}
                  className="magnetic-btn group relative h-14 overflow-hidden rounded-none bg-red-accent px-8 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-red-600"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get a Free Quote
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="h-14 rounded-none border-gray-border bg-transparent px-8 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:border-red-accent hover:bg-red-accent/10"
                >
                  View Our Work
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-gray-border pt-8">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-red-accent">
                    <Award className="h-5 w-5" />
                    <span className="text-2xl font-bold text-white">500+</span>
                  </div>
                  <span className="text-xs uppercase tracking-wider text-gray-text">
                    Projects Done
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-red-accent">
                    <Clock className="h-5 w-5" />
                    <span className="text-2xl font-bold text-white">25+</span>
                  </div>
                  <span className="text-xs uppercase tracking-wider text-gray-text">
                    Years Experience
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-red-accent">
                    <Shield className="h-5 w-5" />
                    <span className="text-2xl font-bold text-white">98%</span>
                  </div>
                  <span className="text-xs uppercase tracking-wider text-gray-text">
                    Satisfaction
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content - Images */}
            <div className="relative hidden h-full lg:block">
              <div className="relative h-full min-h-[600px]">
                {/* Main Image */}
                <div
                  ref={imageRef}
                  className="absolute right-0 top-1/2 w-[90%] -translate-y-1/2 overflow-hidden rounded-lg shadow-2xl"
                  style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                  onMouseMove={handleImageMouseMove}
                  onMouseLeave={handleImageMouseLeave}
                >
                  <img
                    src="/images/hero-main.jpg"
                    alt="Modern house with quality roofing"
                    className="h-auto w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Thumbnail */}
                <div
                  ref={thumbnailRef}
                  className="floating absolute -left-8 bottom-20 w-[45%] overflow-hidden rounded-lg border border-gray-border shadow-xl"
                >
                  <img
                    src="/images/hero-thumbnail.jpg"
                    alt="Aerial view of completed roofing project"
                    className="h-auto w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs font-medium uppercase tracking-wider text-white/80">
                      Recent Project
                    </span>
                    <p className="text-sm font-semibold text-white">
                      Residential Installation
                    </p>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -right-4 top-20 h-32 w-32 rounded-full border border-red-accent/20" />
                <div className="absolute right-20 top-10 h-16 w-16 rounded-full bg-red-accent/10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
};

export default Hero;
