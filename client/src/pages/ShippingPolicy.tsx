import { Card } from '@/components/ui/card';

export default function ShippingPolicy() {
  return (
    <div className="w-full min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Shipping Policy</h1>
        </div>
      </section>

      {/* Content */}
      <div className="container py-16 max-w-3xl">
        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Shipping Methods</h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-bold text-foreground mb-2">Standard Delivery</h3>
                <p>Delivery within 5-7 business days across India</p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">Express Delivery</h3>
                <p>Delivery within 2-3 business days (Available in major cities)</p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">Overnight Delivery</h3>
                <p>Delivery within 24 hours (Available in select locations)</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Shipping Charges</h2>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex justify-between">
                <span>Orders below ₹500</span>
                <span className="font-bold">₹50</span>
              </div>
              <div className="flex justify-between">
                <span>Orders ₹500 - ₹1000</span>
                <span className="font-bold">₹30</span>
              </div>
              <div className="flex justify-between">
                <span>Orders above ₹1000</span>
                <span className="font-bold">FREE</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Delivery Areas</h2>
            <p className="text-muted-foreground mb-4">
              We ship to all locations across India. Delivery times may vary based on:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Geographic location</li>
              <li>Weather conditions</li>
              <li>Local holidays</li>
              <li>Courier partner availability</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tracking Your Order</h2>
            <p className="text-muted-foreground">
              Once your order is dispatched, you will receive a tracking number via email and SMS. You can use this number to track your package in real-time on the courier partner's website.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Damaged or Lost Packages</h2>
            <p className="text-muted-foreground mb-4">
              In case your package arrives damaged or is lost:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Contact us immediately with photos of the damage</li>
              <li>We will file a claim with the courier partner</li>
              <li>Upon approval, we will send a replacement or issue a refund</li>
              <li>Process typically takes 7-10 business days</li>
            </ol>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">International Shipping</h2>
            <p className="text-muted-foreground">
              Currently, we only ship within India. International shipping will be available soon. Please check back for updates.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              For shipping-related queries, please contact us at:<br />
              Email: shipping@ashwagandha.com<br />
              Phone: +91 XXXXXXXXXX
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
