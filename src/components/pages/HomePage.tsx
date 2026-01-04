import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle, Award, TrendingUp, Users, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { BusinessDivisions, Products } from '@/entities';

export default function HomePage() {
  const [products, setProducts] = useState<Products[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Products | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  useEffect(() => {
    const fetchProducts = async () => {
      const { items } = await BaseCrudService.getAll<Products>('products');
      setProducts(items.slice(0, 4));
      if (items.length > 0) {
        setSelectedProduct(items[0]);
      }
    };
    fetchProducts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  } as const;

  const industries = [
    { name: 'Distillery', icon: '🏭' },
    { name: 'Food & Beverage', icon: '🍽️' },
    { name: 'Sugar Mills', icon: '🌾' },
    { name: 'Dairy Industry', icon: '🥛' },
    { name: 'Hospitality', icon: '🏨' },
    { name: 'Municipal', icon: '🏛️' },
  ];

  const whyChooseUs = [
    {
      title: 'Trusted Provider',
      description: '25+ years of proven expertise serving 1000+ satisfied customers across India',
      icon: Award,
    },
    {
      title: 'Cost-Effective',
      description: 'Optimized solutions that reduce operational costs while maximizing efficiency',
      icon: TrendingUp,
    },
    {
      title: 'Technical Expertise',
      description: 'Dedicated team of engineers and specialists with deep industry knowledge',
      icon: Users,
    },
    {
      title: 'Reliable Performance',
      description: '24/7 support and maintenance ensuring uninterrupted operations',
      icon: ShieldCheck,
    },
  ];

  const stats = [
    { value: '25+', label: 'Years of Experience' },
    { value: '1000+', label: 'Satisfied Customers' },
    { value: '14', label: 'Industries Served' },
    { value: '22', label: 'Cities Across India' },
  ];

  const productBenefits = [
    'Advanced Technology',
    'Energy Efficient',
    'Cost Effective',
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ===== HERO SECTION: Split Layout with Parallax ===== */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center overflow-hidden"
      >
        {/* Parallax Background */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://static.wixstatic.com/media/5c01b6_48bc78ac9b0b4974815c15e9e4bdbe69~mv2.png?originWidth=576&originHeight=448"
            alt="Industrial facility background"
            className="w-full h-full object-cover"
            width={1920}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-[120rem] mx-auto px-8 md:px-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl font-heading font-bold text-primary-foreground mb-6 leading-tight"
              >
                Innovating Sustainable Solutions
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl font-paragraph text-primary-foreground/90 mb-8 max-w-2xl"
              >
                Transforming industrial processes through cutting-edge water treatment, bio-waste management, and biogas technology.
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/contact#quote">
                  <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-lg px-8 py-6 h-auto text-lg font-paragraph font-bold">
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/products">
                  <Button
                    variant="outline"
                    className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-lg px-8 py-6 h-auto text-lg font-paragraph font-bold"
                  >
                    Explore Solutions
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative h-[500px] hidden lg:block"
            >
              <Image
                src="https://static.wixstatic.com/media/5c01b6_76e3ff8c52564e77a43ba8eb776967ce~mv2.png?originWidth=576&originHeight=448"
                alt="Sarathi solutions showcase"
                className="w-full h-full object-cover rounded-lg"
                width={600}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== PRODUCT PREVIEW: 4-Card Grid with Quick View ===== */}
      <section className="py-24 bg-accent">
        <div className="max-w-[100rem] mx-auto px-8 md:px-20">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              Featured Products
            </h2>
            <p className="text-lg md:text-xl font-paragraph text-foreground max-w-3xl mx-auto">
              Discover our range of bioculture and industrial solutions
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {products.map((product) => (
              <motion.div
                key={product._id}
                variants={itemVariants}
                className="bg-background border border-light-grey overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative h-48 overflow-hidden bg-primary/10">
                  <Image
                    src={product.productImage || 'https://static.wixstatic.com/media/5c01b6_e2986c2a822747459ec7debd45b95c6b~mv2.png?originWidth=384&originHeight=192'}
                    alt={product.productName || 'Product'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    width={400}
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-paragraph font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Quick View
                    </motion.button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-heading font-bold text-primary mb-3 line-clamp-2">
                    {product.productName}
                  </h3>
                  <div className="space-y-2">
                    {productBenefits.map((benefit) => (
                      <div key={benefit} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                        <span className="font-paragraph text-sm text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/products">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-8 py-4 h-auto text-lg">
                View All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== EXPERTISE SECTION with Bento Grid ===== */}
      <section className="py-24 bg-background">
        <div className="max-w-[100rem] mx-auto px-8 md:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
                Our Expertise
              </h2>
              <p className="font-paragraph text-lg text-foreground mb-6 leading-relaxed">
                Transforming wastewater treatment, bio-waste management, and biogas production into sustainable competitive advantages. Our integrated solutions combine advanced technology with proven methodologies to deliver measurable results across diverse industrial sectors.
              </p>
              <p className="font-paragraph text-lg text-foreground leading-relaxed">
                With decades of experience and continuous innovation, we've established ourselves as the go-to partner for industries seeking reliable, cost-effective, and environmentally responsible solutions.
              </p>
            </motion.div>

            {/* Bento Grid - Industries */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {industries.map((industry) => (
                <motion.div
                  key={industry.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 bg-accent border border-light-grey rounded-lg cursor-pointer transition-all hover:shadow-lg hover:border-secondary"
                >
                  <div className="text-4xl mb-3">{industry.icon}</div>
                  <h3 className="font-heading font-bold text-primary text-lg">{industry.name}</h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US SECTION ===== */}
      <section className="py-24 bg-accent">
        <div className="max-w-[100rem] mx-auto px-8 md:px-20">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              Why Choose Sarathi
            </h2>
            <p className="text-lg md:text-xl font-paragraph text-foreground max-w-3xl mx-auto">
              Industry-leading solutions backed by expertise, reliability, and commitment to your success
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {whyChooseUs.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="p-8 bg-background border border-light-grey hover:shadow-lg transition-all"
                >
                  <Icon className="w-12 h-12 text-secondary mb-4" />
                  <h3 className="text-xl font-heading font-bold text-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="font-paragraph text-base text-foreground">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== STATS COUNTER: Full-Width Dark Section ===== */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-8 md:px-20">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <motion.div
                  className="text-5xl md:text-6xl font-heading font-bold mb-3"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  {stat.value}
                </motion.div>
                <p className="font-paragraph text-lg text-primary-foreground/80">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 bg-background">
        <div className="max-w-[100rem] mx-auto px-8 md:px-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              Ready to Transform Your Operations?
            </h2>
            <p className="text-lg md:text-xl font-paragraph text-foreground mb-8 max-w-3xl mx-auto">
              Partner with Sarathi Industry India for innovative, sustainable solutions tailored to your industrial needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact#quote">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-8 py-6 h-auto text-lg">
                  Request a Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg px-8 py-6 h-auto text-lg"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
