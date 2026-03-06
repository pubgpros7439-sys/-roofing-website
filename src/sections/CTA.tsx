import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to(bg, {
        y: '-20%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Content reveal
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you! We will contact you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 h-[120%] w-full"
          style={{ top: '-10%' }}
        >
          <img
            src="/images/cta-bg.jpg"
            alt="Roofing team at work"
            className="h-full w-full object-cover"
          />
        </div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
          <div ref={contentRef} className="grid gap-16 lg:grid-cols-2">
            {/* Left Column - Text */}
            <div className="flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                  <Phone className="h-4 w-4 text-red-accent" />
                  <span className="text-xs font-medium uppercase tracking-widest text-white/80">
                    Get In Touch
                  </span>
                </div>
                <h2 className="mb-6 text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  Ready to Protect Your{' '}
                  <span className="text-red-accent">Property?</span>
                </h2>
                <p className="max-w-lg text-base leading-relaxed text-white/70">
                  Contact us today for a free consultation and estimate. Our team
                  is ready to help you with all your roofing needs.
                </p>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-accent/20 backdrop-blur-sm">
                    <Phone className="h-5 w-5 text-red-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Call Us</p>
                    <p className="text-lg font-semibold text-white">
                      (555) 123-4567
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-accent/20 backdrop-blur-sm">
                    <Mail className="h-5 w-5 text-red-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Email Us</p>
                    <p className="text-lg font-semibold text-white">
                      info@apexroofing.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-accent/20 backdrop-blur-sm">
                    <MapPin className="h-5 w-5 text-red-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Visit Us</p>
                    <p className="text-lg font-semibold text-white">
                      123 Roofing Street, City, ST 12345
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg"
            >
              <h3 className="mb-6 text-2xl font-bold text-white">
                Get a Free Quote
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-12 rounded-lg border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-red-accent focus:ring-red-accent"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12 rounded-lg border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-red-accent focus:ring-red-accent"
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="h-12 rounded-lg border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-red-accent focus:ring-red-accent"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="rounded-lg border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-red-accent focus:ring-red-accent"
                  />
                </div>
                <Button
                  type="submit"
                  className="magnetic-btn group h-12 w-full rounded-lg bg-red-accent text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-red-600"
                >
                  <span className="flex items-center justify-center gap-2">
                    Send Message
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
