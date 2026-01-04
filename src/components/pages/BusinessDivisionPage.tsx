import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { BusinessDivisions, Products } from '@/entities';

export default function BusinessDivisionPage() {
  const { slug } = useParams<{ slug: string }>();
  const [division, setDivision] = useState<BusinessDivisions | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Products[]>([]);

  useEffect(() => {
    const fetchDivision = async () => {
      if (!slug) return;
      const { items } = await BaseCrudService.getAll<BusinessDivisions>('businessdivisions');
      const foundDivision = items.find((d) => d.slug === slug);
      setDivision(foundDivision || null);

      // Fetch related products
      if (foundDivision) {
        const { items: products } = await BaseCrudService.getAll<Products>('products');
        // Filter products by category matching division name or slug
        const related = products.filter((p) => 
          p.category?.toLowerCase().includes(foundDivision.divisionName?.toLowerCase() || '') ||
          p.category?.toLowerCase().includes(slug.toLowerCase())
        ).slice(0, 6);
        setRelatedProducts(related);
      }
    };
    fetchDivision();
  }, [slug]);

  if (!division) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-xl font-paragraph text-foreground">Loading division details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const benefits = [
    'Advanced technology and proven solutions',
    'Customized systems for specific requirements',
    'Energy-efficient and cost-effective operations',
    'Comprehensive after-sales support',
    'Compliance with environmental regulations',
    'Scalable solutions for future growth',
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <section className="py-8 bg-accent border-b border-light-grey">
        <div className="max-w-[100rem] mx-auto px-8 md:px-20">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-paragraph text-base text-foreground hover:text-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src={division.divisionImage || 'https://static.wixstatic.com/media/5c01b6_3f86047b02d142a5bca096ecc33042d4~mv2.png?originWidth=1920&originHeight=704'}
          alt={`${division.divisionName} - Business division overview`}
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
            {division.divisionName}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl font-paragraph text-primary-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {division.shortDescription}
          </motion.p>
        </div>
      </section>

      {/* Division Overview */}
      <section className="py-24 bg-background">
        <div className="max-w-[100rem] mx-auto px-8 md:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
                About This Division
              </h2>
              <p className="font-paragraph text-lg text-foreground mb-8 whitespace-pre-line">
                {division.longDescription || division.shortDescription}
              </p>
              {division.callToActionUrl && (
                <a href={division.callToActionUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-8 py-4 h-auto text-lg">
                    Learn More
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
              )}
            </motion.div>

            <motion.div
              className="relative h-[500px]"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={division.divisionImage || 'https://static.wixstatic.com/media/5c01b6_bb092da59d634c3c8abb319e6d0c68e1~mv2.png?originWidth=768&originHeight=448'}
                alt={`${division.divisionName} - Detailed view`}
                className="w-full h-full object-cover border border-light-grey"
                width={800}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-24 bg-accent">
        <div className="max-w-[100rem] mx-auto px-8 md:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              Key Benefits
            </h2>
            <p className="text-lg md:text-xl font-paragraph text-foreground max-w-3xl mx-auto">
              Why choose our {division.divisionName?.toLowerCase()} solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 p-6 bg-background border border-light-grey"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <p className="font-paragraph text-base text-foreground">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-8 md:px-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
                Featured Products
              </h2>
              <p className="text-lg md:text-xl font-paragraph text-foreground max-w-3xl mx-auto">
                Explore our range of products in this division
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  className="bg-background border border-light-grey overflow-hidden group hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="relative h-56 overflow-hidden bg-accent">
                    <Image
                      src={product.productImage || 'https://static.wixstatic.com/media/5c01b6_3eb06d12b804443c95e3adf72987905d~mv2.png?originWidth=576&originHeight=320'}
                      alt={`${product.productName} - Product image`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      width={600}
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold text-primary mb-3">
                      {product.productName}
                    </h3>
                    <p className="font-paragraph text-sm text-foreground mb-4 line-clamp-2">
                      {product.shortDescription}
                    </p>
                    <Link to={`/products/${product._id}`}>
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/products">
                <Button
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg px-8 py-4 h-auto text-lg"
                >
                  View All Products
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-8 md:px-20 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Interested in Our {division.divisionName}?
          </h2>
          <p className="text-lg md:text-xl font-paragraph mb-8 max-w-3xl mx-auto text-primary-foreground/90">
            Get in touch with our experts to discuss how we can help transform your operations.
          </p>
          <Link to="/contact#quote">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-lg px-8 py-6 h-auto text-lg">
              Request a Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
