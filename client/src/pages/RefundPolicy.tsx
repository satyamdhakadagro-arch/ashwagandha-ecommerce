import { Card } from '@/components/ui/card';

export default function RefundPolicy() {
  return (
    <div className="w-full min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Refund & Return Policy</h1>
        </div>
      </section>

      {/* Content */}
      <div className="container py-16 max-w-3xl">
        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Return Period</h2>
            <p className="text-muted-foreground">
              We offer a 30-day return policy from the date of delivery. If you're not completely satisfied with your purchase, you can return it for a full refund or exchange.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Return Eligibility</h2>
            <p className="text-muted-foreground mb-4">To be eligible for a return, your item must meet the following criteria:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Product must be unused and in original packaging</li>
              <li>All seals and safety features must be intact</li>
              <li>Return must be initiated within 30 days of delivery</li>
              <li>Product must not be expired or damaged</li>
              <li>Original receipt or order confirmation must be provided</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Non-Returnable Items</h2>
            <p className="text-muted-foreground mb-4">The following items cannot be returned:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Products that have been opened or used</li>
              <li>Items without original packaging or seals broken</li>
              <li>Expired products</li>
              <li>Products damaged due to mishandling</li>
              <li>Items purchased during clearance sales</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">How to Initiate a Return</h2>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Contact our customer service team at returns@ashwagandha.com</li>
              <li>Provide your order number and reason for return</li>
              <li>We will provide you with a prepaid return label</li>
              <li>Pack the item securely and ship it back to us</li>
              <li>Once received and inspected, we'll process your refund</li>
            </ol>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Refund Processing</h2>
            <p className="text-muted-foreground mb-4">
              Refunds are processed within 7-10 business days after we receive and inspect your returned item. The refund will be credited to your original payment method.
            </p>
            <p className="text-muted-foreground">
              Please note: Shipping charges are non-refundable unless the return is due to our error or a defective product.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Defective Products</h2>
            <p className="text-muted-foreground mb-4">
              If you receive a defective or damaged product, please contact us immediately with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Order number</li>
              <li>Photos of the defect or damage</li>
              <li>Description of the issue</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              We will arrange for a replacement or full refund including return shipping charges.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Exchanges</h2>
            <p className="text-muted-foreground">
              If you'd like to exchange a product for a different variant or size, please contact us within 30 days of delivery. We'll arrange the exchange at no additional cost if it's within the same price range.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              For any questions about returns or refunds, please contact us at:<br />
              Email: returns@ashwagandha.com<br />
              Phone: +91 XXXXXXXXXX<br />
              Hours: Monday - Friday, 9 AM - 6 PM IST
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
