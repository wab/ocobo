import { Form } from '@remix-run/react';
import { Link } from '@remix-run/react';
import { BiCookie } from 'react-icons/bi';
import { Button } from './Button';

interface CookieBannerProps {
  isVisible: boolean;
}

export const CookieBanner: React.FunctionComponent<CookieBannerProps> = ({ isVisible }) => {
  if (!isVisible) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-xs rounded-lg bg-coral p-4 text-white shadow-lg">
      <Form method="post" reloadDocument>
        <p className="mb-4 text-3xl">
          <BiCookie />
        </p>
        <p>
          Notre site utilise des cookies pour vous garantir la meilleure expérience, conformément à
          notre{' '}
          <Link className="underline" to="/legal/politique-confidentialite">
            politique de confidentialité
          </Link>
          .
        </p>
        <p className="mt-4 flex items-center gap-4">
          {/* Reload the document to be able to enable the tracking script on the root */}
          {/* You can pass values on the submission button  */}
          <Button variant="white" name="accept-gdpr" value="true" type="submit">
            Accepter
          </Button>
          <Button variant="secondary" name="accept-gdpr" value="false" type="submit">
            Refuser
          </Button>
        </p>
      </Form>
    </div>
  );
};
