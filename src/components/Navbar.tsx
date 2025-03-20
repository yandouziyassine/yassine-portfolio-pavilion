
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 50);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('.section[id]');
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300",
      scrolled ? "py-3 bg-portfolio-navy/90 backdrop-blur-md shadow-lg" : "py-5 bg-transparent"
    )}>
      <div className="container flex items-center justify-between">
        <a 
          href="#home" 
          className="text-portfolio-white text-2xl font-bold hover:text-portfolio-baby-pink transition-colors"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
        >
          Y.Y
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link, index) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={cn(
                "nav-link",
                activeSection === link.id && "text-portfolio-purple"
              )}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.id);
              }}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex flex-col space-y-1.5 p-2 z-50" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={cn(
            "w-6 h-0.5 bg-portfolio-white transition-transform duration-300",
            mobileMenuOpen && "transform rotate-45 translate-y-2"
          )}></span>
          <span className={cn(
            "w-6 h-0.5 bg-portfolio-white transition-opacity duration-300",
            mobileMenuOpen && "opacity-0"
          )}></span>
          <span className={cn(
            "w-6 h-0.5 bg-portfolio-white transition-transform duration-300",
            mobileMenuOpen && "transform -rotate-45 -translate-y-2"
          )}></span>
        </button>

        {/* Mobile Navigation */}
        <div className={cn(
          "fixed inset-0 bg-portfolio-navy/95 flex flex-col items-center justify-center transform transition-transform duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <nav className="flex flex-col items-center space-y-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="text-portfolio-white text-2xl hover:text-portfolio-purple transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
