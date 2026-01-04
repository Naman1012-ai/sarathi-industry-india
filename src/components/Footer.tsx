import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup logic would go here
    setEmail('');
  };

  const industries = [
    'Agriculture',
    'Food Processing',
    'Dairy Industry',
    'Municipal Corporations',
    'Hospitality',
    'Healthcare',
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-[120rem] mx-auto px-8 md:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Information */}
          <div>
            <h3 className="font-heading text-2xl font-bold mb-6">
              Sarathi Industry India
            </h3>
            <p className="font-paragraph text-base text-primary-foreground/80 mb-6">
              Leading provider of innovative solutions in water treatment, bio-waste management, and biogas technology.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <p className="font-paragraph text-sm text-primary-foreground/80">
                  Industrial Area, Sector 42, Gurgaon, Haryana 122003, India
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <p className="font-paragraph text-sm text-primary-foreground/80">
                  +91 124 456 7890
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <p className="font-paragraph text-sm text-primary-foreground/80">
                  info@sarathiindustry.com
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="font-paragraph text-base text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="font-paragraph text-base text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="font-paragraph text-base text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="font-paragraph text-base text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/contact#quote"
                  className="font-paragraph text-base text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Request Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries Served */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-6">Industries Served</h3>
            <ul className="space-y-3">
              {industries.map((industry) => (
                <li key={industry}>
                  <span className="font-paragraph text-base text-primary-foreground/80">
                    {industry}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-6">Stay Connected</h3>
            <p className="font-paragraph text-base text-primary-foreground/80 mb-4">
              Subscribe to our newsletter for updates and insights.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="mb-6">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                />
                <Button
                  type="submit"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-lg px-6"
                >
                  Subscribe
                </Button>
              </div>
            </form>

            <div>
              <h4 className="font-heading text-lg font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} Sarathi Industry India. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/privacy"
                className="font-paragraph text-sm text-primary-foreground/60 hover:text-secondary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="font-paragraph text-sm text-primary-foreground/60 hover:text-secondary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
