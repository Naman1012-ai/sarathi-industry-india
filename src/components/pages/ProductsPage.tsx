import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Products } from '@/entities';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ProductsPage() {
  const [products, setProducts] = useState<Products[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { items } = await BaseCrudService.getAll<Products>('products');
      setProducts(items);
      setFilteredProducts(items);

      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(items.map((p) => p.category).filter(Boolean))
      ) as string[];
      setCategories(uniqueCategories);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://static.wixstatic.com/media/5c01b6_cced2838f2484368b3c2c68e0acad479~mv2.png?originWidth=1920&originHeight=512"
          alt="Sarathi Industry India Products - Industrial equipment and solutions"
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
            Our Products
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl font-paragraph text-primary-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Innovative solutions engineered for excellence
          </motion.p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-accent border-b border-light-grey">
        <div className="max-w-[100rem] mx-auto px-8 md:px-20">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/50" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-background border-light-grey"
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-12 bg-background border-light-grey">
                  <Filter className="w-5 h-5 mr-2" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="font-paragraph text-base text-foreground">
              Showing {filteredProducts.length} of {products.length} products
            </p>
            {(searchTerm || selectedCategory !== 'all') && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="text-secondary hover:text-secondary/80"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-[100rem] mx-auto px-8 md:px-20">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl font-paragraph text-foreground">
                No products found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  className="bg-background border border-light-grey overflow-hidden group hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                >
                  <div className="relative h-64 overflow-hidden bg-accent">
                    <Image
                      src={product.productImage || 'https://static.wixstatic.com/media/5c01b6_364443554ee24942a9513e4febe13818~mv2.png?originWidth=576&originHeight=384'}
                      alt={`${product.productName} - Industrial equipment`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      width={600}
                    />
                    {product.category && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-secondary text-secondary-foreground px-3 py-1 text-sm font-paragraph rounded">
                          {product.category}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-heading font-bold text-primary mb-3">
                      {product.productName}
                    </h3>
                    {product.modelNumber && (
                      <p className="font-paragraph text-sm text-foreground/60 mb-3">
                        Model: {product.modelNumber}
                      </p>
                    )}
                    <p className="font-paragraph text-base text-foreground mb-6 line-clamp-3">
                      {product.shortDescription}
                    </p>

                    <div className="flex gap-3">
                      <Link to={`/products/${product._id}`} className="flex-1">
                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg">
                          View Details
                        </Button>
                      </Link>
                      {product.specificationsUrl && (
                        <a
                          href={product.specificationsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-8 md:px-20 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Need a Custom Solution?
          </h2>
          <p className="text-lg md:text-xl font-paragraph mb-8 max-w-3xl mx-auto text-primary-foreground/90">
            Our team can design and manufacture tailored products to meet your specific requirements.
          </p>
          <Link to="/contact#quote">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-lg px-8 py-6 h-auto text-lg">
              Request Custom Quote
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
