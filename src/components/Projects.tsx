
import React, { useRef, useState } from 'react';
import ProjectCard, { ProjectProps } from './ProjectCard';
import { cn } from '@/lib/utils';

const projects: ProjectProps[] = [
  {
    title: "Portfolio Website",
    description: "A responsive portfolio website built with React and Tailwind CSS.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/yourusername/portfolio",
    liveDemo: "https://yourportfolio.com",
    category: "Web Development"
  },
  {
    title: "E-commerce Platform",
    description: "A full-stack e-commerce platform with product listings and cart functionality.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/yourusername/ecommerce",
    liveDemo: "https://yourecommerce.com",
    category: "Full Stack"
  },
  {
    title: "Weather App",
    description: "A weather application that shows current and forecast weather data.",
    technologies: ["JavaScript", "HTML", "CSS", "API Integration"],
    github: "https://github.com/yourusername/weather-app",
    liveDemo: "https://yourweatherapp.com",
    category: "JavaScript"
  },
  {
    title: "Task Management App",
    description: "A task management application with drag-and-drop functionality.",
    technologies: ["React", "Redux", "Firebase"],
    github: "https://github.com/yourusername/task-manager",
    liveDemo: "https://yourtaskmanager.com",
    category: "React"
  },
  {
    title: "Blog Platform",
    description: "A blog platform with markdown support and user authentication.",
    technologies: ["Next.js", "Prisma", "PostgreSQL"],
    github: "https://github.com/yourusername/blog-platform",
    liveDemo: "https://yourblog.com",
    category: "Full Stack"
  },
  {
    title: "Data Visualization Dashboard",
    description: "An interactive dashboard for visualizing complex datasets.",
    technologies: ["D3.js", "React", "Node.js"],
    github: "https://github.com/yourusername/data-viz",
    liveDemo: "https://yourdataviz.com",
    category: "Data Visualization"
  }
];

const categories = ["All", "Web Development", "Full Stack", "JavaScript", "React", "Data Visualization"];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Projects</h2>
        
        <div className="mb-12">
          <div className={cn(
            "flex flex-wrap justify-center gap-3 transform transition-all duration-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            {categories.map((category, index) => (
              <button
                key={index}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all duration-300",
                  activeCategory === category 
                    ? "bg-portfolio-purple text-portfolio-navy" 
                    : "bg-portfolio-navy/50 text-portfolio-light-slate hover:bg-portfolio-navy/80"
                )}
                onClick={() => setActiveCategory(category)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              index={index} 
              isVisible={isVisible}
            />
          ))}
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

export default Projects;
