import { SITE_TITLE, SITE_TAGLINE } from './consts';

export const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 60 / 60);
  const minutes = (seconds / 60) % 60;

  return `${hours} ${hours === 1 ? 'hour' : 'hours'} and ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
};

export const siteTitle = (page?: string) => {
  return page ? `${page} | ${SITE_TITLE} | ${SITE_TAGLINE}` : `${SITE_TITLE} | ${SITE_TAGLINE}`;
};
