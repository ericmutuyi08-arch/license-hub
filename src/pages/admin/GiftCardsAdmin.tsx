import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { useGiftCards, useCreateGiftCard, useUpdateGiftCard, useDeleteGiftCard } from '@/hooks/useGiftCards';
import { useCategories } from '@/hooks/useCategories';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const GiftCardsAdmin = () => {
  const { data: giftCards, isLoading } = useGiftCards();
  const { data: categories } = useCategories();
  const createMutation = useCreateGiftCard();
  const updateMutation = useUpdateGiftCard();
  const deleteMutation = useDeleteGiftCard();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    brand: '',
    category: '',
    description: '',
    image: '',
    denominations: '',
    delivery_options: 'digital',
    popularity: 50,
    in_stock: true,
    featured: false,
    discount: '',
  });

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      brand: '',
      category: '',
      description: '',
      image: '',
      denominations: '',
      delivery_options: 'digital',
      popularity: 50,
      in_stock: true,
      featured: false,
      discount: '',
    });
    setEditingCard(null);
  };

  const handleEdit = (card: any) => {
    setEditingCard(card);
    setFormData({
      name: card.name,
      slug: card.slug,
      brand: card.brand,
      category: card.category,
      description: card.description || '',
      image: card.image || '',
      denominations: card.denominations.join(', '),
      delivery_options: card.delivery_options.join(', '),
      popularity: card.popularity,
      in_stock: card.in_stock,
      featured: card.featured,
      discount: card.discount?.toString() || '',
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      name: formData.name,
      slug: formData.slug,
      brand: formData.brand,
      category: formData.category,
      description: formData.description || null,
      image: formData.image || null,
      denominations: formData.denominations.split(',').map(d => parseInt(d.trim())).filter(d => !isNaN(d)),
      delivery_options: formData.delivery_options.split(',').map(d => d.trim()),
      popularity: formData.popularity,
      in_stock: formData.in_stock,
      featured: formData.featured,
      discount: formData.discount ? parseInt(formData.discount) : null,
    };

    try {
      if (editingCard) {
        await updateMutation.mutateAsync({ id: editingCard.id, updates: data });
        toast.success('Gift card updated successfully');
      } else {
        await createMutation.mutateAsync(data);
        toast.success('Gift card created successfully');
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this gift card?')) {
      try {
        await deleteMutation.mutateAsync(id);
        toast.success('Gift card deleted successfully');
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
            <h1 className="text-3xl font-bold">Gift Cards</h1>
            <p className="text-muted-foreground">Manage your gift card catalog</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" /> Add Gift Card</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingCard ? 'Edit Gift Card' : 'Add New Gift Card'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input id="slug" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Input id="brand" value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                      <SelectContent>
                        {categories?.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input id="image" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="https://..." />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="denominations">Denominations (comma separated)</Label>
                    <Input id="denominations" value={formData.denominations} onChange={(e) => setFormData({ ...formData, denominations: e.target.value })} placeholder="25, 50, 100" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="delivery_options">Delivery Options (comma separated)</Label>
                    <Input id="delivery_options" value={formData.delivery_options} onChange={(e) => setFormData({ ...formData, delivery_options: e.target.value })} placeholder="digital, physical" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="popularity">Popularity (0-100)</Label>
                    <Input id="popularity" type="number" min="0" max="100" value={formData.popularity} onChange={(e) => setFormData({ ...formData, popularity: parseInt(e.target.value) })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discount">Discount %</Label>
                    <Input id="discount" type="number" min="0" max="100" value={formData.discount} onChange={(e) => setFormData({ ...formData, discount: e.target.value })} placeholder="Optional" />
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <Switch id="in_stock" checked={formData.in_stock} onCheckedChange={(checked) => setFormData({ ...formData, in_stock: checked })} />
                    <Label htmlFor="in_stock">In Stock</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="featured" checked={formData.featured} onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })} />
                    <Label htmlFor="featured">Featured</Label>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => { setIsDialogOpen(false); resetForm(); }}>Cancel</Button>
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                    {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {editingCard ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin" /></div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {giftCards?.map((card) => (
                    <TableRow key={card.id}>
                      <TableCell className="font-medium">{card.name}</TableCell>
                      <TableCell>{card.brand}</TableCell>
                      <TableCell>{card.category}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {card.featured && <Badge variant="default">Featured</Badge>}
                          {!card.in_stock && <Badge variant="destructive">Out of Stock</Badge>}
                          {card.in_stock && !card.featured && <Badge variant="secondary">In Stock</Badge>}
                        </div>
                      </TableCell>
                      <TableCell>{card.discount ? `${card.discount}%` : '-'}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(card)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(card.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default GiftCardsAdmin;
