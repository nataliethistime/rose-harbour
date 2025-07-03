import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_DESCRIPTION } from '../consts';
import { siteTitle } from '../utils';

export async function GET(context) {
  const posts = await getCollection('blog');
  return rss({
    title: siteTitle('Blog'),
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/blog/${post.id}/`,
    })),
  });
}
