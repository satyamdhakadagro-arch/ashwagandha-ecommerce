import { Card } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { trpc } from '@/lib/trpc';

export default function FAQ() {
  const { data: faqs } = trpc.faqs.list.useQuery();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our products and services
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container py-16">
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs && faqs.length > 0 ? (
            faqs.map((faq) => (
              <Card key={faq.id} className="overflow-hidden">
                <button
                  onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-6 hover:bg-muted/50 transition"
                >
                  <h3 className="font-bold text-lg text-left">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${
                      expandedId === faq.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedId === faq.id && (
                  <div className="px-6 pb-6 text-muted-foreground border-t border-border pt-4">
                    {faq.answer}
                  </div>
                )}
              </Card>
            ))
          ) : (
            <p className="text-center text-muted-foreground">No FAQs available</p>
          )}
        </div>
      </div>
    </div>
  );
}
