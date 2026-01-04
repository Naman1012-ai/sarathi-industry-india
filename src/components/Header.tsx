import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBusinessMenu, setShowBusinessMenu] = useState(false);
  const location = useLocation();

  const businessDivisions = [
    { name: 'Water Solutions', slug: 'water-solutions' },
    { name: 'Bio-Waste Management', slug: 'bio-waste-management' },
    { name: 'Biogas Solutions', slug: 'biogas-solutions' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="backdrop-blur-md bg-background/80 border-b border-light-grey">
        <div className="max-w-[120rem] mx-auto px-8 md:px-20">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl md:text-3xl font-heading font-bold text-primary">
                Sarathi Industry India
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                to="/"
                className={`font-paragraph text-base transition-colors hover:text-secondary ${
                  isActive('/') ? 'text-secondary' : 'text-foreground'
                }`}
              >
                Home
              </Link>

              {/* Our Business Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setShowBusinessMenu(true)}
                onMouseLeave={() => setShowBusinessMenu(false)}
              >
                <button
                  className={`font-paragraph text-base transition-colors hover:text-secondary flex items-center gap-1 ${
                    location.pathname.startsWith('/business') ? 'text-secondary' : 'text-foreground'
                  }`}
                >
                  Our Business
                  <ChevronDown className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {showBusinessMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-background border border-light-grey shadow-lg"
                    >
                      <div className="p-4">
                        <h3 className="font-heading text-lg font-bold text-primary mb-4">
                          Business Divisions
                        </h3>
                        <div className="space-y-2">
                          {businessDivisions.map((division) => (
                            <Link
                              key={division.slug}
                              to={`/business/${division.slug}`}
                              className="block px-4 py-3 font-paragraph text-base text-foreground hover:bg-accent hover:text-secondary transition-colors"
                            >
                              {division.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/about"
                className={`font-paragraph text-base transition-colors hover:text-secondary ${
                  isActive('/about') ? 'text-secondary' : 'text-foreground'
                }`}
              >
                About
              </Link>

              <Link
                to="/products"
                className={`font-paragraph text-base transition-colors hover:text-secondary ${
                  isActive('/products') ? 'text-secondary' : 'text-foreground'
                }`}
              >
                Products
              </Link>

              <Link
                to="/contact"
                className={`font-paragraph text-base transition-colors hover:text-secondary ${
                  isActive('/contact') ? 'text-secondary' : 'text-foreground'
                }`}
              >
                Contact
              </Link>

              <Link to="/contact#quote">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 h-auto">
                  Request Quote
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-primary" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-background">
                <div className="flex flex-col gap-6 mt-8">
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className="font-paragraph text-lg text-foreground hover:text-secondary transition-colors"
                  >
                    Home
                  </Link>

                  <div>
                    <p className="font-heading text-lg font-bold text-primary mb-3">
                      Our Business
                    </p>
                    <div className="pl-4 space-y-3">
                      {businessDivisions.map((division) => (
                        <Link
                          key={division.slug}
                          to={`/business/${division.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="block font-paragraph text-base text-foreground hover:text-secondary transition-colors"
                        >
                          {division.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link
                    to="/about"
                    onClick={() => setIsOpen(false)}
                    className="font-paragraph text-lg text-foreground hover:text-secondary transition-colors"
                  >
                    About
                  </Link>

                  <Link
                    to="/products"
                    onClick={() => setIsOpen(false)}
                    className="font-paragraph text-lg text-foreground hover:text-secondary transition-colors"
                  >
                    Products
                  </Link>

                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="font-paragraph text-lg text-foreground hover:text-secondary transition-colors"
                  >
                    Contact
                  </Link>

                  <Link to="/contact#quote" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 h-auto">
                      Request Quote
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
