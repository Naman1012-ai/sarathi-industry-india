import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useInquiryStore } from '@/lib/inquiry-store';
import { useState } from 'react';
import { Image } from '@/components/ui/image';

export default function InquiryBasket() {
  const { items, removeItem, clearItems } = useInquiryStore();
  const [isOpen, setIsOpen] = useState(false);

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-40 bg-secondary text-secondary-foreground rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {items.length}
          </span>
        </div>
      </motion.button>

      {/* Basket Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-light-grey">
                <h2 className="text-2xl font-heading font-bold text-primary">
                  Inquiry Basket
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-accent rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.map((item) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex gap-4 p-4 bg-accent rounded-lg border border-light-grey"
                  >
                    {/* Product Image */}
                    {item.productImage && (
                      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-background">
                        <Image src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                      </div>
                    )}

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-bold text-primary text-sm line-clamp-2">
                        {item.productName}
                      </h3>
                      {item.modelNumber && (
                        <p className="text-xs text-foreground/60 mt-1">
                          Model: {item.modelNumber}
                        </p>
                      )}
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item._id)}
                      className="p-2 hover:bg-background rounded transition-colors flex-shrink-0"
                    >
                      <X className="w-4 h-4 text-foreground/60" />
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-light-grey p-6 space-y-3">
                <p className="text-sm font-paragraph text-foreground/60">
                  {items.length} product{items.length !== 1 ? 's' : ''} selected
                </p>
                <Link to="/contact#quote" className="w-full block">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg">
                    Send Inquiry
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => {
                    clearItems();
                    setIsOpen(false);
                  }}
                  className="w-full border-light-grey text-foreground hover:bg-accent rounded-lg"
                >
                  Clear All
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
