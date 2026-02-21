import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Github, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xl font-bold gradient-text">Satiate</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              A crowdfunding platform connecting donors with verified NGOs making real impact across India.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { to: '/', label: 'Explore NGOs' },
                { to: '/register', label: 'Register Organization' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Connect With Us</h4>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: 'https://www.instagram.com/dmce_csi_catt/', color: 'hover:text-pink-400' },
                { icon: Linkedin, href: 'https://www.linkedin.com/company/csi-dmce/about/', color: 'hover:text-blue-400' },
                { icon: Github, href: 'https://github.com/CSI-CATT-DMCE', color: 'hover:text-white' },
              ].map(({ icon: Icon, href, color }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex h-10 w-10 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground ${color} hover:bg-muted transition-all duration-200`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
