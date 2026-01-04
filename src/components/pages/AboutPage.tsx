import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Eye, Award, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { BusinessDivisions } from '@/entities';

export default function AboutPage() {
  const [divisions, setDivisions] = useState<BusinessDivisions[]>([]);

  useEffect(() => {
    const fetchDivisions = async () => {
      const { items } = await BaseCrudService.getAll<BusinessDivisions>('businessdivisions');
      setDivisions(items.filter((d) => d.isActive));
    };
    fetchDivisions();
  }, []);

  const milestones = [
    { year: '1995', title: 'Company Founded', description: 'Established with a vision to revolutionize industrial solutions' },
    { year: '2005', title: 'National Expansion', description: 'Extended operations across major industrial hubs in India' },
    { year: '2015', title: 'Innovation Award', description: 'Recognized for breakthrough biogas technology' },
    { year: '2025', title: 'Sustainability Leader', description: 'Leading provider of eco-friendly industrial solutions' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://static.wixstatic.com/media/5c01b6_8cbb57d292b14250b44ff0d65a744f32~mv2.png?originWidth=1920&originHeight=704"
          alt="About Sarathi Industry India - Our facility and team"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
        />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative z-10 text-center px-8">
          <motion.h1
            className="text-5xl md:text-7xl font-heading font-bold text-primary-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About Sarathi Industry India
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl font-paragraph text-primary-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Three decades of excellence in sustainable industrial solutions
          </motion.p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24 bg-background">
        <div className="max-w-[100rem] mx-auto px-8 md:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
                Our Story
              </h2>
              <div className="space-y-6">
                <p className="font-paragraph text-lg text-foreground">
                  Founded in 1995, Sarathi Industry India emerged from a vision to transform India's industrial landscape through sustainable and innovative solutions. What began as a small enterprise has grown into a trusted leader in water treatment, bio-waste management, and biogas technology.
                </p>
                <p className="font-paragraph text-lg text-foreground">
                  Our journey has been marked by continuous innovation, unwavering commitment to quality, and a deep understanding of our clients' evolving needs. We've partnered with industries across agriculture, food processing, dairy, municipal corporations, hospitality, and healthcare sectors.
                </p>
                <p className="font-paragraph text-lg text-foreground">
                  Today, we stand as a testament to the power of engineering excellence combined with environmental responsibility, serving clients nationwide with cutting-edge solutions that drive both profitability and sustainability.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://static.wixstatic.com/media/5c01b6_92a95e7487aa4450829f3a68c574bb80~mv2.png?originWidth=768&originHeight=448"
                alt="Sarathi Industry India company history and growth"
                className="w-full h-[500px] object-cover"
                width={800}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-accent">
        <div className="max-w-[100rem] mx-auto px-8 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              className="p-12 bg-background border border-light-grey"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Target className="w-16 h-16 text-secondary mb-6" />
              <h3 className="text-3xl font-heading font-bold text-primary mb-6">
                Our Mission
              </h3>
              <p className="font-paragraph text-lg text-foreground">
                To deliver innovative, sustainable, and cost-effective industrial solutions that empower our clients to achieve operational excellence while minimizing environmental impact. We are committed to being the trusted partner for industries seeking transformative technology and reliable service.
              </p>
            </motion.div>

            <motion.div
              className="p-12 bg-background border border-light-grey"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Eye className="w-16 h-16 text-secondary mb-6" />
              <h3 className="text-3xl font-heading font-bold text-primary mb-6">
                Our Vision
              </h3>
              <p className="font-paragraph text-lg text-foreground">
                To be India's most respected and innovative provider of sustainable industrial solutions, setting new standards in water treatment, bio-waste management, and renewable energy. We envision a future where industrial growth and environmental stewardship go hand in hand.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-24 bg-background">
        <div className="max-w-[100rem] mx-auto px-8 md:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              Our Journey
            </h2>
            <p className="text-lg md:text-xl font-paragraph text-foreground max-w-3xl mx-auto">
              Key milestones that shaped our path to becoming industry leaders
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-heading font-bold text-secondary-foreground">
                    {milestone.year}
                  </span>
                </div>
                <h3 className="text-xl font-heading font-bold text-primary mb-3">
                  {milestone.title}
                </h3>
                <p className="font-paragraph text-base text-foreground">
                  {milestone.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Divisions Overview */}
      <section className="py-24 bg-accent">
        <div className="max-w-[100rem] mx-auto px-8 md:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              Our Business Divisions
            </h2>
            <p className="text-lg md:text-xl font-paragraph text-foreground max-w-3xl mx-auto">
              Comprehensive solutions across three specialized areas
            </p>
          </div>

          <div className="space-y-8">
            {divisions.map((division, index) => (
              <motion.div
                key={division._id}
                className="bg-background border border-light-grey overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                  <div className={`relative h-80 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <Image
                      src={division.divisionImage || 'https://static.wixstatic.com/media/5c01b6_b3ba739628724d518fb9cbccd80aa448~mv2.png?originWidth=768&originHeight=320'}
                      alt={`${division.divisionName} division`}
                      className="w-full h-full object-cover"
                      width={800}
                    />
                  </div>
                  <div className="p-12 flex flex-col justify-center">
                    <h3 className="text-3xl font-heading font-bold text-primary mb-4">
                      {division.divisionName}
                    </h3>
                    <p className="font-paragraph text-lg text-foreground mb-6">
                      {division.longDescription || division.shortDescription}
                    </p>
                    <Link to={`/business/${division.slug}`}>
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 h-auto w-fit">
                        Explore Division
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-8 md:px-20 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Partner With Us
          </h2>
          <p className="text-lg md:text-xl font-paragraph mb-8 max-w-3xl mx-auto text-primary-foreground/90">
            Experience the Sarathi Industry India difference. Let's build a sustainable future together.
          </p>
          <Link to="/contact#quote">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-lg px-8 py-6 h-auto text-lg">
              Get in Touch
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
