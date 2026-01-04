import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { QuoteRequests } from '@/entities';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    requestDetails: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Scroll to quote form if hash is present
    if (window.location.hash === '#quote') {
      setTimeout(() => {
        const quoteSection = document.getElementById('quote');
        if (quoteSection) {
          quoteSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const quoteRequest: QuoteRequests = {
      _id: crypto.randomUUID(),
      customerName: formData.customerName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      companyName: formData.companyName,
      requestDetails: formData.requestDetails,
      submissionDate: new Date().toISOString(),
    };

    await BaseCrudService.create('quoterequests', quoteRequest);

    toast({
      title: 'Quote Request Submitted',
      description: 'Thank you! We will get back to you within 24 hours.',
    });

    setFormData({
      customerName: '',
      email: '',
      phoneNumber: '',
      companyName: '',
      requestDetails: '',
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['Industrial Area, Sector 42', 'Gurgaon, Haryana 122003', 'India'],
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 124 456 7890', '+91 124 456 7891', 'Mon-Sat: 9:00 AM - 6:00 PM'],
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@sarathiindustry.com', 'sales@sarathiindustry.com', 'support@sarathiindustry.com'],
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 2:00 PM', 'Sunday: Closed'],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=contact-hero-image"
          alt="Contact Sarathi Industry India - Get in touch with our team"
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
            Contact Us
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl font-paragraph text-primary-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Let's discuss how we can help transform your operations
          </motion.p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-24 bg-background">
        <div className="max-w-[100rem] mx-auto px-8 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  className="p-8 bg-accent border border-light-grey text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-primary mb-4">
                    {info.title}
                  </h3>
                  <div className="space-y-2">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="font-paragraph text-base text-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote Request Form */}
      <section id="quote" className="py-24 bg-accent scroll-mt-20">
        <div className="max-w-[100rem] mx-auto px-8 md:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
                Request a Quote
              </h2>
              <p className="font-paragraph text-lg text-foreground mb-8">
                Fill out the form below and our team will get back to you within 24 hours with a customized solution for your needs.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="customerName" className="block font-paragraph text-base text-foreground mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="customerName"
                    name="customerName"
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={handleChange}
                    className="h-12 bg-background border-light-grey"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-paragraph text-base text-foreground mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="h-12 bg-background border-light-grey"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block font-paragraph text-base text-foreground mb-2">
                    Phone Number *
                  </label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="h-12 bg-background border-light-grey"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label htmlFor="companyName" className="block font-paragraph text-base text-foreground mb-2">
                    Company Name
                  </label>
                  <Input
                    id="companyName"
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="h-12 bg-background border-light-grey"
                    placeholder="Your Company Ltd."
                  />
                </div>

                <div>
                  <label htmlFor="requestDetails" className="block font-paragraph text-base text-foreground mb-2">
                    Request Details *
                  </label>
                  <Textarea
                    id="requestDetails"
                    name="requestDetails"
                    required
                    value={formData.requestDetails}
                    onChange={handleChange}
                    className="min-h-[150px] bg-background border-light-grey"
                    placeholder="Please describe your requirements, project scope, or any specific questions you have..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-4 h-auto text-lg"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  <Send className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </motion.div>

            {/* Image & Additional Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-[400px] bg-background border border-light-grey overflow-hidden">
                <Image
                  src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=contact-form-image"
                  alt="Sarathi Industry India - Expert team ready to assist"
                  className="w-full h-full object-cover"
                  width={800}
                />
              </div>

              <div className="p-8 bg-primary text-primary-foreground">
                <h3 className="text-2xl font-heading font-bold mb-4">
                  Why Choose Us?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <span className="font-paragraph text-base">
                      30+ years of industry experience
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <span className="font-paragraph text-base">
                      Customized solutions for every client
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <span className="font-paragraph text-base">
                      24/7 technical support
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <span className="font-paragraph text-base">
                      Nationwide service network
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <span className="font-paragraph text-base">
                      Competitive pricing and flexible terms
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-background">
        <div className="max-w-[100rem] mx-auto px-8 md:px-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              Find Us
            </h2>
            <p className="text-lg md:text-xl font-paragraph text-foreground max-w-3xl mx-auto">
              Visit our facility in Gurgaon, Haryana
            </p>
          </div>

          <div className="relative h-[500px] bg-accent border border-light-grey overflow-hidden">
            <Image
              src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=contact-map-placeholder"
              alt="Map showing Sarathi Industry India location in Gurgaon"
              className="w-full h-full object-cover"
              width={1600}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
              <div className="bg-background p-8 border border-light-grey text-center max-w-md">
                <MapPin className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="text-2xl font-heading font-bold text-primary mb-3">
                  Our Location
                </h3>
                <p className="font-paragraph text-base text-foreground">
                  Industrial Area, Sector 42<br />
                  Gurgaon, Haryana 122003<br />
                  India
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
