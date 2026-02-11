import SocialLinks from '@/components/SocialLinks';
import { CONTACT_INFO } from '@/lib/data/constants';

export default function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Qirat Saeed
            </h3>
            <p className="text-muted-foreground mt-2">
              Agentic AI Developer & Full-Stack Engineer
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <SocialLinks />
            <div className="mt-4 text-center md:text-right">
              <p className="text-sm text-muted-foreground">
                {CONTACT_INFO.email}
              </p>
              <p className="text-sm text-muted-foreground">
                {CONTACT_INFO.phone}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                © {new Date().getFullYear()} Qirat Saeed. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}