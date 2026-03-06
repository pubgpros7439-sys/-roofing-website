import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, Search, Hammer, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: '01',
    title: 'Consultation',
    description:
      'We begin with a detailed discussion of your roofing needs, preferences, and budget. Our experts provide professional advice and a comprehensive estimate.',
    icon: MessageSquare,
  },
  {
    id: '02',
    title: 'Inspection',
    description:
      'Our team conducts a thorough on-site assessment to evaluate your roofs condition, identify issues, and determine the best course of action.',
    icon: Search,
  },
  {
    id: '03',
    title: 'Execution',
    description:
      'We complete the job with precision using high-quality materials and expert craftsmanship. Our team works efficiently while maintaining the highest standards.',
    icon: Hammer,
  },
  {
    id: '04',
    title: 'Final Check',
    description:
      'A comprehensive review ensures everything meets our strict quality standards. We verify all work and ensure your complete satisfaction.',
    icon: CheckCircle,
  },
];

const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

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

      // Progress line animation
      gsap.fromTo(
        lineRef.current,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: true,
          },
        }
      );

      // Step cards animation
      const stepCards = stepsRef.current?.querySelectorAll('.step-card');
      stepCards?.forEach((card, index) => {
        const isLeft = index % 2 === 0;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: isLeft ? -50 : 50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Step number scale animation
        const number = card.querySelector('.step-number');
        gsap.fromTo(
          number,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Dot pulse animation
        const dot = card.querySelector('.step-dot');
        ScrollTrigger.create({
          trigger: card,
          start: 'top 60%',
          onEnter: () => {
            dot?.classList.add('glow-pulse');
          },
          onLeaveBack: () => {
            dot?.classList.remove('glow-pulse');
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative w-full overflow-hidden bg-black py-24 lg:py-32"
    >
      {/* Living Grid */}
      <div className="living-grid absolute inset-0 opacity-30" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="mb-20 flex flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-border bg-black-800/50 px-4 py-2">
            <CheckCircle className="h-4 w-4 text-red-accent" />
            <span className="text-xs font-medium uppercase tracking-widest text-gray-text">
              Our Process
            </span>
          </div>
          <h2 className="max-w-3xl text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            How We <span className="text-red-accent">Work</span>
          </h2>
          <p className="max-w-xl text-base text-gray-text">
            Our streamlined process ensures a smooth experience from initial
            consultation to project completion.
          </p>
        </div>

        {/* Process Steps */}
        <div ref={stepsRef} className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gray-border lg:block">
            <div
              ref={lineRef}
              className="w-full bg-red-accent"
              style={{ height: '0%' }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={step.id}
                  className={`step-card relative flex items-center gap-8 ${
                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div
                    className={`flex-1 ${
                      isLeft ? 'lg:text-right' : 'lg:text-left'
                    }`}
                  >
                    <div
                      className={`inline-block rounded-xl border border-gray-border bg-black-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-red-accent/50 hover:bg-black-800 lg:p-8 ${
                        isLeft ? 'lg:ml-auto' : 'lg:mr-auto'
                      }`}
                      style={{ maxWidth: '500px' }}
                    >
                      {/* Step Number */}
                      <div
                        className={`step-number mb-4 flex items-center gap-3 ${
                          isLeft ? 'lg:justify-end' : ''
                        }`}
                      >
                        <span className="text-4xl font-black text-red-accent">
                          {step.id}
                        </span>
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-accent/20">
                          <Icon className="h-5 w-5 text-red-accent" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="mb-3 text-xl font-bold uppercase tracking-tight text-white">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm leading-relaxed text-gray-text">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="step-dot relative hidden h-6 w-6 flex-shrink-0 items-center justify-center lg:flex">
                    <div className="absolute h-full w-full rounded-full bg-red-accent" />
                    <div className="absolute h-3 w-3 rounded-full bg-white" />
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden flex-1 lg:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
