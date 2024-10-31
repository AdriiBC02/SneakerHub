export default function LegalPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Legal Policy</h1>
      <div className="space-y-4">
        <section>
          <h2 className="text-2xl font-semibold mb-2">Terms of Service</h2>
          <p>By using our website, you agree to comply with and be bound by these terms and conditions.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Privacy Policy</h2>
          <p>We respect your privacy and are committed to protecting your personal data. Please review our privacy policy for more information.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Return Policy</h2>
          <p>We offer a 30-day return policy for all unused items in their original packaging. Please contact our customer service for more details.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Shipping Policy</h2>
          <p>We aim to process and ship all orders within 1-3 business days. Shipping times may vary depending on your location.</p>
        </section>
      </div>
    </div>
  );
}