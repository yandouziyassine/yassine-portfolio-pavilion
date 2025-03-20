
import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

type Skill = {
  category: string;
  items: string[];
};

const skills: Skill[] = [
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "Java", "HTML/CSS"]
  },
  {
    category: "Frameworks",
    items: ["React", "Next.js", "Node.js", "Express", "Tailwind CSS"]
  },
  {
    category: "Tools",
    items: ["Git", "Docker", "AWS", "Firebase", "Figma"]
  }
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section id="about" className="section bg-portfolio-navy/30" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">About Me</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className={cn(
            "transform transition-all duration-700",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          )}>
            <p className="text-lg mb-6">
              Hello! I'm Yassine, a passionate software developer with a keen interest in building 
              elegant, user-friendly applications that solve real-world problems.
            </p>
            <p className="text-lg mb-6">
              With a background in computer science, I enjoy taking on complex challenges and 
              turning them into simple, beautiful solutions. I'm constantly learning new 
              technologies and methodologies to improve my craft.
            </p>
            <p className="text-lg">
              When I'm not coding, you can find me exploring new technologies, contributing to 
              open-source projects, or expanding my knowledge through books and courses.
            </p>
          </div>
          
          <div className={cn(
            "glass-card p-8 transform transition-all duration-700 delay-300",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          )}>
            <h3 className="text-xl font-bold text-portfolio-white mb-6">Skills & Technologies</h3>
            
            <div className="space-y-6">
              {skills.map((skillGroup, groupIndex) => (
                <div key={groupIndex} className="space-y-3">
                  <h4 className="text-portfolio-baby-blue font-medium">{skillGroup.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex} 
                        className="technology-pill"
                        style={{ animationDelay: `${skillIndex * 100}ms` }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Custom hook for intersection observer
function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = { threshold: 0 }
): boolean {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [elementRef, options]);

  return isVisible;
}

export default About;
