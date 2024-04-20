import { useTranslation } from 'react-i18next';

import { LocalizedLink } from './LocalizedLink';

const Strategy = () => {
  const { t } = useTranslation('common');
  return (
    <LocalizedLink to="/strategy">
      {t('navigation.services.strategy')}
    </LocalizedLink>
  );
};

const Revops = () => {
  const { t } = useTranslation('common');
  return (
    <LocalizedLink to="/revops">
      {t('navigation.services.revops')}
    </LocalizedLink>
  );
};

const Stories = () => {
  const { t } = useTranslation();
  return (
    <LocalizedLink to="/stories">
      {t('navigation.stories', { ns: 'common' })}
    </LocalizedLink>
  );
};
const About = () => {
  const { t } = useTranslation();
  return (
    <LocalizedLink to="/about">
      {t('navigation.company.about', { ns: 'common' })}
    </LocalizedLink>
  );
};
const Jobs = () => {
  const { t } = useTranslation();
  return (
    <LocalizedLink to="/jobs">
      {t('navigation.company.jobs', { ns: 'common' })}
    </LocalizedLink>
  );
};
const News = () => {
  const { t } = useTranslation();
  return (
    <LocalizedLink to="/news">
      {t('navigation.resources.news', { ns: 'common' })}
    </LocalizedLink>
  );
};
const Webinars = () => {
  const { t } = useTranslation();
  return (
    <LocalizedLink to="/webinars">
      {t('navigation.resources.webinars', {
        ns: 'common',
      })}
    </LocalizedLink>
  );
};
const Blog = () => {
  const { t } = useTranslation();
  return (
    <LocalizedLink to="/blog">
      {t('navigation.resources.blog', {
        ns: 'common',
      })}
    </LocalizedLink>
  );
};

const Tools = () => {
  const { t } = useTranslation();
  return (
    <LocalizedLink to="/tools">
      {t('navigation.resources.tools', { ns: 'common' })}
    </LocalizedLink>
  );
};
const Contact = () => {
  const { t } = useTranslation();
  return (
    <LocalizedLink to="/contact">
      {t('contact.cta', { ns: 'common' })}
    </LocalizedLink>
  );
};

export const PageLink = {
  Strategy,
  Revops,
  Stories,
  About,
  Jobs,
  News,
  Webinars,
  Blog,
  Tools,
  Contact,
};
