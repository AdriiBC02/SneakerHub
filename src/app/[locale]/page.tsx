import FeaturedSneakers from '@/src/components/FeaturedSneakers';
import Hero from '@/src/components/Hero';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <FeaturedSneakers />
    </div>
  );
}