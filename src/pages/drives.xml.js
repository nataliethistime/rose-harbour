import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteTitle } from '../utils';

export async function GET(context) {
  const drives = await getCollection('drives');
  return rss({
    title: siteTitle('Drives'),
    description: "Long or interesting drives I've done",
    site: context.site,
    items: drives.map((drive) => ({
      ...drive.data,
      link: `/drives/${drive.id}/`,
      pubDate: drive.data.startAt,
    })),
  });
}
