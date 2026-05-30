import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Eye, EyeOff, ArrowUp, ArrowDown } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';

export default function HomepageAdmin() {
  const [sections, setSections] = useState([
    {
      id: 1,
      name: 'Hero Section',
      nameHi: 'हीरो सेक्शन',
      isVisible: true,
      displayOrder: 1,
      description: 'Main hero banner with CTA buttons',
    },
    {
      id: 2,
      name: 'Featured Products',
      nameHi: 'फीचर्ड प्रोडक्ट्स',
      isVisible: true,
      displayOrder: 2,
      description: 'Showcase featured Ashwagandha products',
    },
    {
      id: 3,
      name: 'Best Sellers',
      nameHi: 'बेस्ट सेलर्स',
      isVisible: true,
      displayOrder: 3,
      description: 'Display best selling products',
    },
    {
      id: 4,
      name: 'Benefits Section',
      nameHi: 'लाभ सेक्शन',
      isVisible: true,
      displayOrder: 4,
      description: 'Highlight benefits of Ashwagandha',
    },
    {
      id: 5,
      name: 'Why Choose Us',
      nameHi: 'हमें क्यों चुनें',
      isVisible: true,
      displayOrder: 5,
      description: 'Showcase company strengths',
    },
    {
      id: 6,
      name: 'Testimonials',
      nameHi: 'प्रशंसापत्र',
      isVisible: true,
      displayOrder: 6,
      description: 'Customer reviews and testimonials',
    },
    {
      id: 7,
      name: 'Blog Preview',
      nameHi: 'ब्लॉग प्रिव्यू',
      isVisible: true,
      displayOrder: 7,
      description: 'Latest blog posts preview',
    },
    {
      id: 8,
      name: 'FAQ Preview',
      nameHi: 'FAQ प्रिव्यू',
      isVisible: true,
      displayOrder: 8,
      description: 'Frequently asked questions',
    },
    {
      id: 9,
      name: 'Newsletter Signup',
      nameHi: 'न्यूजलेटर साइनअप',
      isVisible: true,
      displayOrder: 9,
      description: 'Email subscription section',
    },
    {
      id: 10,
      name: 'Contact CTA',
      nameHi: 'संपर्क CTA',
      isVisible: true,
      displayOrder: 10,
      description: 'Call-to-action for contact',
    },
  ]);

  const handleToggleVisibility = (id: number) => {
    setSections(sections.map(s => 
      s.id === id ? { ...s, isVisible: !s.isVisible } : s
    ));
  };

  const handleMoveUp = (id: number) => {
    const index = sections.findIndex(s => s.id === id);
    if (index > 0) {
      const newSections = [...sections];
      [newSections[index].displayOrder, newSections[index - 1].displayOrder] = 
      [newSections[index - 1].displayOrder, newSections[index].displayOrder];
      newSections.sort((a, b) => a.displayOrder - b.displayOrder);
      setSections(newSections);
    }
  };

  const handleMoveDown = (id: number) => {
    const index = sections.findIndex(s => s.id === id);
    if (index < sections.length - 1) {
      const newSections = [...sections];
      [newSections[index].displayOrder, newSections[index + 1].displayOrder] = 
      [newSections[index + 1].displayOrder, newSections[index].displayOrder];
      newSections.sort((a, b) => a.displayOrder - b.displayOrder);
      setSections(newSections);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Homepage Sections</h1>
            <p className="text-muted-foreground mt-1">Manage homepage sections visibility and order</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            Save Changes
          </Button>
        </div>

        {/* Info Card */}
        <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            💡 <strong>Tip:</strong> Toggle sections on/off to show/hide them on your homepage. Use the arrow buttons to reorder sections.
          </p>
        </Card>

        {/* Sections List */}
        <Card className="overflow-hidden">
          <div className="space-y-0">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="border-b border-border last:border-b-0 p-4 hover:bg-muted/50 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-semibold text-muted-foreground w-6 text-center">
                        {section.displayOrder}
                      </div>
                      <div>
                        <h3 className="font-bold">{section.name}</h3>
                        <p className="text-sm text-muted-foreground">{section.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Visibility Toggle */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleVisibility(section.id)}
                      className={section.isVisible ? 'text-green-600' : 'text-gray-400'}
                    >
                      {section.isVisible ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </Button>

                    {/* Move Up */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMoveUp(section.id)}
                      disabled={index === 0}
                    >
                      <ArrowUp className="w-5 h-5" />
                    </Button>

                    {/* Move Down */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMoveDown(section.id)}
                      disabled={index === sections.length - 1}
                    >
                      <ArrowDown className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Section Status */}
                <div className="mt-3 ml-9 flex gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    section.isVisible
                      ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                      : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300'
                  }`}>
                    {section.isVisible ? 'Visible' : 'Hidden'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="p-4 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-900 dark:text-amber-100">
            <strong>Summary:</strong> {sections.filter(s => s.isVisible).length} of {sections.length} sections are visible on your homepage.
          </p>
        </Card>
      </div>
    </AdminLayout>
  );
}
