import SneakerGrid from '@/src/components/SneakerGrid';

export default function SneakersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Sneakers Collection</h1>
      <SneakerGrid />
    </div>
  );
}