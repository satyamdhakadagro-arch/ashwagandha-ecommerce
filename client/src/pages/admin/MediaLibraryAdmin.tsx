import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, Trash2, Copy, Loader2, Image as ImageIcon } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

export default function MediaLibraryAdmin() {
  const [files, setFiles] = useState<any[]>([
    {
      id: 1,
      name: 'product-1.jpg',
      url: 'https://via.placeholder.com/300',
      size: '2.5 MB',
      type: 'image/jpeg',
      uploadedAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'banner-hero.png',
      url: 'https://via.placeholder.com/600x300',
      size: '1.8 MB',
      type: 'image/png',
      uploadedAt: new Date().toISOString(),
    },
  ]);

  const [uploading, setUploading] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles) return;

    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      Array.from(uploadedFiles).forEach((file) => {
        const newFile = {
          id: files.length + 1,
          name: file.name,
          url: URL.createObjectURL(file),
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          type: file.type,
          uploadedAt: new Date().toISOString(),
        };
        setFiles([...files, newFile]);
      });
      setUploading(false);
      toast.success('Files uploaded successfully');
    }, 1000);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this file?')) {
      setFiles(files.filter((f) => f.id !== id));
      toast.success('File deleted successfully');
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Media Library</h1>
          <label className="cursor-pointer">
            <input
              type="file"
              multiple
              onChange={handleUpload}
              className="hidden"
              accept="image/*,video/*"
            />
            <Button className="bg-amber-600 hover:bg-amber-700" asChild>
              <span>
                <Upload className="w-4 h-4 mr-2" />
                Upload Files
              </span>
            </Button>
          </label>
        </div>

        {/* Upload Area */}
        <Card className="p-8 border-2 border-dashed border-border hover:border-amber-600 transition">
          <label className="cursor-pointer block text-center">
            <input
              type="file"
              multiple
              onChange={handleUpload}
              className="hidden"
              accept="image/*,video/*"
            />
            <div className="space-y-2">
              <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground" />
              <p className="font-medium">Drag and drop files here or click to select</p>
              <p className="text-sm text-muted-foreground">Supported formats: JPG, PNG, GIF, MP4, WebM</p>
            </div>
          </label>
        </Card>

        {/* Files Grid */}
        <div>
          <h2 className="text-xl font-bold mb-4">Recent Files ({files.length})</h2>
          {files.length === 0 ? (
            <Card className="p-8 text-center text-muted-foreground">
              <p>No files uploaded yet. Start by uploading your first file.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {files.map((file) => (
                <Card key={file.id} className="overflow-hidden hover:shadow-lg transition">
                  {/* Thumbnail */}
                  <div className="h-40 bg-muted flex items-center justify-center overflow-hidden">
                    {file.type.startsWith('image/') ? (
                      <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-12 h-12 text-muted-foreground" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4 space-y-3">
                    <div>
                      <p className="font-medium text-sm truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{file.size}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopyUrl(file.url)}
                        className="flex-1"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copy URL
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(file.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Upload Status */}
        {uploading && (
          <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              <p className="text-sm text-blue-600 dark:text-blue-400">Uploading files...</p>
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
