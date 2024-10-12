export default function CookiesPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Cookies Policy</h1>
      <div className="space-y-4">
        <section>
          <h2 className="text-2xl font-semibold mb-2">What Are Cookies</h2>
          <p>Cookies are small pieces of data stored on your device when you visit a website. They help remember your preferences and improve your browsing experience.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">How We Use Cookies</h2>
          <p>We use cookies to enhance your experience on our website, analyze site traffic, and personalize content.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Types of Cookies We Use</h2>
          <ul className="list-disc pl-5">
            <li>Essential cookies: Required for basic site functionality</li>
            <li>Analytics cookies: Help us understand how visitors use our site</li>
            <li>Functionality cookies: Remember your preferences and settings</li>
            <li>Targeting cookies: Deliver personalized advertisements</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Managing Cookies</h2>
          <p>You can manage or disable cookies in your browser settings. However, this may affect your browsing experience on our site.</p>
        </section>
      </div>
    </div>
  );
}