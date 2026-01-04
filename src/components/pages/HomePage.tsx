// HPI 1.6-V
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowRight, CheckCircle, Droplet, Leaf, Zap, BarChart3, Globe, ShieldCheck, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { BusinessDivisions } from '@/entities';

// --- Utility Components for Motion & Interaction ---

type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className, delay = 0, threshold = 0.1 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(element);
      }
    }, { threshold });

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out ${className || ''}`}
      style={{ 
        opacity: isVisible ? 1 : 0, 
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

const ParallaxImage: React.FC<{ src: string; alt: string; className?: string; id: string }> = ({ src, alt, className, id }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`}>
      <motion.div style={{ y }} className="w-full h-[120%] -mt-[10%] absolute top-0 left-0">
        <Image
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          width={1200}
        />
      </motion.div>
    </div>
  );
};

// --- Main Component ---

export default function HomePage() {
  // --- 1. Data Fidelity Protocol: Canonize & Preserve ---
  const [divisions, setDivisions] = useState<BusinessDivisions[]>([]);

  useEffect(() => {
    const fetchDivisions = async () => {
      const { items } = await BaseCrudService.getAll<BusinessDivisions>('businessdivisions');
      setDivisions(items.filter((d) => d.isActive));
    };
    fetchDivisions();
  }, []);

  const divisionIcons = {
    'water-solutions': Droplet,
    'bio-waste-management': Leaf,
    'biogas-solutions': Zap,
  };

  const values = [
    {
      title: 'Innovation',
      description: 'Cutting-edge technology and sustainable solutions for modern industrial challenges.',
    },
    {
      title: 'Quality',
      description: 'Uncompromising standards in every product and service we deliver.',
    },
    {
      title: 'Reliability',
      description: 'Trusted partner for industries across India with proven track record.',
    },
    {
      title: 'Sustainability',
      description: 'Committed to environmental responsibility and green technology.',
    },
  ];

  // --- New Static Data for Enrichment ---
  const stats = [
    { label: "Years of Excellence", value: "25+", icon: ShieldCheck },
    { label: "Projects Delivered", value: "500+", icon: BarChart3 },
    { label: "Global Partners", value: "40+", icon: Globe },
  ];

  // --- Scroll Progress for Global Bar ---
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background font-paragraph text-foreground selection:bg-secondary selection:text-secondary-foreground overflow-clip">
      {/* Global Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-secondary z-50 origin-left"
        style={{ scaleX }}
      />

      <Header />

      {/* --- HERO SECTION: Cinematic Parallax --- */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Parallax Layer */}
        <div className="absolute inset-0 z-0">
          <ParallaxImage 
            src="https://static.wixstatic.com/media/5c01b6_b95cde5649b24a0398f292d852c48b99~mv2.png?originWidth=1152&originHeight=640"
            alt="Sarathi Industry India - Advanced Industrial Facility"
            className="w-full h-full"
            id="hero-bg"
          />
          <div className="absolute inset-0 bg-primary/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-80" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
          <AnimatedElement delay={200}>
            <span className="inline-block py-1 px-3 border border-secondary/50 rounded-full text-secondary text-sm tracking-[0.2em] uppercase mb-6 backdrop-blur-sm bg-primary/20">
              Est. 1998 • Industrial Excellence
            </span>
          </AnimatedElement>
          
          <AnimatedElement delay={400}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-primary-foreground mb-8 leading-[0.9] tracking-tight">
              Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white">
                The Future
              </span>
            </h1>
          </AnimatedElement>

          <AnimatedElement delay={600}>
            <p className="text-lg md:text-2xl text-primary-foreground/80 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Leading the revolution in sustainable industrial solutions through innovation in water treatment, bio-waste management, and biogas technology.
            </p>
          </AnimatedElement>

          <AnimatedElement delay={800}>
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <Link to="/about">
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-none px-10 py-7 text-lg tracking-wide transition-all duration-300 hover:translate-x-1">
                  Discover Our Story
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact#quote">
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white hover:text-primary rounded-none px-10 py-7 text-lg tracking-wide backdrop-blur-sm transition-all duration-300"
                >
                  Request Quote
                </Button>
              </Link>
            </div>
          </AnimatedElement>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* --- STATS STRIP: Authoritative Proof --- */}
      <section className="py-20 bg-background border-b border-primary/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, index) => (
              <AnimatedElement key={index} delay={index * 150} className="flex items-center gap-6 group">
                <div className="p-4 bg-primary/5 rounded-full group-hover:bg-secondary/10 transition-colors duration-500">
                  <stat.icon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors duration-500" />
                </div>
                <div>
                  <h3 className="text-4xl font-heading font-bold text-primary mb-1">{stat.value}</h3>
                  <p className="text-sm uppercase tracking-wider text-foreground/60">{stat.label}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* --- VALUES SECTION: Sticky Layout --- */}
      <section className="relative bg-accent py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* Sticky Header */}
            <div className="lg:w-1/3">
              <div className="sticky top-32">
                <AnimatedElement>
                  <h2 className="text-4xl md:text-6xl font-heading font-bold text-primary mb-8 leading-tight">
                    Engineering <br/>
                    <span className="text-secondary">Excellence</span>
                  </h2>
                  <p className="text-lg text-foreground/70 mb-12 leading-relaxed">
                    With decades of expertise, Sarathi Industry India delivers comprehensive solutions that transform industrial processes, reduce environmental impact, and drive operational efficiency.
                  </p>
                  <div className="h-1 w-24 bg-secondary" />
                </AnimatedElement>
              </div>
            </div>

            {/* Scrolling Grid */}
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <AnimatedElement key={value.title} delay={index * 100}>
                  <div className="group p-10 bg-background border border-primary/5 hover:border-secondary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 h-full flex flex-col">
                    <div className="mb-6 inline-flex p-3 bg-primary/5 text-primary rounded-lg group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-500">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-primary mb-4 group-hover:translate-x-2 transition-transform duration-300">
                      {value.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- BUSINESS DIVISIONS: Vertical Parallax Reveal --- */}
      <section className="py-32 bg-primary text-primary-foreground overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 mb-24 text-center">
          <AnimatedElement>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">Our Business Divisions</h2>
            <p className="text-xl text-primary-foreground/60 max-w-2xl mx-auto">
              Specialized solutions across three core areas of industrial sustainability.
            </p>
          </AnimatedElement>
        </div>

        <div className="flex flex-col gap-0">
          {divisions.map((division, index) => {
            const Icon = divisionIcons[division.slug as keyof typeof divisionIcons] || Droplet;
            const isEven = index % 2 === 0;

            return (
              <div key={division._id} className="relative min-h-[80vh] flex items-center py-20">
                {/* Background Number */}
                <div className={`absolute top-20 ${isEven ? 'left-10' : 'right-10'} text-[20rem] font-heading font-bold text-white/5 leading-none select-none pointer-events-none z-0`}>
                  0{index + 1}
                </div>

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                  <div className={`flex flex-col lg:flex-row items-center gap-16 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                    
                    {/* Image Side */}
                    <div className="w-full lg:w-1/2">
                      <AnimatedElement className="relative group">
                        <div className="absolute -inset-4 border border-secondary/30 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
                        <div className="relative aspect-[4/3] overflow-hidden bg-background/10">
                          <Image
                            src={division.divisionImage || 'https://static.wixstatic.com/media/5c01b6_5e1b051e9d5e483396527964aa7f6e76~mv2.png?originWidth=768&originHeight=576'}
                            alt={division.divisionName || 'Division Image'}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            width={800}
                          />
                          <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500" />
                        </div>
                      </AnimatedElement>
                    </div>

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2">
                      <AnimatedElement delay={200}>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="p-3 bg-secondary/10 rounded-lg">
                            <Icon className="w-8 h-8 text-secondary" />
                          </div>
                          <span className="text-secondary uppercase tracking-widest text-sm font-bold">Division 0{index + 1}</span>
                        </div>
                        
                        <h3 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">
                          {division.divisionName}
                        </h3>
                        
                        <p className="text-lg text-primary-foreground/70 mb-8 leading-relaxed max-w-xl">
                          {division.shortDescription}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                          <Link to={`/business/${division.slug}`}>
                            <Button className="bg-white text-primary hover:bg-secondary hover:text-secondary-foreground rounded-none px-8 py-6 text-lg transition-all duration-300">
                              Explore Division
                              <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                          </Link>
                        </div>
                      </AnimatedElement>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- PROCESS / VISUAL BREAK --- */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        <div className="container mx-auto px-6 md:px-12 text-center mb-20">
          <AnimatedElement>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">Our Approach</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              A systematic methodology ensuring quality, safety, and efficiency in every project we undertake.
            </p>
          </AnimatedElement>
        </div>

        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-primary/10 -z-10" />

            {[
              { step: "01", title: "Consultation", desc: "Understanding your specific industrial requirements." },
              { step: "02", title: "Engineering", desc: "Custom design and technical planning." },
              { step: "03", title: "Implementation", desc: "Precision installation and system integration." },
              { step: "04", title: "Support", desc: "Ongoing maintenance and optimization." }
            ].map((item, i) => (
              <AnimatedElement key={i} delay={i * 150} className="bg-background pt-4">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-accent border-2 border-primary/10 flex items-center justify-center text-xl font-bold text-primary mb-6 relative z-10 shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-primary mb-3">{item.title}</h3>
                  <p className="text-sm text-foreground/60 px-4">{item.desc}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION: High Contrast --- */}
      <section className="relative py-32 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           <Image 
             src="https://static.wixstatic.com/media/5c01b6_d0eebd96b6ec4fa4a16e4b28d1ed343a~mv2.png?originWidth=1152&originHeight=640"
             alt="Industrial Pattern"
             className="w-full h-full object-cover"
             width={1200}
           />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <AnimatedElement>
            <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-8">
              Ready to Transform?
            </h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 font-light">
              Partner with Sarathi Industry India for innovative, sustainable solutions tailored to your industrial needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/contact#quote">
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-none px-12 py-8 text-xl font-bold tracking-wide shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  Request a Quote
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
              <Link to="/products">
                <Button
                  variant="outline"
                  className="border-2 border-white/20 text-white hover:bg-white hover:text-primary rounded-none px-12 py-8 text-xl font-bold tracking-wide backdrop-blur-sm transition-all duration-300"
                >
                  View Products
                </Button>
              </Link>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}