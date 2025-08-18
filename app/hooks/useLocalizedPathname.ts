import { type NavLinkProps, useParams } from 'react-router';

import { getLang } from '~/utils/lang';

function useLocalizedPathname() {
  const params = useParams();

  return (path: NavLinkProps['to']) => {
    const lang = getLang(params);
    return `/${lang}${path === '/' ? '' : path}`;
  };
}

export { useLocalizedPathname };
