import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2, Loader2, Eye } from 'lucide-react';
import { useOrders, useUpdateOrderStatus, useUpdatePaymentStatus, useDeleteOrder } from '@/hooks/useOrders';
import { toast } from 'sonner';
import { format } from 'date-fns';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-green-100 text-green-700',
  processing: 'bg-blue-100 text-blue-700',
  completed: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',
};

const paymentStatusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  paid: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
  refunded: 'bg-gray-100 text-gray-700',
};

const OrdersAdmin = () => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  
  const { data: orders, isLoading } = useOrders(statusFilter === 'all' ? undefined : statusFilter);
  const updateStatusMutation = useUpdateOrderStatus();
  const updatePaymentMutation = useUpdatePaymentStatus();
  const deleteMutation = useDeleteOrder();

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      await updateStatusMutation.mutateAsync({ id: orderId, status });
      toast.success('Order status updated');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handlePaymentStatusChange = async (orderId: string, payment_status: string) => {
    try {
      await updatePaymentMutation.mutateAsync({ id: orderId, payment_status });
      toast.success('Payment status updated');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteMutation.mutateAsync(id);
        toast.success('Order deleted successfully');
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Orders</h1>
            <p className="text-muted-foreground">Manage customer orders</p>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin" /></div>
            ) : orders && orders.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Order Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{format(new Date(order.created_at), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.customer_name}</p>
                          <p className="text-sm text-muted-foreground">{order.customer_email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">${Number(order.total_amount).toFixed(2)}</TableCell>
                      <TableCell>
                        <Select value={order.status} onValueChange={(value) => handleStatusChange(order.id, value)}>
                          <SelectTrigger className="w-[130px]">
                            <Badge className={statusColors[order.status] || 'bg-gray-100'}>{order.status}</Badge>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Select value={order.payment_status} onValueChange={(value) => handlePaymentStatusChange(order.id, value)}>
                          <SelectTrigger className="w-[120px]">
                            <Badge className={paymentStatusColors[order.payment_status] || 'bg-gray-100'}>{order.payment_status}</Badge>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                            <SelectItem value="refunded">Refunded</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(order)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(order.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">No orders found</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-medium">{selectedOrder.customer_name}</p>
                  <p className="text-sm">{selectedOrder.customer_email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p className="font-medium">{format(new Date(selectedOrder.created_at), 'PPpp')}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Items</p>
                <div className="border rounded-lg divide-y">
                  {Array.isArray(selectedOrder.items) && selectedOrder.items.map((item: any, i: number) => (
                    <div key={i} className="p-3 flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">${item.denomination} × {item.quantity}</p>
                      </div>
                      <p className="font-medium">${(item.denomination * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between pt-4 border-t">
                <span className="font-medium">Total</span>
                <span className="text-xl font-bold">${Number(selectedOrder.total_amount).toFixed(2)}</span>
              </div>
              {selectedOrder.notes && (
                <div>
                  <p className="text-sm text-muted-foreground">Notes</p>
                  <p>{selectedOrder.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default OrdersAdmin;
