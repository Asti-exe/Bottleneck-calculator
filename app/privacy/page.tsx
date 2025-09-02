import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { MotionWrapper } from '@/components/ui/motion-wrapper';

export const metadata: Metadata = {
  title: 'Privacy Policy - PC Performance Calculator',
  description: 'Our privacy policy explains how we handle your data and protect your privacy while using our PC performance tools.',
};

export default function PrivacyPage() {
  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <MotionWrapper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-lg">
            <CardContent className="pt-8">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <h1 className="text-4xl font-bold text-primary mb-4">Privacy Policy</h1>
                <p className="text-muted-foreground italic mb-8">Last Updated: December 2025</p>
                
                <p className="leading-7">
                  Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website.
                </p>

                <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                  1. Information We Collect
                </h2>
                
                <p className="leading-7">
                  We do not collect any personally identifiable information. The component selections you make in the calculator (CPU, GPU, etc.) are processed in your browser and are not stored on our servers or linked to you in any way.
                </p>
                
                <p className="leading-7">
                  We use local storage in your web browser solely to save your preference for light or dark mode. This is for your convenience and is not used for tracking.
                </p>

                <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                  2. How We Use Information
                </h2>
                
                <p className="leading-7">
                  The information about your theme preference is used only to apply the correct visual theme on your next visit. We do not use this information for any other purpose.
                </p>

                <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                  3. Third-Party Services
                </h2>
                
                <p className="leading-7">
                  Our website does not integrate with any third-party services that would collect data from our users. We may link to external sites, like benchmark websites, that are not operated by us. Please be aware that we have no control over the content and practices of these sites.
                </p>

                <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                  4. Your Consent
                </h2>
                
                <p className="leading-7">
                  By using our website, you hereby consent to our Privacy Policy and agree to its terms.
                </p>

                <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                  5. Changes to Our Privacy Policy
                </h2>
                
                <p className="leading-7">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>
      </div>
    </div>
  );
}