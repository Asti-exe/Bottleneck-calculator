import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';

export function Footer() {
  const footerLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/contact', label: 'Contact Us' },
  ];

  const socialLinks = [
    { href: 'https://facebook.com', icon: Facebook, label: 'Follow us on Facebook' },
    { href: 'https://instagram.com', icon: Instagram, label: 'Follow us on Instagram' },
  ];

  return (
    <footer className="text-center py-8 px-4 text-muted-foreground text-sm mt-8">
      <div className="flex justify-center gap-6 mb-4">
        {footerLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-medium hover:text-primary transition-colors hover:underline"
          >
            {link.label}
          </Link>
        ))}
      </div>
      
      <div className="flex justify-center gap-7 my-5">
        {socialLinks.map((social) => (
          <Link
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110 inline-block"
          >
            <social.icon className="h-6 w-6" />
          </Link>
        ))}
      </div>

      <p>© 2025 PC Performance Calculator. All rights reserved.</p>
    </footer>
  );
}