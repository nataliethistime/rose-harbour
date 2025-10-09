import ejsPlugin from '@11ty/eleventy-plugin-ejs';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import { feedPlugin } from '@11ty/eleventy-plugin-rss';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItToc from 'markdown-it-toc-done-right';
import slugify from '@sindresorhus/slugify';

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
export default function (eleventyConfig) {
  eleventyConfig.setInputDirectory('src');
  eleventyConfig.setLayoutsDirectory('_layouts');

  eleventyConfig.setLibrary(
    'md',
    markdownIt({
      html: true,
      linkify: true,
      breaks: false,
      typographer: true,
    })
      .use(markdownItAnchor, {
        slugify,
        level: 2,
        permalink: markdownItAnchor.permalink.headerLink(),
      })
      .use(markdownItToc, {
        slugify,
        level: 2,
        listType: 'ul',
      }),
  );

  eleventyConfig.addPlugin(ejsPlugin);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy('src/public/');

  eleventyConfig.setServerOptions({
    port: 3000,
    showVersion: true,
  });

  eleventyConfig.setServerPassthroughCopyBehavior('passthrough');

  eleventyConfig.addCollection('myPosts', (collectionsApi) => {
    return collectionsApi.getFilteredByTag('post').toReversed();
  });

  eleventyConfig.addCollection('myDrives', (collectionsApi) => {
    return collectionsApi.getFilteredByTag('drive').sort((a, b) => b.data.startAt.valueOf() - a.data.startAt.valueOf());
  });

  eleventyConfig.addPlugin(feedPlugin, {
    type: 'rss',
    outputPath: '/rss.xml',
    collection: {
      name: 'myPosts',
      limit: 0,
    },
    metadata: {
      language: 'en',
      title: 'Blog | Rose Harbour',
      subtitle: 'Personal blog of Natalie Rose',
      base: 'https://nataliethistime.com/',
      author: {
        name: 'Natalie Rose',
        email: 'natalie@omg.lol',
      },
    },
  });

  eleventyConfig.addPlugin(feedPlugin, {
    type: 'rss',
    outputPath: '/drives.xml',
    collection: {
      name: 'myDrives',
      limit: 0,
    },
    metadata: {
      language: 'en',
      title: 'Drives | Rose Harbour',
      subtitle: "Long or interesting drives I've done",
      base: 'https://nataliethistime.com/',
      author: {
        name: 'Natalie Rose',
        email: 'natalie@omg.lol',
      },
    },
  });
}

export const config = {
  htmlTemplateEngine: 'ejs',
  markdownTemplateEngine: 'ejs',
};
