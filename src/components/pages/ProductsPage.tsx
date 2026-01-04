import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, ExternalLink, Plus, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';
import { Checkbox } from '@/components/ui/checkbox';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InquiryBasket from '@/components/InquiryBasket';
import { BaseCrudService } from '@/integrations';
import { Products } from '@/entities';
import { useInquiryStore } from '@/lib/inquiry-store';
import { useToast } from '@/hooks/use-toast';
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
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [applications, setApplications] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const { addItem } = useInquiryStore();
  const { toast } = useToast();

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

      // Extract unique industries
      const uniqueIndustries = Array.from(
        new Set(items.map((p) => p.industry).filter(Boolean))
      ) as string[];
      setIndustries(uniqueIndustries);

      // Extract unique applications
      const uniqueApplications = Array.from(
        new Set(items.map((p) => p.application).filter(Boolean))
      ) as string[];
      setApplications(uniqueApplications);
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

    // Filter by industries
    if (selectedIndustries.length > 0) {
      filtered = filtered.filter((product) =>
        selectedIndustries.includes(product.industry || '')
      );
    }

    // Filter by applications
    if (selectedApplications.length > 0) {
      filtered = filtered.filter((product) =>
        selectedApplications.includes(product.application || '')
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, selectedIndustries, selectedApplications, products]);

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry]
    );
  };

  const toggleApplication = (application: string) => {
    setSelectedApplications((prev) =>
      prev.includes(application)
        ? prev.filter((a) => a !== application)
        : [...prev, application]
    );
  };

  const handleAddToInquiry = (product: Products) => {
    addItem(product);
    toast({
      title: 'Added to Inquiry',
      description: `${product.productName} has been added to your inquiry basket.`,
      duration: 3000,
    });
  };

  const hasActiveFilters =
    searchTerm ||
    selectedCategory !== 'all' ||
    selectedIndustries.length > 0 ||
    selectedApplications.length > 0;

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

      {/* Main Content with Sidebar */}
      <section className="py-12 bg-accent border-b border-light-grey">
        <div className="max-w-[100rem] mx-auto px-8 md:px-20">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
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
            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden border-light-grey"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filter Summary */}
          <div className="flex items-center justify-between">
            <p className="font-paragraph text-base text-foreground">
              Showing {filteredProducts.length} of {products.length} products
            </p>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedIndustries([]);
                  setSelectedApplications([]);
                }}
                className="text-secondary hover:text-secondary/80"
              >
                Clear All Filters
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Products Section with Sidebar */}
      <section className="py-12 bg-background">
        <div className="max-w-[100rem] mx-auto px-8 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <motion.div
              className={`md:col-span-1 ${showFilters ? 'block' : 'hidden md:block'}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-accent border border-light-grey rounded-lg p-6 sticky top-24">
                <h3 className="text-lg font-heading font-bold text-primary mb-6">
                  Filters
                </h3>

                {/* Industry Filter */}
                {industries.length > 0 && (
                  <div className="mb-8">
                    <h4 className="font-heading font-bold text-primary mb-4 text-sm">
                      Industry
                    </h4>
                    <div className="space-y-3">
                      {industries.map((industry) => (
                        <div key={industry} className="flex items-center gap-3">
                          <Checkbox
                            id={`industry-${industry}`}
                            checked={selectedIndustries.includes(industry)}
                            onCheckedChange={() => toggleIndustry(industry)}
                          />
                          <label
                            htmlFor={`industry-${industry}`}
                            className="font-paragraph text-sm text-foreground cursor-pointer"
                          >
                            {industry}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Application Filter */}
                {applications.length > 0 && (
                  <div>
                    <h4 className="font-heading font-bold text-primary mb-4 text-sm">
                      Application
                    </h4>
                    <div className="space-y-3">
                      {applications.map((application) => (
                        <div key={application} className="flex items-center gap-3">
                          <Checkbox
                            id={`app-${application}`}
                            checked={selectedApplications.includes(application)}
                            onCheckedChange={() => toggleApplication(application)}
                          />
                          <label
                            htmlFor={`app-${application}`}
                            className="font-paragraph text-sm text-foreground cursor-pointer"
                          >
                            {application}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Products Grid */}
            <div className="md:col-span-3">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-xl font-paragraph text-foreground">
                    No products found matching your criteria.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product._id}
                      className="bg-background border border-light-grey overflow-hidden group hover:shadow-lg transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                    >
                      {/* Product Image */}
                      <div className="relative h-64 overflow-hidden bg-accent cursor-pointer">
                        <Link to={`/products/${product._id}`} className="block w-full h-full">
                          <Image
                            src={product.productImage || 'https://static.wixstatic.com/media/5c01b6_364443554ee24942a9513e4febe13818~mv2.png?originWidth=576&originHeight=384'}
                            alt={`${product.productName} - Industrial equipment`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            width={600}
                          />
                        </Link>

                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {product.category && (
                            <span className="bg-secondary text-secondary-foreground px-3 py-1 text-xs font-paragraph font-bold rounded inline-block w-fit">
                              {product.category}
                            </span>
                          )}
                          {product.isEcoFriendly && (
                            <span className="bg-green-500 text-white px-3 py-1 text-xs font-paragraph font-bold rounded inline-block w-fit flex items-center gap-1">
                              <Leaf className="w-3 h-3" />
                              Eco-Friendly
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-heading font-bold text-primary mb-2">
                          {product.productName}
                        </h3>
                        {product.modelNumber && (
                          <p className="font-paragraph text-sm text-foreground/60 mb-3">
                            Model: {product.modelNumber}
                          </p>
                        )}
                        <p className="font-paragraph text-base text-foreground mb-6 line-clamp-2">
                          {product.shortDescription}
                        </p>

                        {/* Product Meta */}
                        {(product.industry || product.application) && (
                          <div className="mb-6 space-y-1 text-xs font-paragraph text-foreground/60">
                            {product.industry && <p>Industry: {product.industry}</p>}
                            {product.application && <p>Application: {product.application}</p>}
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <Link to={`/products/${product._id}`} className="flex-1">
                            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg">
                              View Details
                            </Button>
                          </Link>
                          <Button
                            onClick={() => handleAddToInquiry(product)}
                            className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-lg"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add to Inquiry
                          </Button>
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
          </div>
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

      {/* Inquiry Basket */}
      <InquiryBasket />

      <Footer />
    </div>
  );
}
