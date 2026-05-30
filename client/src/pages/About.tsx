import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Award, Leaf, Heart, Users } from 'lucide-react';
import { Link } from 'wouter';

export default function About() {
  return (
    <div className="w-full min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">About Ashwagandha Premium</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Dedicated to bringing you the finest Ayurvedic Ashwagandha products for your wellness journey
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 2020, Ashwagandha Premium emerged from a passion for authentic Ayurvedic wellness. We believe that nature holds the key to holistic health, and Ashwagandha is one of nature's most powerful adaptogens.
            </p>
            <p className="text-muted-foreground mb-4">
              Our journey began with a simple mission: to make premium, authentic Ashwagandha accessible to everyone. We partner directly with certified Ayurvedic suppliers and farmers who share our commitment to quality and sustainability.
            </p>
            <p className="text-muted-foreground">
              Today, we're proud to serve thousands of customers who trust us for their wellness needs. Every product we offer is rigorously tested and certified to ensure the highest standards of purity and potency.
            </p>
          </div>
          <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900 dark:to-orange-900 rounded-lg flex items-center justify-center">
            <Leaf className="w-32 h-32 text-amber-600 opacity-50" />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-muted-foreground">
              To provide the highest quality Ashwagandha products that empower individuals to take control of their health and wellness through the wisdom of Ayurveda.
            </p>
          </Card>
          <Card className="p-8 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950">
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-muted-foreground">
              To be the most trusted source of authentic Ayurvedic products globally, making wellness accessible and affordable for everyone.
            </p>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: 'Quality', desc: 'Uncompromising standards in every product' },
              { icon: Leaf, title: 'Authenticity', desc: '100% natural, organic Ayurvedic ingredients' },
              { icon: Heart, title: 'Wellness', desc: 'Dedicated to your health and happiness' },
              { icon: Users, title: 'Community', desc: 'Building a supportive wellness community' },
            ].map((value, idx) => {
              const Icon = value.icon;
              return (
                <Card key={idx} className="p-6 text-center">
                  <Icon className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-lg p-12 mb-16">
          <h2 className="text-3xl font-bold mb-8">Why Choose Ashwagandha Premium?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Sourcing & Quality</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Directly sourced from certified Ayurvedic suppliers</li>
                <li>✓ Lab tested for purity and potency</li>
                <li>✓ No additives, fillers, or preservatives</li>
                <li>✓ Sustainable and ethical farming practices</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Customer Experience</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ 24/7 customer support</li>
                <li>✓ Free delivery on orders above ₹500</li>
                <li>✓ 30-day easy return policy</li>
                <li>✓ Expert wellness consultation available</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Rajesh Kumar', role: 'Founder & CEO', bio: 'Ayurveda enthusiast with 15+ years of experience' },
              { name: 'Priya Sharma', role: 'Head of Quality', bio: 'Certified Ayurvedic practitioner and quality expert' },
              { name: 'Amit Patel', role: 'Head of Operations', bio: 'Supply chain expert ensuring timely delivery' },
            ].map((member, idx) => (
              <Card key={idx} className="p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-amber-900">{member.name[0]}</span>
                </div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-sm text-amber-600 font-semibold mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Wellness Journey Today</h2>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of customers who have transformed their health with our premium Ashwagandha products
          </p>
          <Link href="/shop">
            <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
