import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Loader2, Save } from 'lucide-react';
import { useSiteSettings, useUpdateSiteSettings } from '@/hooks/useSiteSettings';
import { toast } from 'sonner';

const SettingsAdmin = () => {
  const { data: settings, isLoading } = useSiteSettings();
  const updateMutation = useUpdateSiteSettings();

  const [formData, setFormData] = useState({
    hero_title: '',
    hero_subtitle: '',
    announcement_text: '',
    announcement_active: false,
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        hero_title: settings.hero_title || '',
        hero_subtitle: settings.hero_subtitle || '',
        announcement_text: settings.announcement_text || '',
        announcement_active: settings.announcement_active || false,
      });
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMutation.mutateAsync(formData);
      toast.success('Settings saved successfully');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-3xl font-bold">Site Settings</h1>
          <p className="text-muted-foreground">Configure your store settings</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>Customize the homepage hero text</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hero_title">Hero Title</Label>
                <Input
                  id="hero_title"
                  value={formData.hero_title}
                  onChange={(e) => setFormData({ ...formData, hero_title: e.target.value })}
                  placeholder="The Perfect Gift, Every Time"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero_subtitle">Hero Subtitle</Label>
                <Textarea
                  id="hero_subtitle"
                  value={formData.hero_subtitle}
                  onChange={(e) => setFormData({ ...formData, hero_subtitle: e.target.value })}
                  placeholder="Discover premium gift cards..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Announcement Banner</CardTitle>
              <CardDescription>Display a message at the top of your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="announcement_active">Enable Announcement</Label>
                  <p className="text-sm text-muted-foreground">Show banner at the top of the site</p>
                </div>
                <Switch
                  id="announcement_active"
                  checked={formData.announcement_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, announcement_active: checked })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="announcement_text">Announcement Text</Label>
                <Input
                  id="announcement_text"
                  value={formData.announcement_text}
                  onChange={(e) => setFormData({ ...formData, announcement_text: e.target.value })}
                  placeholder="🎉 Free shipping on orders over $50!"
                />
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" disabled={updateMutation.isPending}>
            {updateMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default SettingsAdmin;
