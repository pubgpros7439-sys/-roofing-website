import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Users, Building2, Home, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Text content stagger
      if (textRef.current) {
        const paragraphs = textRef.current.querySelectorAll('p, .feature-item');
        gsap.fromTo(
          paragraphs,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Image 1 mask reveal
      gsap.fromTo(
        image1Ref.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: image1Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Image 2 mask reveal with delay
      gsap.fromTo(
        image2Ref.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: image2Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          delay: 0.2,
        }
      );

      // Parallax for images
      gsap.to(image1Ref.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(image2Ref.current, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Stats counter animation
      if (statsRef.current) {
        const counters = statsRef.current.querySelectorAll('.counter');
        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute('data-target') || '0');
          gsap.fromTo(
            counter,
            { textContent: 0 },
            {
              textContent: target,
              duration: 2,
              ease: 'power2.out',
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: counter,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }

      // SVG line draw
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const features = [
    'Licensed & Insured Professionals',
    'Premium Quality Materials',
    '10-Year Workmanship Warranty',
    '24/7 Emergency Services',
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full overflow-hidden bg-black py-24 lg:py-32"
    >
      {/* Living Grid */}
      <div className="living-grid absolute inset-0 opacity-30" />

      {/* SVG Connection Line */}
      <svg
        className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2 opacity-20"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          ref={lineRef}
          d="M 50 0 Q 30 25 50 50 Q 70 75 50 100"
          fill="none"
          stroke="#d71c21"
          strokeWidth="0.2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-start gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-border bg-black-800/50 px-4 py-2">
            <Users className="h-4 w-4 text-red-accent" />
            <span className="text-xs font-medium uppercase tracking-widest text-gray-text">
              About Us
            </span>
          </div>
          <h2
            ref={headlineRef}
            className="max-w-3xl text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Trusted Roofing Experts{' '}
            <span className="text-red-accent">Delivering Quality</span>
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Text Content - Left */}
          <div ref={textRef} className="lg:col-span-5">
            <p className="mb-6 text-lg leading-relaxed text-gray-text">
              With over 25 years of experience in the roofing industry, we have
              established ourselves as the premier roofing contractor in the region.
              Our commitment to excellence and customer satisfaction has earned us
              the trust of hundreds of homeowners and businesses.
            </p>
            <p className="mb-8 text-base leading-relaxed text-gray-text/80">
              We specialize in both residential and commercial roofing solutions,
              using only the highest quality materials and the latest installation
              techniques. Our team of certified professionals ensures every project
              is completed to the highest standards.
            </p>

            {/* Features */}
            <div className="mb-10 space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="feature-item flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-red-accent" />
                  <span className="text-sm font-medium text-white">{feature}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-6 border-t border-gray-border pt-8"
            >
              <div className="text-center">
                <div className="mb-1 flex items-center justify-center gap-1">
                  <Building2 className="h-4 w-4 text-red-accent" />
                  <span className="counter text-3xl font-bold text-white" data-target="500">
                    0
                  </span>
                  <span className="text-2xl font-bold text-red-accent">+</span>
                </div>
                <span className="text-xs uppercase tracking-wider text-gray-text">
                  Projects
                </span>
              </div>
              <div className="text-center">
                <div className="mb-1 flex items-center justify-center gap-1">
                  <Home className="h-4 w-4 text-red-accent" />
                  <span className="counter text-3xl font-bold text-white" data-target="98">
                    0
                  </span>
                  <span className="text-2xl font-bold text-red-accent">%</span>
                </div>
                <span className="text-xs uppercase tracking-wider text-gray-text">
                  Satisfaction
                </span>
              </div>
              <div className="text-center">
                <div className="mb-1 flex items-center justify-center gap-1">
                  <Users className="h-4 w-4 text-red-accent" />
                  <span className="counter text-3xl font-bold text-white" data-target="25">
                    0
                  </span>
                  <span className="text-2xl font-bold text-red-accent">+</span>
                </div>
                <span className="text-xs uppercase tracking-wider text-gray-text">
                  Years
                </span>
              </div>
            </div>
          </div>

          {/* Images - Right */}
          <div className="relative lg:col-span-7">
            <div className="relative h-[600px] lg:h-[700px]">
              {/* Image 1 - Top Right */}
              <div
                ref={image1Ref}
                className="absolute right-0 top-0 w-[80%] overflow-hidden rounded-lg shadow-2xl"
                style={{ transform: 'rotate(2deg)' }}
              >
                <img
                  src="/images/about-1.jpg"
                  alt="Commercial roofing project"
                  className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Image 2 - Bottom Left */}
              <div
                ref={image2Ref}
                className="absolute bottom-0 left-0 w-[70%] overflow-hidden rounded-lg shadow-2xl"
                style={{ transform: 'rotate(-2deg)' }}
              >
                <img
                  src="/images/about-2.jpg"
                  alt="Roof shingle detail"
                  className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Decorative Badge */}
              <div className="absolute bottom-20 right-10 rounded-lg border border-gray-border bg-black-800/90 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-accent/20">
                    <Award className="h-6 w-6 text-red-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Certified Experts
                    </p>
                    <p className="text-xs text-gray-text">
                      GAF Master Elite
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
