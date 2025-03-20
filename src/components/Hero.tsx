
import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.style.opacity = '0';
      nameRef.current.style.transform = 'translateY(20px)';
      setTimeout(() => {
        if (nameRef.current) {
          nameRef.current.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
          nameRef.current.style.opacity = '1';
          nameRef.current.style.transform = 'translateY(0)';
        }
      }, 100);
    }

    if (titleRef.current) {
      titleRef.current.style.opacity = '0';
      titleRef.current.style.transform = 'translateY(20px)';
      setTimeout(() => {
        if (titleRef.current) {
          titleRef.current.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
          titleRef.current.style.opacity = '1';
          titleRef.current.style.transform = 'translateY(0)';
        }
      }, 300);
    }

    if (imageRef.current) {
      imageRef.current.style.opacity = '0';
      imageRef.current.style.transform = 'translateX(20px)';
      setTimeout(() => {
        if (imageRef.current) {
          imageRef.current.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
          imageRef.current.style.opacity = '1';
          imageRef.current.style.transform = 'translateX(0)';
        }
      }, 500);
    }
  }, []);

  return (
    <section id="home" className="section relative min-h-screen flex items-center">
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-portfolio-baby-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-portfolio-baby-blue/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-3/5">
            <p className="text-portfolio-baby-blue font-mono mb-4">Hello, my name is</p>
            <h1 ref={nameRef} className="heading-1 text-portfolio-white mb-4">
              Yassine Yandouzi.
            </h1>
            <p ref={titleRef} className="text-xl md:text-2xl text-portfolio-light-slate mb-8 max-w-2xl">
              I'm a <span className="text-portfolio-baby-blue">software developer</span> passionate about creating elegant solutions to complex problems.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#projects" 
                className="px-6 py-3 border-2 border-portfolio-baby-blue text-portfolio-baby-blue rounded-md font-medium hover:bg-portfolio-baby-blue/10 transition-colors duration-300"
              >
                View My Work
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3 bg-portfolio-baby-blue text-portfolio-navy rounded-md font-medium hover:bg-portfolio-baby-blue/90 transition-colors duration-300"
              >
                Contact Me
              </a>
            </div>
          </div>
          
          <div ref={imageRef} className="md:w-2/5 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-full bg-portfolio-baby-blue/20 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full border-2 border-portfolio-baby-blue/30 animate-float"></div>
              <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-portfolio-baby-blue">
                {/* Replace with your image URL */}
                <div className="w-full h-full bg-portfolio-navy flex items-center justify-center text-portfolio-baby-blue text-lg">
                  Your Photo Here
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
