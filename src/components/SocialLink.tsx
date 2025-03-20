
import React from 'react';
import { cn } from '@/lib/utils';
import { Github, Linkedin, Mail } from 'lucide-react';

type SocialLinkProps = {
  platform: 'github' | 'linkedin' | 'email';
  url: string;
  className?: string;
};

const SocialLink: React.FC<SocialLinkProps> = ({ platform, url, className }) => {
  const renderIcon = () => {
    switch (platform) {
      case 'github':
        return <Github size={24} />;
      case 'linkedin':
        return <Linkedin size={24} />;
      case 'email':
        return <Mail size={24} />;
      default:
        return null;
    }
  };

  const getAriaLabel = () => {
    switch (platform) {
      case 'github':
        return 'GitHub Profile';
      case 'linkedin':
        return 'LinkedIn Profile';
      case 'email':
        return 'Email Address';
      default:
        return platform;
    }
  };

  const handleClick = () => {
    if (platform === 'email') {
      window.location.href = `mailto:${url}`;
      return;
    }
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "social-icon transform transition-all duration-300 hover:scale-110",
        className
      )}
      aria-label={getAriaLabel()}
    >
      {renderIcon()}
    </button>
  );
};

export default SocialLink;
