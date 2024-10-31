import { Link } from "../i18n/routing";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">SneakerHub</h3>
            <p className="text-sm">Your one-stop shop for the latest and greatest sneakers.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/sneakers" className="hover:underline">Sneakers</Link></li>
              <li><Link href="/about" className="hover:underline">About</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <p className="text-sm">
              123 Sneaker Street<br />
              Shoe City, SC 12345<br />
              Phone: (123) 456-7890<br />
              Email: info@sneakerhub.com
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:underline">Facebook</a>
              <a href="#" className="hover:underline">Twitter</a>
              <a href="#" className="hover:underline">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2023 SneakerHub. All Rights Reserved</p>
          <div className="mt-2 space-x-4">
            <Link href="/legal" className="hover:underline">Legal Policy</Link>
            <Link href="/cookies" className="hover:underline">Cookies Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}