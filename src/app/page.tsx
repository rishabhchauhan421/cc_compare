// Craft Imports
import { Section, Container, Prose } from '@/components/craft';
import Balancer from 'react-wrap-balancer';

// Next.js Imports
import Link from 'next/link';

// Icons
import { CreditCard, Star, Search, TrendingUp, Info } from 'lucide-react';

// This page is using the craft.tsx component and design system
export default function Home() {
  return (
    <Section>
      <Container>
        <HomePage />
      </Container>
    </Section>
  );
}

const HomePage = () => {
  return (
    <main className="space-y-6">
      <Prose>
        <h1 className="text-center">
          <Balancer>Find the Best Credit Card for You</Balancer>
        </h1>

        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Compare rewards, cashback, travel benefits, and offers from top banks.
          Our smart tools help you choose the right credit card that fits your
          lifestyle.
        </p>
      </Prose>

      {/* Hero CTA Section */}
      <div className="flex justify-center">
        <Link
          href="/compare"
          className="px-6 py-3 rounded-xl bg-primary text-gray-700 font-medium shadow hover:scale-[1.02] transition-all"
        >
          Compare Cards Now
        </Link>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-4 mt-10">
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/compare"
        >
          <CreditCard size={32} />
          <span>
            Compare Cards{' '}
            <span className="block text-sm text-muted-foreground">
              Side-by-side comparison of credit card features.
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/best-cards"
        >
          <Star size={32} />
          <span>
            Best Picks{' '}
            <span className="block text-sm text-muted-foreground">
              Explore top cards for cashback, travel, shopping & more.
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/finder"
        >
          <Search size={32} />
          <span>
            Card Finder{' '}
            <span className="block text-sm text-muted-foreground">
              Answer a few questions & find your perfect match.
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/offers"
        >
          <TrendingUp size={32} />
          <span>
            Latest Offers{' '}
            <span className="block text-sm text-muted-foreground">
              Bank promotions, welcome bonuses, and limited deals.
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/guides"
        >
          <Info size={32} />
          <span>
            Guides{' '}
            <span className="block text-sm text-muted-foreground">
              Learn how to maximize rewards & use credit smartly.
            </span>
          </span>
        </Link>
      </div>
    </main>
  );
};
