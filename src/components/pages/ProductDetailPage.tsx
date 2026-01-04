import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Package, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Products } from '@/entities';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Products | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Products[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      const fetchedProduct = await BaseCrudService.getById<Products>('products', id);
      setProduct(fetchedProduct);

      // Fetch related products from same category
      if (fetchedProduct?.category) {
        const { items } = await BaseCrudService.getAll<Products>('products');
        const related = items
          .filter((p) => p.category === fetchedProduct.category && p._id !== id)
          .slice(0, 3);
        setRelatedProducts(related);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-xl font-paragraph text-foreground">Loading product details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <section className="py-8 bg-accent border-b border-light-grey">
        <div className="max-w-[100rem] mx-auto px-8 md:px-20">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 font-paragraph text-base text-foreground hover:text-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-16 bg-background">
        <div className="max-w-[100rem] mx-auto px-8 md:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Product Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-[600px] bg-accent border border-light-grey overflow-hidden">
                <Image
                  src={product.productImage || 'https://static.wixstatic.com/media/5c01b6_05b9b5f749634292b49ed577a926b485~mv2.png?originWidth=768&originHeight=576'}
                  alt={`${product.productName} - Detailed view`}
                  className="w-full h-full object-cover"
                  width={800}
                />
              </div>
              {product.category && (
                <div className="absolute top-6 left-6">
                  <span className="bg-secondary text-secondary-foreground px-4 py-2 text-base font-paragraph rounded">
                    {product.category}
                  </span>
                </div>
              )}
            </motion.div>

            {/* Product Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
                {product.productName}
              </h1>

              {product.modelNumber && (
                <div className="flex items-center gap-2 mb-6">
                  <Package className="w-5 h-5 text-foreground/60" />
                  <p className="font-paragraph text-lg text-foreground/60">
                    Model: {product.modelNumber}
                  </p>
                </div>
              )}

              <div className="border-t border-light-grey pt-6 mb-8">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  Product Overview
                </h2>
                <p className="font-paragraph text-lg text-foreground mb-6">
                  {product.shortDescription}
                </p>
              </div>

              {product.longDescription && (
                <div className="border-t border-light-grey pt-6 mb-8">
                  <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                    Detailed Description
                  </h2>
                  <p className="font-paragraph text-base text-foreground whitespace-pre-line">
                    {product.longDescription}
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to="/contact#quote" className="flex-1">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-4 h-auto text-lg">
                    Request Quote
                  </Button>
                </Link>
                {product.specificationsUrl && (
                  <a
                    href={product.specificationsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg px-6 py-4 h-auto text-lg"
                    >
                      <FileText className="w-5 h-5 mr-2" />
                      View Specifications
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-24 bg-accent">
          <div className="max-w-[100rem] mx-auto px-8 md:px-20">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-12">
              Related Products
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct._id}
                  className="bg-background border border-light-grey overflow-hidden group hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="relative h-48 overflow-hidden bg-accent">
                    <Image
                      src={relatedProduct.productImage || 'https://static.wixstatic.com/media/5c01b6_a82e192276eb49e5b55e6ebc69177b18~mv2.png?originWidth=384&originHeight=192'}
                      alt={`${relatedProduct.productName} - Related product`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      width={400}
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold text-primary mb-3">
                      {relatedProduct.productName}
                    </h3>
                    <p className="font-paragraph text-sm text-foreground mb-4 line-clamp-2">
                      {relatedProduct.shortDescription}
                    </p>
                    <Link to={`/products/${relatedProduct._id}`}>
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg"
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
