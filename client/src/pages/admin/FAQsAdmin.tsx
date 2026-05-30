import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';

export default function FAQsAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    questionHi: '',
    answer: '',
    answerHi: '',
  });

  // Mock data
  const faqs = [
    {
      id: 1,
      question: 'What is Ashwagandha?',
      questionHi: 'अश्वगंधा क्या है?',
      answer: 'Ashwagandha is an ancient medicinal herb used in Ayurveda.',
      isActive: true,
    },
    {
      id: 2,
      question: 'What are the benefits?',
      questionHi: 'इसके क्या लाभ हैं?',
      answer: 'It helps reduce stress, improve sleep, and boost immunity.',
      isActive: true,
    },
    {
      id: 3,
      question: 'How to use?',
      questionHi: 'इसका उपयोग कैसे करें?',
      answer: 'Mix 1-2 teaspoons with warm milk and consume daily.',
      isActive: true,
    },
  ];

  const filteredFAQs = faqs.filter((f) =>
    f.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({ question: '', questionHi: '', answer: '', answerHi: '' });
    setShowForm(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">FAQ Management</h1>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-amber-600 hover:bg-amber-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add FAQ
          </Button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Add New FAQ</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Question (EN)</label>
                  <input
                    type="text"
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Question (HI)</label>
                  <input
                    type="text"
                    value={formData.questionHi}
                    onChange={(e) => setFormData({ ...formData, questionHi: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Answer (EN)</label>
                  <textarea
                    value={formData.answer}
                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded"
                    rows={4}
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Answer (HI)</label>
                  <textarea
                    value={formData.answerHi}
                    onChange={(e) => setFormData({ ...formData, answerHi: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded"
                    rows={4}
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Save FAQ
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Search */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded"
            />
          </div>
        </div>

        {/* FAQs Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-bold">Question</th>
                  <th className="text-left px-4 py-3 font-bold">Answer</th>
                  <th className="text-left px-4 py-3 font-bold">Status</th>
                  <th className="text-left px-4 py-3 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFAQs.map((faq) => (
                  <tr key={faq.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">{faq.question}</td>
                    <td className="px-4 py-3 text-muted-foreground line-clamp-2">{faq.answer}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs">
                        Active
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
