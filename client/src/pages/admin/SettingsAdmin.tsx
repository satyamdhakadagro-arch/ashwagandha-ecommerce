import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminLayout } from '@/components/AdminLayout';
import { Save } from 'lucide-react';

export default function SettingsAdmin() {
  const [settings, setSettings] = useState({
    // Website Settings
    siteName: 'Ashwagandha Premium',
    siteDescription: 'Premium Ashwagandha Products for Wellness',
    siteEmail: 'info@ashwagandha.com',
    sitePhone: '+91 9876543210',
    siteAddress: 'New Delhi, India',
    businessHours: 'Mon-Fri: 9 AM - 6 PM IST',

    // SEO Settings
    metaTitle: 'Ashwagandha Premium - Authentic Ayurvedic Products',
    metaDescription: 'Discover premium Ashwagandha products for wellness and stress relief',
    metaKeywords: 'ashwagandha, ayurveda, wellness, stress relief',
    ogImage: '',

    // Social Media
    facebookUrl: 'https://facebook.com/ashwagandha',
    instagramUrl: 'https://instagram.com/ashwagandha',
    youtubeUrl: 'https://youtube.com/ashwagandha',
    telegramUrl: 'https://t.me/ashwagandha',
    whatsappNumber: '+91 9876543210',

    // WhatsApp Settings
    whatsappOrderMessage: 'Hi, I would like to order {product_name}. Price: {price}',
    whatsappBusinessName: 'Ashwagandha Premium',
  });

  const handleChange = (field: string, value: string) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSave = () => {
    // Save settings
    alert('Settings saved successfully!');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Settings</h1>
          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            Save All Settings
          </Button>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="website" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="website">Website</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          </TabsList>

          {/* Website Settings */}
          <TabsContent value="website" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Website Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Site Name</label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => handleChange('siteName', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Site Description</label>
                  <textarea
                    value={settings.siteDescription}
                    onChange={(e) => handleChange('siteDescription', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded"
                    rows={3}
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={settings.siteEmail}
                      onChange={(e) => handleChange('siteEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      value={settings.sitePhone}
                      onChange={(e) => handleChange('sitePhone', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <input
                    type="text"
                    value={settings.siteAddress}
                    onChange={(e) => handleChange('siteAddress', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Business Hours</label>
                  <input
                    type="text"
                    value={settings.businessHours}
                    onChange={(e) => handleChange('businessHours', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* SEO Settings */}
          <TabsContent value="seo" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">SEO Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Meta Title</label>
                  <input
                    type="text"
                    value={settings.metaTitle}
                    onChange={(e) => handleChange('metaTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded"
                    maxLength={60}
                  />
                  <p className="text-xs text-muted-foreground mt-1">{settings.metaTitle.length}/60 characters</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Meta Description</label>
                  <textarea
                    value={settings.metaDescription}
                    onChange={(e) => handleChange('metaDescription', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded"
                    rows={2}
                    maxLength={160}
                  ></textarea>
                  <p className="text-xs text-muted-foreground mt-1">{settings.metaDescription.length}/160 characters</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Meta Keywords (comma-separated)</label>
                  <input
                    type="text"
                    value={settings.metaKeywords}
                    onChange={(e) => handleChange('metaKeywords', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">OG Image URL</label>
                  <input
                    type="url"
                    value={settings.ogImage}
                    onChange={(e) => handleChange('ogImage', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Social Media Settings */}
          <TabsContent value="social" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Social Media Links</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Facebook URL</label>
                  <input
                    type="url"
                    value={settings.facebookUrl}
                    onChange={(e) => handleChange('facebookUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Instagram URL</label>
                  <input
                    type="url"
                    value={settings.instagramUrl}
                    onChange={(e) => handleChange('instagramUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">YouTube URL</label>
                  <input
                    type="url"
                    value={settings.youtubeUrl}
                    onChange={(e) => handleChange('youtubeUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Telegram URL</label>
                  <input
                    type="url"
                    value={settings.telegramUrl}
                    onChange={(e) => handleChange('telegramUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">WhatsApp Number</label>
                  <input
                    type="tel"
                    value={settings.whatsappNumber}
                    onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* WhatsApp Settings */}
          <TabsContent value="whatsapp" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">WhatsApp Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Business Name</label>
                  <input
                    type="text"
                    value={settings.whatsappBusinessName}
                    onChange={(e) => handleChange('whatsappBusinessName', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Order Message Template</label>
                  <textarea
                    value={settings.whatsappOrderMessage}
                    onChange={(e) => handleChange('whatsappOrderMessage', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded"
                    rows={4}
                    placeholder="Use {product_name}, {price}, {quantity} as placeholders"
                  ></textarea>
                  <p className="text-xs text-muted-foreground mt-2">
                    Available placeholders: {'{product_name}'}, {'{price}'}, {'{quantity}'}
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
