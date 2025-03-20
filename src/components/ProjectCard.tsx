
import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ProjectProps {
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  github?: string;
  liveDemo?: string;
  category: string;
}

interface ProjectCardProps {
  project: ProjectProps;
  index: number;
  isVisible: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, isVisible }) => {
  const { title, description, image, technologies, github, liveDemo, category } = project;
  
  const delay = index * 200;
  
  return (
    <div 
      className={cn(
        "project-card h-full transform transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-portfolio-navy">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-portfolio-navy text-portfolio-light-slate">
            Project Image
          </div>
        )}
        <span className="absolute top-3 left-3 px-3 py-1 text-xs rounded-full bg-portfolio-baby-blue/80 text-portfolio-navy backdrop-blur-sm font-medium">
          {category}
        </span>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-portfolio-white mb-2">{title}</h3>
        <p className="text-portfolio-light-slate mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech, index) => (
            <span key={index} className="technology-pill">{tech}</span>
          ))}
        </div>
        
        <div className="flex space-x-4">
          {github && (
            <a 
              href={github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-portfolio-light-slate hover:text-portfolio-baby-blue transition-colors"
              aria-label="GitHub Repository"
            >
              <Github size={18} className="mr-2" />
              <span>Code</span>
            </a>
          )}
          {liveDemo && (
            <a 
              href={liveDemo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-portfolio-light-slate hover:text-portfolio-baby-blue transition-colors"
              aria-label="Live Demo"
            >
              <ExternalLink size={18} className="mr-2" />
              <span>Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
