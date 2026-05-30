import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';
import { trpc } from '@/lib/trpc';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const contactMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            We'd love to hear from you. Get in touch with our team today.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Phone */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Phone</h3>
                  <p className="text-muted-foreground">+91 XXXXXXXXXX</p>
                  <p className="text-sm text-muted-foreground mt-2">Mon-Fri, 9 AM - 6 PM IST</p>
                </div>
              </div>
            </Card>

            {/* Email */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Email</h3>
                  <p className="text-muted-foreground">support@ashwagandha.com</p>
                  <p className="text-sm text-muted-foreground mt-2">We'll respond within 24 hours</p>
                </div>
              </div>
            </Card>

            {/* Address */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Address</h3>
                  <p className="text-muted-foreground">
                    123 Wellness Street<br />
                    Ayurveda City, India 110001
                  </p>
                </div>
              </div>
            </Card>

            {/* Business Hours */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Business Hours</h3>
                  <p className="text-muted-foreground text-sm">
                    Mon - Fri: 9 AM - 6 PM<br />
                    Sat - Sun: 10 AM - 4 PM<br />
                    Holidays: Closed
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              
              {submitted && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded">
                  ✓ Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    required
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Find Us On Map</h2>
          <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Google Maps Integration Coming Soon</p>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <Card className="p-8 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950 text-center">
          <h2 className="text-2xl font-bold mb-4">Chat with us on WhatsApp</h2>
          <p className="text-muted-foreground mb-6">
            Get instant support and place orders directly through WhatsApp
          </p>
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            💬 Open WhatsApp Chat
          </Button>
        </Card>
      </div>
    </div>
  );
}
