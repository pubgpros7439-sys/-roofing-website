import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'John Anderson',
    role: 'Homeowner',
    content:
      'Apex Roofing did an outstanding job on our roof. The team was professional, efficient, and the quality of work exceeded our expectations. Highly recommended!',
    rating: 5,
    avatar: 'JA',
  },
  {
    id: 2,
    name: 'Sarah Mitchell',
    role: 'Property Manager',
    content:
      'Professional, efficient, and great attention to detail. They completed our commercial roofing project on time and within budget. Will definitely use them again.',
    rating: 5,
    avatar: 'SM',
  },
  {
    id: 3,
    name: 'Michael Roberts',
    role: 'Business Owner',
    content:
      'The team was friendly and completed the work on time. They kept us informed throughout the entire process and the final result is fantastic.',
    rating: 5,
    avatar: 'MR',
  },
  {
    id: 4,
    name: 'Emily Thompson',
    role: 'Homeowner',
    content:
      'From the initial consultation to the final inspection, everything was handled professionally. Our new roof looks amazing and we could not be happier.',
    rating: 5,
    avatar: 'ET',
  },
  {
    id: 5,
    name: 'David Wilson',
    role: 'Real Estate Developer',
    content:
      'We have worked with Apex Roofing on multiple projects. Their consistency in quality and reliability makes them our go-to roofing contractor.',
    rating: 5,
    avatar: 'DW',
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

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

      gsap.fromTo(
        carouselRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative w-full overflow-hidden bg-black py-24 lg:py-32"
    >
      {/* Living Grid */}
      <div className="living-grid absolute inset-0 opacity-30" />

      {/* Background Quote */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
        <Quote className="h-96 w-96 text-red-accent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="mb-16 flex flex-col items-center gap-4 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-border bg-black-800/50 px-4 py-2">
            <MessageCircle className="h-4 w-4 text-red-accent" />
            <span className="text-xs font-medium uppercase tracking-widest text-gray-text">
              Testimonials
            </span>
          </div>
          <h2 className="max-w-3xl text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            What Our <span className="text-red-accent">Clients Say</span>
          </h2>
          <p className="max-w-xl text-base text-gray-text">
            Do not just take our word for it. Here is what our satisfied customers
            have to say about our roofing services.
          </p>
        </div>

        {/* Carousel */}
        <div ref={carouselRef} className="relative mx-auto max-w-4xl">
          {/* Main Card */}
          <div className="relative h-[400px] overflow-hidden rounded-2xl border border-gray-border bg-black-800/50 backdrop-blur-sm sm:h-[350px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                }}
                className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center sm:p-12"
              >
                {/* Quote Icon */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-accent/20">
                  <Quote className="h-6 w-6 text-red-accent" />
                </div>

                {/* Rating */}
                <div className="mb-6 flex gap-1">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-red-accent text-red-accent"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white sm:text-xl">
                  "{testimonials[activeIndex].content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-accent text-sm font-bold text-white">
                    {testimonials[activeIndex].avatar}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-white">
                      {testimonials[activeIndex].name}
                    </p>
                    <p className="text-sm text-gray-text">
                      {testimonials[activeIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute left-0 right-0 top-1/2 flex -translate-y-1/2 justify-between px-4">
            <button
              onClick={prevSlide}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-border bg-black-800/80 text-white backdrop-blur-sm transition-all hover:border-red-accent hover:bg-red-accent"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-border bg-black-800/80 text-white backdrop-blur-sm transition-all hover:border-red-accent hover:bg-red-accent"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-8 bg-red-accent'
                    : 'w-2 bg-gray-border hover:bg-gray-text'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 border-t border-gray-border pt-12">
          <div className="flex items-center gap-2 text-gray-text">
            <Star className="h-5 w-5 fill-red-accent text-red-accent" />
            <span className="text-sm">4.9/5 Average Rating</span>
          </div>
          <div className="flex items-center gap-2 text-gray-text">
            <MessageCircle className="h-5 w-5 text-red-accent" />
            <span className="text-sm">500+ Reviews</span>
          </div>
          <div className="flex items-center gap-2 text-gray-text">
            <Quote className="h-5 w-5 text-red-accent" />
            <span className="text-sm">98% Would Recommend</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
