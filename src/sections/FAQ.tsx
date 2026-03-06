import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Plus, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'How long does a roof installation take?',
    answer:
      'The duration of a roof installation depends on various factors including the size of your roof, the type of materials used, and weather conditions. Typically, a standard residential roof installation takes 1-3 days, while larger or more complex projects may take 5-7 days. We always provide a detailed timeline during our initial consultation.',
  },
  {
    question: 'What roofing materials do you work with?',
    answer:
      'We work with a wide range of premium roofing materials including asphalt shingles, metal roofing, tile roofing, slate, TPO, EPDM, and modified bitumen. Our experts will help you choose the best material based on your budget, aesthetic preferences, and local climate conditions.',
  },
  {
    question: 'Do you offer warranties?',
    answer:
      'Yes, we offer comprehensive warranties on all our work. We provide a 10-year workmanship warranty on all new roof installations, and we also pass along manufacturer warranties on materials, which can range from 25 years to lifetime coverage depending on the product.',
  },
  {
    question: 'How do I know if my roof needs repairs?',
    answer:
      'Common signs that your roof needs repairs include: missing or damaged shingles, water stains on ceilings or walls, granules in gutters, sagging areas, visible leaks, and increased energy bills. If you notice any of these signs, we recommend scheduling a professional inspection.',
  },
  {
    question: 'Can I get a free estimate?',
    answer:
      'Absolutely! We offer free, no-obligation estimates for all roofing projects. Our team will visit your property, assess your roofing needs, and provide a detailed written estimate outlining all costs, materials, and timelines. Contact us today to schedule your free consultation.',
  },
  {
    question: 'Do you handle insurance claims?',
    answer:
      'Yes, we have extensive experience working with insurance companies on storm damage claims. We can help document the damage, provide detailed estimates, and work directly with your insurance adjuster to ensure you receive fair coverage for necessary repairs or replacement.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const faqsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
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

      const faqItems = faqsRef.current?.querySelectorAll('.faq-item');
      faqItems?.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative w-full overflow-hidden bg-black py-24 lg:py-32"
    >
      {/* Living Grid */}
      <div className="living-grid absolute inset-0 opacity-30" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left Column - Header */}
          <div ref={headerRef} className="lg:sticky lg:top-32 lg:self-start">
            <div className="flex flex-col gap-4">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-border bg-black-800/50 px-4 py-2">
                <HelpCircle className="h-4 w-4 text-red-accent" />
                <span className="text-xs font-medium uppercase tracking-widest text-gray-text">
                  FAQ
                </span>
              </div>
              <h2 className="text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Common <span className="text-red-accent">Questions</span>
              </h2>
              <p className="max-w-md text-base text-gray-text">
                Find answers to frequently asked questions about our roofing
                services. If you do not see your question here, feel free to contact
                us.
              </p>

              {/* Contact CTA */}
              <div className="mt-8 rounded-xl border border-gray-border bg-black-800/50 p-6">
                <p className="mb-4 text-sm text-gray-text">
                  Still have questions?
                </p>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-red-accent transition-colors hover:text-white"
                >
                  Contact our team
                  <span className="text-lg">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - FAQ Items */}
          <div ref={faqsRef} className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq-item overflow-hidden rounded-xl border border-gray-border bg-black-800/30 transition-all duration-300 hover:border-gray-border/80"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="pr-4 text-base font-semibold text-white sm:text-lg">
                    {faq.question}
                  </span>
                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      openIndex === index
                        ? 'border-red-accent bg-red-accent text-white'
                        : 'border-gray-border text-gray-text'
                    }`}
                  >
                    {openIndex === index ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                        transition: {
                          height: {
                            duration: 0.4,
                            ease: [0.34, 1.56, 0.64, 1],
                          },
                          opacity: {
                            duration: 0.3,
                            delay: 0.1,
                          },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: {
                            duration: 0.3,
                            ease: 'easeInOut',
                          },
                          opacity: {
                            duration: 0.2,
                          },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-gray-border px-6 pb-6 pt-4">
                        <p className="text-sm leading-relaxed text-gray-text">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
