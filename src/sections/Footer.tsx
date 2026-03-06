import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Shield,
  ArrowUp,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      // Logo slide up animation
      gsap.fromTo(
        logoRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden bg-black-900"
    >
      {/* Living Grid */}
      <div className="living-grid absolute inset-0 opacity-20" />

      {/* Main Footer Content */}
      <div className="relative z-10 border-t border-gray-border">
        <div className="mx-auto w-full max-w-[1600px] px-4 py-16 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid gap-12 lg:grid-cols-4">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-accent">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-black uppercase tracking-tight text-white">
                    Apex
                  </span>
                  <span className="text-xl font-black uppercase tracking-tight text-red-accent">
                    Roofing
                  </span>
                </div>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-gray-text">
                Professional roofing services for residential and commercial
                properties. Quality craftsmanship you can trust.
              </p>
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-border text-gray-text transition-all hover:border-red-accent hover:bg-red-accent hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="strikethrough-link text-sm text-gray-text transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">
                Services
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#services"
                    onClick={(e) => handleNavClick(e, '#services')}
                    className="strikethrough-link text-sm text-gray-text transition-colors hover:text-white"
                  >
                    Roof Installation
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    onClick={(e) => handleNavClick(e, '#services')}
                    className="strikethrough-link text-sm text-gray-text transition-colors hover:text-white"
                  >
                    Roof Repair
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    onClick={(e) => handleNavClick(e, '#services')}
                    className="strikethrough-link text-sm text-gray-text transition-colors hover:text-white"
                  >
                    Roof Inspection
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    onClick={(e) => handleNavClick(e, '#services')}
                    className="strikethrough-link text-sm text-gray-text transition-colors hover:text-white"
                  >
                    Roof Maintenance
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    onClick={(e) => handleNavClick(e, '#services')}
                    className="strikethrough-link text-sm text-gray-text transition-colors hover:text-white"
                  >
                    Emergency Services
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-accent" />
                  <span className="text-sm text-gray-text">(555) 123-4567</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-accent" />
                  <span className="text-sm text-gray-text">
                    info@apexroofing.com
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-accent" />
                  <span className="text-sm text-gray-text">
                    123 Roofing Street
                    <br />
                    City, ST 12345
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Large Logo */}
      <div
        ref={logoRef}
        className="relative overflow-hidden border-t border-gray-border py-8"
      >
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between">
            <div className="text-[8vw] font-black uppercase leading-none tracking-tighter text-white/5 lg:text-[6vw]">
              Apex Roofing
            </div>
            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-border text-white transition-all hover:border-red-accent hover:bg-red-accent"
              aria-label="Back to top"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-border bg-black">
        <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-gray-text">
              © 2024 Apex Roofing. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-xs text-gray-text transition-colors hover:text-white"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-xs text-gray-text transition-colors hover:text-white"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Credit */}
      <div className="border-t border-gray-border bg-black">
        <div className="mx-auto w-full max-w-[1600px] px-4 py-4 sm:px-6 lg:px-8 xl:px-12">
          <p className="text-center text-xs text-gray-text">
            build by{' '}
            <a
              href="https://www.instagram.com/contentripple?igsh=MXRlMjVxYWxjbWY3OA=="
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-red-accent transition-colors hover:text-white"
            >
              contentripple
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
