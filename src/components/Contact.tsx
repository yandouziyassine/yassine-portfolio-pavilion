
import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import SocialLink from './SocialLink';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset form status after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="section bg-portfolio-navy/30" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        
        <div className="max-w-3xl mx-auto">
          <div className={cn(
            "glass-card p-8 transform transition-all duration-700",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold text-portfolio-white mb-4">Contact Me</h3>
                <p className="text-portfolio-light-slate mb-8">
                  Have a question or want to work together? Feel free to reach out using the form
                  or through my social links.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-portfolio-baby-blue font-medium mb-2">Email</h4>
                    <p className="text-portfolio-white">yandouziyassine@gmail.com</p>
                  </div>
                  
                  <div>
                    <h4 className="text-portfolio-baby-blue font-medium mb-4">Connect</h4>
                    <div className="flex space-x-4">
                      <SocialLink platform="github" url="https://github.com/yandouziyassine" />
                      <SocialLink platform="linkedin" url="https://www.linkedin.com/in/yassine-yandouzi/" />
                      <SocialLink platform="email" url="yandouziyassine@gmail.com" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-portfolio-white mb-2 font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-portfolio-navy border border-portfolio-baby-blue/20 rounded-md focus:outline-none focus:ring-2 focus:ring-portfolio-baby-blue/50 text-portfolio-white"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-portfolio-white mb-2 font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-portfolio-navy border border-portfolio-baby-blue/20 rounded-md focus:outline-none focus:ring-2 focus:ring-portfolio-baby-blue/50 text-portfolio-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-portfolio-white mb-2 font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-portfolio-navy border border-portfolio-baby-blue/20 rounded-md focus:outline-none focus:ring-2 focus:ring-portfolio-baby-blue/50 text-portfolio-white resize-none"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className={cn(
                      "w-full py-3 rounded-md font-medium transition-colors duration-300",
                      formStatus === 'submitting' 
                        ? "bg-portfolio-baby-blue/70 text-portfolio-navy cursor-wait" 
                        : formStatus === 'success'
                          ? "bg-green-500 text-white"
                          : "bg-portfolio-baby-blue text-portfolio-navy hover:bg-portfolio-baby-blue/90"
                    )}
                  >
                    {formStatus === 'submitting' 
                      ? 'Sending...' 
                      : formStatus === 'success' 
                        ? 'Message Sent!' 
                        : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          <div className={cn(
            "mt-12 text-center transform transition-all duration-700 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <p className="text-portfolio-light-slate">
              &copy; {new Date().getFullYear()} Yassine Yandouzi. All rights reserved.
            </p>
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

export default Contact;
