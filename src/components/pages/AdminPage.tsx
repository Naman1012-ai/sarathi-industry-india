import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BaseCrudService } from '@/integrations';
import { QuoteRequests, Products } from '@/entities';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function AdminPage() {
  const [inquiries, setInquiries] = useState<QuoteRequests[]>([]);
  const [filteredInquiries, setFilteredInquiries] = useState<QuoteRequests[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<QuoteRequests | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<Products[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInquiries = async () => {
      setIsLoading(true);
      const { items } = await BaseCrudService.getAll<QuoteRequests>('quoterequests');
      setInquiries(items);
      setFilteredInquiries(items);
      setIsLoading(false);
    };
    fetchInquiries();
  }, []);

  useEffect(() => {
    let filtered = inquiries;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (inquiry) =>
          inquiry.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter((inquiry) => inquiry.status === statusFilter);
    }

    setFilteredInquiries(filtered);
  }, [searchTerm, statusFilter, inquiries]);

  const handleViewDetails = async (inquiry: QuoteRequests) => {
    setSelectedInquiry(inquiry);

    // Fetch products if there are product IDs
    if (inquiry.productIds) {
      const productIds = inquiry.productIds.split(',').map((id) => id.trim());
      const products: Products[] = [];

      for (const productId of productIds) {
        const product = await BaseCrudService.getById<Products>('products', productId);
        if (product) {
          products.push(product);
        }
      }

      setSelectedProducts(products);
    } else {
      setSelectedProducts([]);
    }
  };

  const handleStatusChange = async (inquiryId: string, newStatus: string) => {
    await BaseCrudService.update<QuoteRequests>('quoterequests', {
      _id: inquiryId,
      status: newStatus,
    });

    setInquiries((prev) =>
      prev.map((inquiry) =>
        inquiry._id === inquiryId ? { ...inquiry, status: newStatus } : inquiry
      )
    );

    toast({
      title: 'Status Updated',
      description: `Inquiry status changed to ${newStatus}`,
    });
  };

  const handleDelete = async (inquiryId: string) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      await BaseCrudService.delete('quoterequests', inquiryId);
      setInquiries((prev) => prev.filter((inquiry) => inquiry._id !== inquiryId));
      toast({
        title: 'Inquiry Deleted',
        description: 'The inquiry has been removed.',
      });
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadgeColor = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8 px-8 md:px-20">
        <h1 className="text-4xl md:text-5xl font-heading font-bold">Admin Dashboard</h1>
        <p className="font-paragraph text-primary-foreground/80 mt-2">
          Manage and track all customer inquiries
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-[100rem] mx-auto px-8 md:px-20 py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/50" />
            <Input
              type="text"
              placeholder="Search by name, email, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 bg-background border-light-grey"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-12 bg-background border-light-grey w-full md:w-48">
              <Filter className="w-5 h-5 mr-2" />
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            className="bg-accent border border-light-grey p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-paragraph text-sm text-foreground/60">Total Inquiries</p>
            <p className="text-3xl font-heading font-bold text-primary mt-2">{inquiries.length}</p>
          </motion.div>

          <motion.div
            className="bg-accent border border-light-grey p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="font-paragraph text-sm text-foreground/60">Pending</p>
            <p className="text-3xl font-heading font-bold text-yellow-600 mt-2">
              {inquiries.filter((i) => i.status === 'pending').length}
            </p>
          </motion.div>

          <motion.div
            className="bg-accent border border-light-grey p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="font-paragraph text-sm text-foreground/60">In Progress</p>
            <p className="text-3xl font-heading font-bold text-blue-600 mt-2">
              {inquiries.filter((i) => i.status === 'in-progress').length}
            </p>
          </motion.div>

          <motion.div
            className="bg-accent border border-light-grey p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="font-paragraph text-sm text-foreground/60">Completed</p>
            <p className="text-3xl font-heading font-bold text-green-600 mt-2">
              {inquiries.filter((i) => i.status === 'completed').length}
            </p>
          </motion.div>
        </div>

        {/* Table */}
        <motion.div
          className="bg-background border border-light-grey rounded-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {isLoading ? (
            <div className="p-12 text-center">
              <p className="font-paragraph text-foreground">Loading inquiries...</p>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="p-12 text-center">
              <p className="font-paragraph text-foreground">No inquiries found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-accent border-b border-light-grey">
                  <tr>
                    <th className="px-6 py-4 text-left font-heading font-bold text-primary">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left font-heading font-bold text-primary">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left font-heading font-bold text-primary">
                      Company
                    </th>
                    <th className="px-6 py-4 text-left font-heading font-bold text-primary">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left font-heading font-bold text-primary">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left font-heading font-bold text-primary">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInquiries.map((inquiry, index) => (
                    <motion.tr
                      key={inquiry._id}
                      className="border-b border-light-grey hover:bg-accent transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="px-6 py-4 font-paragraph text-foreground">
                        {inquiry.customerName}
                      </td>
                      <td className="px-6 py-4 font-paragraph text-foreground text-sm">
                        {inquiry.email}
                      </td>
                      <td className="px-6 py-4 font-paragraph text-foreground text-sm">
                        {inquiry.companyName || '-'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(inquiry.status)}
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadgeColor(
                              inquiry.status
                            )}`}
                          >
                            {inquiry.status || 'pending'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-paragraph text-foreground text-sm">
                        {inquiry.submissionDate
                          ? new Date(inquiry.submissionDate).toLocaleDateString()
                          : '-'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDetails(inquiry)}
                            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(inquiry._id)}
                            className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>

      {/* Details Dialog */}
      <Dialog open={!!selectedInquiry} onOpenChange={() => setSelectedInquiry(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
            <DialogDescription>View and manage inquiry information</DialogDescription>
          </DialogHeader>

          {selectedInquiry && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="font-heading font-bold text-primary mb-4">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-paragraph text-sm text-foreground/60">Name</p>
                    <p className="font-paragraph font-bold text-foreground">
                      {selectedInquiry.customerName}
                    </p>
                  </div>
                  <div>
                    <p className="font-paragraph text-sm text-foreground/60">Email</p>
                    <p className="font-paragraph font-bold text-foreground">{selectedInquiry.email}</p>
                  </div>
                  <div>
                    <p className="font-paragraph text-sm text-foreground/60">Phone</p>
                    <p className="font-paragraph font-bold text-foreground">
                      {selectedInquiry.phoneNumber}
                    </p>
                  </div>
                  <div>
                    <p className="font-paragraph text-sm text-foreground/60">Company</p>
                    <p className="font-paragraph font-bold text-foreground">
                      {selectedInquiry.companyName || '-'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Request Details */}
              <div>
                <h3 className="font-heading font-bold text-primary mb-4">Request Details</h3>
                <p className="font-paragraph text-foreground whitespace-pre-wrap">
                  {selectedInquiry.requestDetails}
                </p>
              </div>

              {/* Products */}
              {selectedProducts.length > 0 && (
                <div>
                  <h3 className="font-heading font-bold text-primary mb-4">
                    Requested Products ({selectedProducts.length})
                  </h3>
                  <div className="space-y-3">
                    {selectedProducts.map((product) => (
                      <div
                        key={product._id}
                        className="p-4 bg-accent border border-light-grey rounded-lg"
                      >
                        <p className="font-heading font-bold text-primary">{product.productName}</p>
                        <p className="font-paragraph text-sm text-foreground/60 mt-1">
                          {product.shortDescription}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Status Update */}
              <div>
                <h3 className="font-heading font-bold text-primary mb-4">Update Status</h3>
                <Select
                  value={selectedInquiry.status || 'pending'}
                  onValueChange={(newStatus) => {
                    handleStatusChange(selectedInquiry._id, newStatus);
                    setSelectedInquiry({ ...selectedInquiry, status: newStatus });
                  }}
                >
                  <SelectTrigger className="bg-background border-light-grey">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Metadata */}
              <div className="text-xs text-foreground/60 space-y-1 pt-4 border-t border-light-grey">
                <p>
                  Submitted:{' '}
                  {selectedInquiry.submissionDate
                    ? new Date(selectedInquiry.submissionDate).toLocaleString()
                    : '-'}
                </p>
                <p>ID: {selectedInquiry._id}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
