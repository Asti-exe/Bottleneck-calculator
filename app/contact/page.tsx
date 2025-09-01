import { Metadata } from 'next';
import { ContactForm } from '@/components/contact/contact-form';

export const metadata: Metadata = {
  title: 'Contact Us - PC Performance Calculator',
  description: 'Get in touch with our team for questions, feedback, or partnership inquiries about our PC performance tools.',
};

export default function ContactPage() {
  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We welcome your feedback, questions, and suggestions. Whether you have a question about the calculator or a partnership inquiry, we'd love to hear from you.
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}